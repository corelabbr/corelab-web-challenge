"use client";

import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { createContext, useEffect, useState } from "react";

import useApi from "@/app/helpers/api";

import { type User } from "../../@types/note";

type UserContextType = {
  userId: string | undefined;
  loading: boolean;
};

export const UserContext = createContext({} as UserContextType);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const api = useApi();
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  const createUser = async (): Promise<User> => {
    return await api.createUser();
  };

  useEffect(() => {
    const uId = getCookie("user_id");
    if (!uId) {
      createUser()
        .then((response) => {
          setUserId(response.id);
          setCookie("user_id", response.id);
          axios.defaults.headers.user_id = response.id;
        })
        .catch((error) =>
          console.error({ message: "Error creating user", error }),
        )
        .finally(() => setLoading(false));
    }
    setUserId(uId);
  }, []);
  return (
    <UserContext.Provider value={{ userId, loading }}>
      {children}
    </UserContext.Provider>
  );
}
