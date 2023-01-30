import "./index.css";

import { BackendBaseURLProvider } from "@idealjs/ponder-shared-browser";
import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";

import App from "./App";
import i18n from "./i18n";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
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
