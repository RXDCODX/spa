import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { SignalRContext } from "./index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SignalRContext.Provider
      automaticReconnect
      logger={console}
      logMessageContent
      withCredentials={false}
      url={"http://localhost:9155/drum"}
    >
      <App />
    </SignalRContext.Provider>
  </StrictMode>
);
