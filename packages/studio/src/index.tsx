import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";

import App from "./App";
import i18n from "./i18n";
import BackendBaseURLProvider from "./utils/BackendBaseURLProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

console.log(
  "test test",
  import.meta.env.VITE_BACKEND_BASE_URL,
  import.meta.env.MODE
);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BackendBaseURLProvider value={import.meta.env.VITE_BACKEND_BASE_URL}>
        <App />
      </BackendBaseURLProvider>
    </I18nextProvider>
  </React.StrictMode>
);
