import { useGameStore } from "@/browser/hooks/useGame/store";
import { DIRECTORY_COMMANDS, ROOT_DIRECTORY_KEY } from "@/extension/config";
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
  settingsLoaded: boolean;
  rootLabel: string;
  currentPath: string;
  vscodeApi: TAcquireVsCode | null | undefined;
  setCurrentPath: Dispatch<SetStateAction<string>>;
  setRootLabel: Dispatch<SetStateAction<string>>;
};

export const ExtensionContext = createContext<TExtensionConfig>({
  settingsLoaded: false,
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
    // @ts-expect-error
    window.vscodeApi = api;
  }, []);

  const { initializeStore, extension } = useGameStore();

  useEffect(() => {
    if (!vscodeApi) {
      initializeStore();
      return;
    }

    const messageListener = (event: MessageEvent) => {
      const message = event.data;
      if (message.type === DIRECTORY_COMMANDS.settings_loaded) {
        initializeStore(message.data);
      }
    };

    window.addEventListener("message", messageListener);

    vscodeApi.postMessage({
      type: DIRECTORY_COMMANDS.load_settings,
    });

    return () => {
      window.removeEventListener("message", messageListener);
    };
  }, [initializeStore, vscodeApi]);

  return (
    <ExtensionContext.Provider
      value={{
        settingsLoaded: extension.isLoaded,
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
