// theme.js

// 1. import `extendTheme` function
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight

import "@fontsource/cabin"; // Defaults to weight 400
import "@fontsource/cabin/400.css"; // Specify weight
import "@fontsource/cabin/400-italic.css"; // Specify weight and style

import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
    initialColorMode: "light",
    useSystemColorMode: false,

}

// }
const fonts = {
    body: "cabin",
    heading: "poppins",
    mono: "cabin",
}


const colors = {
    brand: {
      navblue : '#d0e1fb',
      defaultblue : '#645BEE',
      lightblue: '#dcecf8',
      textBlack: '#1E1E1E',
    },
  }

// 3. extend the theme
const theme = extendTheme({ config,fonts, colors })

export default theme