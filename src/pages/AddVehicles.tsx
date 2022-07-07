import { Stack, Input } from "@chakra-ui/react";



export function AddVehicles() {
    return (
        <Stack marginTop={20} spacing={8}>
            
            
            <Input
                id="nameCar"
                name="name"
                background="white"
                w='70%'
                p={6}
                color='black'
                alignSelf='center'
                value=''
                variant="filled"
                borderRadius="full"
                _hover={{ opacity: 0.5 }}
                focusBorderColor="none"
                _focus={{ opacity: 1, backgroundColor: "white" }}
            />
            
            <Input
                background="white"
                w='70%'
                p={6}
                color='black'
                alignSelf='center'
                value=''
                variant="filled"
                borderRadius="full"
                _hover={{ opacity: 0.5 }}
                focusBorderColor="none"
                _focus={{ opacity: 1, backgroundColor: "white" }}
            />

            <Input
                background="white"
                w='70%'
                p={6}
                color='black'
                alignSelf='center'
                value=''
                variant="filled"
                borderRadius="full"
                _hover={{ opacity: 0.5 }}
                focusBorderColor="none"
                _focus={{ opacity: 1, backgroundColor: "white" }}
            />

            <Input
                background="white"
                w='70%'
                p={6}
                color='black'
                alignSelf='center'
                value=''
                variant="filled"
                borderRadius="full"
                _hover={{ opacity: 0.5 }}
                focusBorderColor="none"
                _focus={{ opacity: 1, backgroundColor: "white" }}
            />

            <Input
                background="white"
                w='70%'
                p={6}
                color='black'
                alignSelf='center'
                value=''
                variant="filled"
                borderRadius="full"
                _hover={{ opacity: 0.5 }}
                focusBorderColor="none"
                _focus={{ opacity: 1, backgroundColor: "white" }}
            />


        </Stack>
    )
}