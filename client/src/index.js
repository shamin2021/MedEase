import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import theme from "./theme";

import {
  // ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// 
import Landing from "./pages/Landing";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);


const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme = {theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

