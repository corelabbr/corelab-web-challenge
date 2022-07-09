import { Stack, Input, Icon, Text, Box, Button } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface AddVehiclesProps {
    handleAddCarModal: () => void;
}


export function AddVehicles({ handleAddCarModal }: AddVehiclesProps) {
    return (
        <Stack marginTop={5} spacing={1}>

            <Icon
                as={AiOutlineArrowLeft}
                w={8}
                h={8}
                marginLeft={8}
                color='gray.500'
                cursor='pointer'
                onClick={handleAddCarModal}
            />

            <Box
                w='70%'
                alignSelf='center'
            >
                <Text
                    p={2}
                    fontSize={20}
                >
                    Nome:
                </Text>

                <Input
                    background="white"
                    p={6}
                    color='black'
                    value=''
                    variant="filled"
                    borderRadius="full"
                    _hover={{ opacity: 0.5 }}
                    focusBorderColor="none"
                    _focus={{ opacity: 1, backgroundColor: "white" }}
                />
            </Box>

            <Box
                w='70%'
                alignSelf='center'
            >
                <Text
                    p={2}
                    fontSize={20}
                >
                    Marca:
                </Text>

                <Input
                    background="white"
                    p={6}
                    color='black'
                    value=''
                    variant="filled"
                    borderRadius="full"
                    _hover={{ opacity: 0.5 }}
                    focusBorderColor="none"
                    _focus={{ opacity: 1, backgroundColor: "white" }}
                />
            </Box>

            <Box
                w='70%'
                alignSelf='center'
            >
                <Text
                    p={2}
                    fontSize={20}
                >
                    Cor:
                </Text>

                <Input
                    background="white"
                    p={6}
                    color='black'
                    value=''
                    variant="filled"
                    borderRadius="full"
                    _hover={{ opacity: 0.5 }}
                    focusBorderColor="none"
                    _focus={{ opacity: 1, backgroundColor: "white" }}
                />
            </Box>

            <Box
                w='70%'
                alignSelf='center'
            >
                <Text
                    p={2}
                    fontSize={20}
                >
                    Ano:
                </Text>

                <Input
                    background="white"
                    p={6}
                    color='black'
                    value=''
                    variant="filled"
                    borderRadius="full"
                    _hover={{ opacity: 0.5 }}
                    focusBorderColor="none"
                    _focus={{ opacity: 1, backgroundColor: "white" }}
                />
            </Box>

            <Box
                w='70%'
                alignSelf='center'
            >
                <Text
                    p={2}
                    fontSize={20}
                >
                    Placa:
                </Text>

                <Input
                    background="white"
                    p={6}
                    color='black'
                    value=''
                    variant="filled"
                    borderRadius="full"
                    _hover={{ opacity: 0.5 }}
                    focusBorderColor="none"
                    _focus={{ opacity: 1, backgroundColor: "white" }}
                />
            </Box>

        <Box
            alignSelf='flex-end'
           paddingRight={20}
        >
            <Text p={2}></Text>
            <Button
                width='100%'
                type="submit"
                p={6} 
                background="cyan.400"
                opacity={0.7}
                variant="filled"
                borderRadius="full"
                _hover={{ opacity: 1 }}
            >
                Salvar
            </Button>
        </Box>


        </Stack>
    )
}