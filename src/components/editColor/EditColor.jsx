import styled from 'styled-components'

const ColorPickerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 574.61px;
  height: 46.46px;
  border-radius: 9px;
  background-color: white;

  @media (max-width: 1100px) {
    display: grid;
    grid-template-columns: repeat(6,1fr);
    width: 286.94px;
    height: 96.60px;
  }
`

const ColorCircle = styled.div`
  width: 36.71px;
  height: 36.71px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
`

const colors = [
  '#BAE2FF',
  '#ECA1FF',
  '#B9FFDD',
  '#DAFF8B',
  '#FFE8AC',
  '#FFA285',
  '#FFCAB9',
  '#CDCDCD',
  '#F99494',
  '#979797',
  '#9DD6FF',
  '#A99A7C',
]

const EditColor = ({ onSelectColor }) => {
  return (
    <ColorPickerContainer>
      {colors.map((color) => (
        <ColorCircle key={color} color={color} onClick={() => onSelectColor(color)} />
      ))}
    </ColorPickerContainer>
  )
}

export default EditColor