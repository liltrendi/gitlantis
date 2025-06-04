import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ExtensionContextProvider } from "@/browser/context/extension";
import { World } from '@/browser/components/'
import "@/main/global.css"
import { Breadcrumb } from '@/browser/components/settings/breadcrumb';

const App = () => {
  return (
    <ExtensionContextProvider>
      <Breadcrumb />
      <World />
    </ExtensionContextProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
