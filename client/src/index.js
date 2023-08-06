import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestComponent from './pages/TestComponent';
import AddHLC from "./pages/AddHLC";
import AddDoc from "./pages/AddDoc";
import SearchDoc from "./pages/SearchDoc";
import Register from './pages/Register';
import { ChakraProvider } from "@chakra-ui/react";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // added chakra provider here
  <ChakraProvider>
    <Router>
      <Routes>
        {/* add all the application routes here */}
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test-components" element={<TestComponent />} />
        <Route path="/AddHLC" element={<AddHLC />} />
        <Route path="/AddDoc" element={<AddDoc />} />
        <Route path="/SearchDoc" element={<SearchDoc />} />
      </Routes>
    </Router>
  </ChakraProvider>
);