import {
  Box, Button, CloseButton,
  Dialog, HStack, IconButton,
  Image, Input, Portal,
  Text, VStack, useDialog
} from "@chakra-ui/react"
import React, { useState } from "react"
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useProductStore } from '@/store/product.store'


export const ProductCard = ({ product }) => {
  const {
    deleteProduct,
    updateProduct
  } = useProductStore();

  const [newProduct, setNewProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image
  });


  const dialog = useDialog();
  const showProductUpdateDialog = () => {
    // show the popup
    dialog.setOpen(true)
  }

  const handleUpdateProduct = async () => {
    dialog.setOpen(false)
    // should be a loader
    const res = await updateProduct(product._id, newProduct)
    console.log("res success", res.success)
  }


  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: "translateY(-5px)", shadow: 'xl' }}

    >
      {/* <Image
        objectFit="revert"
        src={product.image} /> */}

      <Box
        width="100%" // Adjust to your desired fixed width
        height="200px" // Adjust to your desired fixed height
        overflow="hidden" // Clip anything that overflows
      >
        <Image
          src={product.image}
          objectFit="cover" // Scale and crop the image to fill the box
          width="100%"
          height="100%"
        />
      </Box>

      <Box p="4" spaceY="2">
        <Text fontWeight="bold" color="fg">
          {product.name}
        </Text>

        <Text
          fontWeight='medium'
          fontSize='xl'
          mb={4}
        >
          ${product.price}
        </Text>

        <HStack spaceX={2}>
          <IconButton colorPalette='blue' onClick={() => showProductUpdateDialog()} >
            <FaRegEdit />
          </IconButton>
          <IconButton colorPalette='red' onClick={() => deleteProduct(product._id)}>
            <MdDelete />
          </IconButton>
        </HStack>
      </Box>


      <Dialog.RootProvider value={dialog} placement={'center'}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>

              <Dialog.Header>
                <Dialog.Title>Update Product</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <VStack spaceY={4}>
                  <Input
                    placeholder='Product name'
                    name='name'
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  >
                  </Input>
                  <Input
                    placeholder='Product price'
                    name='price'
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  >
                  </Input>
                  <Input
                    placeholder='Product image'
                    name='image'
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  >
                  </Input>

                </VStack>
              </Dialog.Body>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button onClick={() => handleUpdateProduct()}>Save</Button>
              </Dialog.Footer>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>

            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>

    </Box>
  )
}
