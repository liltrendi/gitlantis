import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ExtensionContextProvider } from "@/context/extension";
import { World } from "@/components/";
import "@/packages/shared/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ExtensionContextProvider>
      <World />
    </ExtensionContextProvider>
  </StrictMode>
);
