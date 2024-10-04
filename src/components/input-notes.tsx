import React from 'react'

interface InputComponentProps {
  placeholder?: string
  className?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  as?: 'input' | 'textarea'
}

const InputComponent: React.FC<InputComponentProps> = ({
  placeholder,
  className = '',
  value = '',
  onChange = () => {},
  onKeyDown = () => {},
  as = 'input'
}) => {
  const Component = as === 'textarea' ? 'textarea' : 'input'

  return (
    <div className={`flex flex-col min-h-[2.5rem] transition-all duration-300 ease-in-out ${className}`}> {}
      <Component
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="w-full p-2 rounded-md bg-white focus:border-none focus:ring-0"
        rows={as === 'textarea' ? 5 : undefined}
      />
    </div>
  )
}

export default InputComponent
