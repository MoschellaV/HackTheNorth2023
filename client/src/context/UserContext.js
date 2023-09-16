import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
};

export const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
};
