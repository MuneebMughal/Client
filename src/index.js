import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import "./css/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
);
