import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/react";
import { ColorModeProvider } from "@chakra-ui/color-mode";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./store/store";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
const { ToastContainer } = createStandaloneToast();
var persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider>
        <ColorModeProvider options={{ initialColorMode: "light" }}>
          <BrowserRouter>
            <App />
            <ToastContainer />
          </BrowserRouter>
        </ColorModeProvider>
      </ChakraProvider>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
