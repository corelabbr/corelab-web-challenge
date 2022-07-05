import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    colors: {
        gray: {

            "50": "#ECECEC",
        },

        cyan: {
            "400": "#65DCC7",
        },

        red: {
            "400": "#F04F4F",
        }
    },

    fonts:{
        heading: 'Inter',
        body: 'Inter',
    },
    
    styles: {
        global: {
            body: {
                background: 'gray.50',
                color: 'black'
            }
        }
    }
})
