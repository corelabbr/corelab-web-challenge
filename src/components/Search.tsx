import { AiOutlineSearch } from 'react-icons/ai'
import { Input, HStack, Icon } from '@chakra-ui/react'


interface ISearch {
  placeholder: string;
  value: string;
  onChange: () => void;
}

const Search = (props: ISearch) => {
  return (
    <>
      <HStack
        marginTop="12"
        marginLeft="4"
        width="90%"
      >
        
        <Icon 
          as={AiOutlineSearch} 
          position="absolute"
          marginLeft="10"
        />

        <Input 
          background="cyan.400"
          opacity={0.7}
          placeholder={props.placeholder}
          value={props.value} 
          _placeholder={{ opacity: 1, color: 'gray.700', paddingInline: 10 }}
          variant="filled"
          borderRadius="full"
          _hover={{opacity: 1, color: "cyan.400"}}
          focusBorderColor="none"
          _focus={{opacity: 1, backgroundColor: "cyan.400"}}
        />

      </HStack>
      



    </>
  );
};

export default Search;
