import { useColorModeValue } from '@/components/ui/color-mode';
import { useProductStore } from '@/store/product.store';
import { 
    Box, Button, Container, 
    Heading, Input, VStack,
} from '@chakra-ui/react';
import React from 'react'
import { useState } from 'react'
import { Toaster, toaster } from "@/components/ui/toaster"

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    });


    const { createProduct } = useProductStore()
    const handleAddProduct = async() => {
        const result = await createProduct(newProduct)
        console.log("New product added", result.success);
        console.log("New product added", result.message);

        var title = ""
        var desc = ""

        if (result.success) {
            title = "Success"
            desc = "Product Create Successfully"
        } else {
            title = "Error"
            desc = "Product Creation Failure"
        }

        toaster.create({
            title: title,
            description: desc
        })
    }

    return <Container maxW={"container.sm"}>
        <VStack spaceY={8}>
            
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Create New Procduct
            </Heading>

            <Box
                w={"full"} bg={useColorModeValue("white", "blue.800")}
                p={6} rounded={"lg"} shadow={"md"}
            >
                <VStack
                    spaceY={4}
                >
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

                    <Button
                        colorScheme='blue'
                        onClick={handleAddProduct}
                        w='full'
                    >
                        Add Product
                    </Button>
                </VStack>
            </Box>
            <Toaster />
        </VStack>
    </Container>
}

export default CreatePage