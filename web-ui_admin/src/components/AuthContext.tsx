import { FC, ReactNode, createContext, useState } from "react";
import { AuthContextType } from "../@types/auth";

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [authStatus, setAuthStatus] = useState<boolean>(false);
    const updateAuthStatus = () => {
        setAuthStatus(!authStatus);
    }
    return (
        <AuthContext.Provider value={{ authStatus, updateAuthStatus }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;