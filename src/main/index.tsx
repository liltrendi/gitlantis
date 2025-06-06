import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ExtensionContextProvider } from "@/browser/context/extension";
import { World } from "@/browser/components/";
import "@/main/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ExtensionContextProvider>
      <World />
    </ExtensionContextProvider>
  </StrictMode>
);
