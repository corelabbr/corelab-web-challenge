import React from 'react'
import PropTypes from 'prop-types'
import MaskedInput, { MaskedInputProps } from 'react-text-mask'
import {createNumberMask} from 'text-mask-addons'

const defaultMaskOptions: IMaskOptions = {
    prefix: "R$ ",
    suffix: ',00',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ".",
    decimalSymbol: ",",
    // decimalLimit: 2, // how many digits allowed after the decimal
    integerLimit: 10, // limit length of integer numbers
    // allowDecimal: true,
    allowNegative: false,
    allowLeadingZeroes: false,
    // requireDecimal: true,
}

const CurrencyInput: React.FC<any> = ({ 
    maskOptions,
    ...inputProps
 }) => {
  const [val, setVal] = React.useState(inputProps.defaultValue || "");


  const currencyMask = createNumberMask({   
    ...defaultMaskOptions,
    ...maskOptions,
  })

  const unformatPrice = (value: string) => {
    return value
      .split("")
      .filter(el => ![',', '.', 'R', '$', ' '].includes(el))
      .join("");
  };

  React.useEffect(() => {
    if (!inputProps?.value) {
        setVal('');
    }
  }, [inputProps?.value])

  return (
    <MaskedInput {...inputProps}  
        inputMode="decimal"
        value={val}
        mask={currencyMask}
        onChange={async e => {
            const value = e.target.value;
            if (e.target.value.split("")[0] === "0") {
                e.target.value = val;
              return setVal(e.target.value);
            }
            setVal(value);
            inputProps?.onChange?.({ ...e, target: { ...e.target, value: unformatPrice(value) } });
        }}
    />
   )
}

interface CurrencyInputProps extends MaskedInputProps {
  inputMode: 'numeric'
  maskOptions: IMaskOptions
}

interface IMaskOptions {
    prefix?: string
    suffix?: string
    includeThousandsSeparator?: boolean
    thousandsSeparatorSymbol?: string
    allowDecimal?: boolean
    decimalSymbol?: string
    decimalLimit?: number
    requireDecimal?: boolean
    allowNegative?: boolean
    allowLeadingZeroes?: boolean
    integerLimit?: number
}

export default CurrencyInput