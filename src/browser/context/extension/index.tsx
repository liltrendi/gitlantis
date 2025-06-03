import {
  useState,
  useEffect,
  createContext,
  type ReactNode,
  type FC,
} from "react";

type TExtensionConfig = {
  vscodeApi: TAcquireVsCode | null | undefined;
};

export const ExtensionContext = createContext<TExtensionConfig>({
  vscodeApi: undefined,
});

export const ExtensionContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [vscodeApi, setVscodeApi] = useState<TAcquireVsCode | null | undefined>(
    undefined
  );

  useEffect(() => {
    setVscodeApi(window.acquireVsCodeApi?.() ?? null);
  }, []);

  return (
    <ExtensionContext.Provider value={{vscodeApi}}>
      {children}
    </ExtensionContext.Provider>
  );
};
