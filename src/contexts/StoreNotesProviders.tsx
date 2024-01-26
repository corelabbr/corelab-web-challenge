"use client";
import { createContext, useEffect, useState } from "react";
import api from "@/components/Services/api";

export const StoreNotesContext = createContext({});
let dataUser: any;
  async function Login(email: string, password: string) {
    let newData = {
      email: email,
      password: password,
    };

    const response = await api.post(`/login`, newData);
    dataUser = await response.data;
    
  }

export const StoreNotesProvider = ({ children }: any) => {
  const [Loading, SetLoading] = useState<boolean>();
  const [user, SetUser] = useState<string[]>([]);


  useEffect(() => {
    SetUser(dataUser);
  }, []);

 
  return (
    <StoreNotesContext.Provider
      value={{
        Login,
        Loading,
      }}>
      {children}
    </StoreNotesContext.Provider>
  );
};

export default StoreNotesProvider;
