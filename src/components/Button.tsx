import { Button as ButtonChakra } from '@chakra-ui/react'


interface IButton {
  onClick: () => void;
  text: string;
}

const Button = (props: IButton) => {
  return (

    <ButtonChakra
      onClick={props.onClick}
      background="cyan.400"
      variant="filled"
      borderRadius="full"
      size='md'
      w={80}
      alignSelf='center'
      color='gray.500'
    >
      {props.text}

    </ButtonChakra>

  )
};

export default Button;
