import React from 'react'
import styled from 'styled-components'
import { useController } from 'react-hook-form'

const StyledTextarea = styled.textarea`
  resize: none;
  width: 100%;
  height: 21%;
  padding: 15px;
  border-radius: 10px;
  font-family: sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 15.73px;
  background: transparent;
  border: none;
  text-align: left;
  overflow: hidden;
  :focus {
    outline: none;
  }
`
export default function Textarea({ placeholder, name, control, defaultValue = '', ...props }) {
  const {
    field: { value, onChange }
  } = useController({ name, control, defaultValue })
  return <StyledTextarea {...props} placeholder={placeholder} value={value} onChange={onChange} />
}
