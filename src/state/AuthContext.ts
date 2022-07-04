import { createContext } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    token: "",
    applicationNames: [],
    login: (email: string, password: string, colorCode: string) => {}
});

export default AuthContext