import { useState } from "react";
import styled from "styled-components";
import ButtonForm from "../components/shared/ButtonForm";
import Form from "../components/shared/Form";
import Input from "../components/shared/Input";
import { FlexContainer } from "../components/style/FlexContainer";

export default function AdForm({ setIsHidden }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [result, setResult] = useState([]);

  const body = {
    name,
    description,
    brand,
    color,
    year,
    licensePlate,
  }

  function validate(result) {
    if (result.status === 201) {
      setTimeout(() => setIsHidden(true), 3000)
    }
    setResult(result.data);
  }
  return (
    <BackgroundOverlay onClick={() => setIsHidden(true)}>
      <FlexContainer onClick={e => e.stopPropagation()} width={"326px"} direction={"column"} justify={"center"} align={"center"}>
        <Form body={body} validate={validate} endpoint={"/vehicule/ad"} >
          <Input name={"name"} text={"Nome"} value={name} setValue={setName} result={result} />
          <Input name={"description"} text={"Descrição"} value={description} setValue={setDescription} result={result} />
          <Input name={"brand"} text={"Marca"} value={brand} setValue={setBrand} result={result} />
          <Input name={"color"} text={"Cor"} value={color} setValue={setColor} result={result} />
          <Input name={"year"} text={"Ano"} value={year} setValue={setYear} result={result} />
          <Input name={"licensePlate"} text={"Placa"} value={licensePlate} setValue={setLicensePlate} result={result} />
          <LeftAlign>
            <ButtonForm text={"Salvar"} />
          </LeftAlign>
        </Form>
      </FlexContainer>
    </BackgroundOverlay>
  );
}
const LeftAlign = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const BackgroundOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top:0;
  z-index:1;
  background-color: lightgray;
`;

const Title = styled.span`
    font-size: 22px;
    font-weight: 600;
    color: black;
    margin-bottom: 20px;
`;