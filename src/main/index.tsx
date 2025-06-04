import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ExtensionContextProvider } from "@/browser/context/extension";
import { World } from '@/browser/components/'
import "@/main/global.css"

const App = () => {
  return (
    <ExtensionContextProvider>
      <World />
    </ExtensionContextProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
