import React from "react";
import ReactDOM from "react-dom/client";
import "./App/css/style.css";
import "./App/css/dashboard.css";
import "./App/css/header.css";
import App from "./App/App";
import reducer, { initialState } from "./App/provider/reducer";
import { StateProvider } from "./App/provider/StateProvider";
import { PropsContext, PropsProvider } from "./App/provider/ContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

console.log(process.env);

root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <PropsProvider value={PropsContext}>
        <App />
      </PropsProvider>
    </StateProvider>
  </React.StrictMode>
);
