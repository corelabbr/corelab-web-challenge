import { ChakraProvider } from "@chakra-ui/react";
import VehiclesPage from "./pages/Vehicles";
import { theme } from '../src/styles/theme'


export function App() {


    return (
        <ChakraProvider theme={theme}>

            <VehiclesPage />

        </ ChakraProvider>
    )
}