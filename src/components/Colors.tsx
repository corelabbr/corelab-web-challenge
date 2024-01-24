import { colorArray } from '../api/data'

type ColorsProps = {
  onSelectColor: (color: string) => void
  onClose: () => void
}

const Colors = ({ onSelectColor, onClose }: ColorsProps) => {
  // Variáveis com nomes descritivos
  const colorsContainerStyles =
    'absolute border-2 bg-white mt-[102.2%] md:mt-[51%] sm:mt-[62.2%] lg:mt-[33.2%] xl:mt-[33.2%] 2xl:mt-[33.2%] py-1 px-1 rounded-[9px] lg:px-2 xl:px-2 2xl:px-2 lg:ms-14 xl:ms-14 2xl:ms-14 shadow-lg items-center ms-10'
  const colorButtonsContainerStyles =
    'flex p-1 w-[270px] lg:w-[530px] xl:w-[530px] 2xl:w-[530px] flex-wrap gap-2'
  const colorDotStyles = 'w-9 h-9 rounded-full'

  const handleColorClick = (color: string) => {
    onSelectColor(color)
    onClose()
  }

  return (
    <div className={colorsContainerStyles}>
      <div className={colorButtonsContainerStyles}>
        {colorArray.map((color, index) => (
          <button key={index} onClick={() => handleColorClick(color)}>
            <div
              style={{ backgroundColor: color }}
              className={colorDotStyles}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default Colors
