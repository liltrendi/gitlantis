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
  vscodeApi: TAcquireVsCode | null | undefined;
  currentPath: string;
  setCurrentPath: Dispatch<SetStateAction<string>>;
};

export const ExtensionContext = createContext<TExtensionConfig>({
  vscodeApi: undefined,
  currentPath: "",
  setCurrentPath: () => {},
});

export const ExtensionContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [vscodeApi, setVscodeApi] = useState<TAcquireVsCode | null | undefined>(
    undefined
  );
  const [currentPath, setCurrentPath] = useState<string>(ROOT_DIRECTORY_KEY);

  useEffect(() => {
    setVscodeApi(window.acquireVsCodeApi?.() ?? null);
  }, []);

  return (
    <ExtensionContext.Provider
      value={{ vscodeApi, currentPath, setCurrentPath }}
    >
      {children}
    </ExtensionContext.Provider>
  );
};
