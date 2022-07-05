import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import Provider from "./state/Provider";
import { MemoryRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MemoryRouter>
      <ChakraProvider>
        <Provider>
          <App />
        </Provider>
      </ChakraProvider>
    </MemoryRouter>
  </React.StrictMode>
);
