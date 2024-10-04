import React from 'react'

interface CustomInputProps {
  placeholder?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  className?: string
  children?: React.ReactNode 
}

const CustomInput: React.FC<CustomInputProps> = ({ placeholder, onChange, className, children }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="w-full p-2 border rounded"
      />
      {children} {}
    </div>
  )
}

export default CustomInput
