import React from 'react'

interface SvgButtonProps {
  fill: string
  onClick: () => void
  ariaLabel: string
}

const CircleColor: React.FC<SvgButtonProps> = ({ fill, onClick, ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className="flex items-center justify-center p-0 bg-transparent border-none cursor-pointer transition-transform duration-300 ease-in-out hover:opacity-80 focus:outline-none"
    style={{ width: '2.5rem', height: '2.5rem' }}
  >
    <svg width="100%" height="100%" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="19.322" cy="18.7024" r="18.354" fill={fill} />
    </svg>
  </button>
)

export default CircleColor
