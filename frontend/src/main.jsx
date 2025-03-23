import React from 'react'; // Add this line
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { system } from "@chakra-ui/react/preset";
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider attribute="class">
        <ChakraProvider value={system}>
          <App />
        </ChakraProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)