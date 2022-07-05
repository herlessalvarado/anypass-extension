import { createContext } from "react";

const Context = createContext({
    isAuthenticated: false,
    token: "",
    applicationNames: [],
    login: (email: string, password: string, colorCode: string) : Promise<boolean> => Promise.resolve(false),
    register: (email: string, password: string, colorCode: string) : Promise<boolean> => Promise.resolve(false),
    getApplicationNames: () => {}
});

export default Context