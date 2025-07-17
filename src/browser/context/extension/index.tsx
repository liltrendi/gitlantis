import { usePersistence } from "@/browser/hooks/usePersistence";
import { ROOT_DIRECTORY_KEY } from "@/extension/config";
import { useState, useEffect, type ReactNode, type FC } from "react";
import { ExtensionContext } from "@/browser/context/extension/context";

export const ExtensionContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [rootLabel, setRootLabel] = useState<string>(ROOT_DIRECTORY_KEY);
  const [currentPath, setCurrentPath] = useState<string>(ROOT_DIRECTORY_KEY);
  const [vscodeApi, setVscodeApi] = useState<TAcquireVsCode | null | undefined>(
    undefined
  );

  useEffect(() => {
    const api = window.acquireVsCodeApi?.() ?? null;
    setVscodeApi(api);
    window.vscodeApi = api;
  }, []);

  usePersistence(vscodeApi);

  return (
    <ExtensionContext.Provider
      value={{
        rootLabel,
        currentPath,
        vscodeApi,
        isBrowserEnvironment: vscodeApi === null || vscodeApi === undefined,
        setRootLabel,
        setCurrentPath,
      }}
    >
      {children}
    </ExtensionContext.Provider>
  );
};
