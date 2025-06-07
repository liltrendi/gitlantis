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
  setCurrentPath: Dispatch<SetStateAction<string>>;
  setRootLabel: Dispatch<SetStateAction<string>>;
};

export const ExtensionContext = createContext<TExtensionConfig>({
  rootLabel: "",
  currentPath: "",
  vscodeApi: undefined,
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

  return (
    <ExtensionContext.Provider
      value={{
        rootLabel,
        currentPath,
        vscodeApi,
        setRootLabel,
        setCurrentPath,
      }}
    >
      {children}
    </ExtensionContext.Provider>
  );
};
