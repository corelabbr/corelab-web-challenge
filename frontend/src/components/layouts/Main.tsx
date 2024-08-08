import { ReactNode } from "react";
import { Container } from "./Main.style";

interface MainProps {
  children: ReactNode;
}

export default function Main({children}: MainProps){
  return(
    <Container>
      {children}
    </Container>
  )
}