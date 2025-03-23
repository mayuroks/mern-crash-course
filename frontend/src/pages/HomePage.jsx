import { Container, SimpleGrid, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProductStore } from '@/store/product.store'
import { ProductCard } from '@/components/ProductCard'


const HomePage = () => {
  const { fetchProducts, products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("Products", products)

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spaceX={8}>
        <Text
          fontSize={30}
          fontWeight={"bold"}
          bgGradient={"linear"}
          gradientTo={"cyan.400"}
          gradientFrom={"blue.500"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          spaceX={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

        </SimpleGrid>

        {/* No products found */}
        {products.length === 0 && (

          <Text
            fontSize='xl'
            textAlign='center'
            fontWeight='bold'
            color='gray.500'
          >
            No Products Found 😢{" "}
            <Link to={"/create"}>
              <Text
                as='span'
                color='blue.500'
                _hover={{ textDecoration: 'underline' }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage