import React from 'react'
import styled from 'styled-components'
import { useController } from 'react-hook-form'

const StyledInput = styled.input`
  width: 100%;
  height: auto;
  border-radius: 3px;
  border: none transparent;
  background: transparent;
  :focus {
    outline: none;
  }
`

export const Input = ({
  placeholder,
  name,
  control,
  defaultValue = '',
  useControllerFlag = true,
  ...props
}) => {
  if (useControllerFlag) {
    const {
      field: { value, onChange }
    } = useController({ name, control, defaultValue })
    return <StyledInput {...props} placeholder={placeholder} value={value} onChange={onChange} />
  } else {
    return <StyledInput {...props} placeholder={placeholder} />
  }
}
