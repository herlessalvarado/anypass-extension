import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [applicationNames, setApplicationNames] = useState([]);

  const register = async (
    email: string,
    password: string,
    colorCode: string
  ) => {
    const rawResponse: any = await fetch(
      "https://anypass-backend.herokuapp.com/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          masterPassword: password,
          colorCode: colorCode,
        }),
      }
    );

    if (rawResponse.status === 200) return Promise.resolve(true);

    return Promise.resolve(false);
  };

  const login = async (email: string, password: string, colorCode: string) => {
    const rawResponse: any = await fetch(
      "https://anypass-backend.herokuapp.com/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          masterPassword: password,
          colorCode: colorCode,
        }),
      }
    );

    if (rawResponse.status === 200) {
      const response = await rawResponse.json();
      setToken(response.token);
      setApplicationNames(response.applicationNames);
      setIsAuthenticated(true);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  };

  const contextValue = {
    isAuthenticated,
    token,
    applicationNames,
    register,
    login,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
