import styled from "styled-components";

export default function AdCard({ad}) {
  const {name, description, price, color, year} = ad;
  return (
    <CardContainer color={color.code}>
      <span style={{textTransform: "uppercase"}}>{name}</span>
      <span>Preço: {price}</span>
      <span>Descição: {description}</span>
      <span>Ano: {year}</span>
      <span>Cor: {color.name}</span>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 250px;
  background-color: ${({ color }) => color};
  color: white;
  padding: 10px;
`;