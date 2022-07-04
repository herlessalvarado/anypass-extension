import { createContext } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    token: "",
    applicationNames: [],
    login: (email: string, password: string, colorCode: string) : Promise<boolean> => Promise.resolve(false),
    register: (email: string, password: string, colorCode: string) : Promise<boolean> => Promise.resolve(false)
});

export default AuthContext