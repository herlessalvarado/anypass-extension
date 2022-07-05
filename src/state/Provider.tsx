import { useState, useEffect } from "react";
import Context from "./Context";

const Provider = ({ children }: any) => {
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
      setIsAuthenticated(true);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  };

  const getApplicationNames = async () => {
    const rawResponse: any = await fetch(
      "https://anypass-backend.herokuapp.com/applications",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (rawResponse.status === 200) {
      const response = await rawResponse.json();
      setApplicationNames(response.applicationNames);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getApplicationNames();
    }
  }, [isAuthenticated]);

  const contextValue = {
    isAuthenticated,
    token,
    applicationNames,
    register,
    login,
    getApplicationNames,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default Provider;
