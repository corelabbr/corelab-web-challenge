import React, { useState } from 'react'
import '../styles/global.css'
import { IoMdColorFill } from 'react-icons/io'

type ColorButtonProps = {
  onChange: (color: string) => void
  ariaLabel?: string
}

const colors = ['red', 'green', 'blue', 'yellow', 'white']

const ColorButton: React.FC<ColorButtonProps> = ({ onChange, ariaLabel }) => {
  const [showColorPicker, setShowColorPicker] = useState(false)

  const handleColorClick = (color: string) => {
    onChange(color)
    setShowColorPicker(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowColorPicker(prev => !prev)}
        aria-label={ariaLabel}
        className="color-button"
      >
        <IoMdColorFill size="1.5rem" /> {}
      </button>
      {showColorPicker && (
        <div className="color-picker">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => handleColorClick(color)}
              style={{ backgroundColor: color }}
              className="color-option"
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ColorButton
