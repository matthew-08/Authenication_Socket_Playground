import { extendTheme } from "@chakra-ui/react";

const theme = {
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: true,
    },
    styles: {
        global: {
          body: {
            margin: 0,
            "font-family": 
            'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;',
            "-webkit-font-smoothing": "antialiased",
            "-moz-osx-font-smoothing": "grayscale",
            "-webkit-text-size-adjust": "100%",
          }  
        },
    }
}

export default extendTheme(theme)