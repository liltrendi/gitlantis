import { createContext, type Dispatch, type SetStateAction } from "react";

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
