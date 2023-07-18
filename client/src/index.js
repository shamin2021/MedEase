import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import {
  // ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import theme from "./theme";


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

// root.render(
//   <ChakraProvider>
//     <StrictMode>
//       <ColorModeScript />
//       <App />
//     </StrictMode>
//   </ChakraProvider>
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
