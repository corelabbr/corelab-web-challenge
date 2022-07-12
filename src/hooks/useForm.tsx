import React from 'react'

const useForm = () => {
    const [value, setvalue] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');

    function validate(value:string){
        if(value.length === 0){
            setError('Preencha os campos');
            return false
        }

    }

    function onChange(target:any){
        if(error) validate(target);
        setvalue(target.value)
    }

  return {
    value,
    setvalue,
    error,
    onChange, 
    onBlur: () => validate(value),
    validate: () => validate(value)
  }

}

export default useForm