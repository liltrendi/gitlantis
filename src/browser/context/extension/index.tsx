import { useGoogleAnalytics } from "@/browser/hooks/useGoogleAnalytics";
import { usePersistence } from "@/browser/hooks/usePersistence";
import { ROOT_DIRECTORY_KEY } from "@/extension/config";
import {
  useState,
  useEffect,
  createContext,
  type ReactNode,
  type FC,
  type Dispatch,
  type SetStateAction,
} from "react";

type TExtensionConfig = {
  rootLabel: string;
  currentPath: string;
  vscodeApi: TAcquireVsCode | null | undefined;
  isBrowserEnvironment: boolean;
  setCurrentPath: Dispatch<SetStateAction<string>>;
  setRootLabel: Dispatch<SetStateAction<string>>;
};

export const ExtensionContext = createContext<TExtensionConfig>({
  rootLabel: "",
  currentPath: "",
  vscodeApi: undefined,
  isBrowserEnvironment: true,
  setRootLabel: () => {},
  setCurrentPath: () => {},
});

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
  useGoogleAnalytics();

  return (
    <ExtensionContext.Provider
      value={{
        rootLabel,
        currentPath,
        vscodeApi,
        isBrowserEnvironment: (vscodeApi === null || vscodeApi === undefined),
        setRootLabel,
        setCurrentPath,
      }}
    >
      {children}
    </ExtensionContext.Provider>
  );
};
