import React from 'react'; // Add this line
import { Route, Routes } from 'react-router-dom';
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import { Box } from '@chakra-ui/react'; // Add this line
import { useColorModeValue } from "@/components/ui/color-mode"

function App() {

  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  )
}

export default App
