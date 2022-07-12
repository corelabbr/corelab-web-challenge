import {createContext, useContext, useState } from "react";

const IsLoadingContext = createContext();

export const useIsLoadingContext = () => useContext(IsLoadingContext);

export default function IsLoadingContextProvider ({children}){
    const [isLoading, setIsLoading] = useState(false);
    return(
        <IsLoadingContext.Provider value={{isLoading, setIsLoading}}>
            {children}
        </IsLoadingContext.Provider>
    );
}