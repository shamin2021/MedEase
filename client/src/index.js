import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from './jwtAuthServices/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <AuthProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>    
  </AuthProvider>

);
