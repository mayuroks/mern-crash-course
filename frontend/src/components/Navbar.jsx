import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import { CiSquarePlus } from "react-icons/ci";
import { useColorMode } from "@/components/ui/color-mode"
import { IoMoon } from "react-icons/io5"
import { LuSun } from 'react-icons/lu';
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return <Container maxW={"1140px"} px={4}>
        <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base: "column",
                sm: "row"
            }}
        >
            <Text
                bgColor={"yellow.800"}
                fontSize={{ base: "32", sm: "28" }}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                bgGradient={"to-r"}
                gradientFrom={"cyan.400"}
                gradientTo={"blue.500"}
                bgClip={"text"}
            >
                <Link to={"/"}>
                    Product Store 🛒
                </Link>
            </Text>

            <HStack alignItems={"center"}>
                <Link to={"/create"}>
                    <Button>
                        <CiSquarePlus size={"12"} />
                    </Button>
                </Link>
                <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <IoMoon /> : <LuSun />}
                </Button>
            </HStack>
        </Flex>
    </Container>
}

export default Navbar