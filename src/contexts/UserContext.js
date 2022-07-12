import { createContext, useContext, useState } from "react";

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}