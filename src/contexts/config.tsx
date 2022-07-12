import { AxiosError } from "axios";
import React, { createContext, useEffect, useState } from "react";
import api from "../lib/api";

import { colors } from '../constants/Colors'

interface IConfig {
  brands: string[]
  years: string[]
  colors: string[]
}

interface errorData {
  message?: string
}

interface ConfigContextData {
  config: IConfig
  getVehicleColor: (colorKeyword?: string, defaultColor?: string) => string
}

const ConfigContext = createContext<ConfigContextData>({} as ConfigContextData)

export const ConfigProvider: React.FC<any> = ({ children }) => {
  const [config, setConfig] = React.useState<IConfig>({} as IConfig)

  React.useEffect(() => {
      api.get('/config').then(response => {
        setConfig(response.data)
        console.log({ data: response.data });
        
      }).catch(err => {
        console.log(err);
      })
  }, [])

  function getVehicleColor (colorKeyword?: string, defaultColor?: string) {
    if (!colorKeyword) return 'transparent'
    const selected = colors?.find(color => color?.keywords?.find(keyword => keyword === colorKeyword))?.value;
    if (selected) { return selected }
    if (defaultColor) { return defaultColor }
    return colors?.find(color => color.keywords[0] === '*')?.value || 'transparent'
  }

  return (
    <ConfigContext.Provider value={{ config, getVehicleColor }} >
      {children}
    </ConfigContext.Provider>
  )
}

export default ConfigContext