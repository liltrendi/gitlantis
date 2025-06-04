import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ExtensionContextProvider } from "@/browser/context/extension";
import { World } from '@/browser/components/'
import "@/main/global.css"
import { Settings } from '@/browser/components/settings';

const App = () => {
  return (
    <ExtensionContextProvider>
      <Settings  />
      <World />
    </ExtensionContextProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
