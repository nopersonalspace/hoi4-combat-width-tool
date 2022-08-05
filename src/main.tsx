import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { darkTheme } from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={darkTheme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
