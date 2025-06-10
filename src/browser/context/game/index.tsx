import { createContext, useState, type FC, type ReactNode } from "react";
import { NoOpenProject } from "@/browser/components/shared/no-open-project";
import { useWalker } from "@/browser/hooks/useWalker";
import { useGameConfig } from "@/browser/hooks/useGame/config";
import { Loading } from "@/browser/components/shared/loading";
import { useExtensionContext } from "@/browser/hooks/useExtension/context";

export const GameContext = createContext<TGameConfig>({
  boatRef: null,
  oceanRef: null,
  nodeRef: null,
  worldOffsetRef: null,
  directories: [],
  isBrowserEnvironment: true,
  settings: {} as Pick<TGameStore, "settings">["settings"],
  showSplashScreen: true,
  setShowSplashScreen: () => {},
  isMinimapFullScreen: false,
  setMinimapFullscreen: () => {},
});

export const GameContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const gameConfig = useGameConfig();
  const { walker, settings, openExplorer } = useWalker();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [isMinimapFullScreen, setMinimapFullscreen] = useState(false);
  const {isBrowserEnvironment} = useExtensionContext()

  if (walker.loading) return <Loading />;

  if (walker.error && walker.response.length === 0) {
    return (
      <NoOpenProject
        type={walker.error.type}
        message={walker.error.message}
        action={openExplorer}
      />
    );
  }

  return (
    <GameContext.Provider
      value={{
        ...gameConfig,
        settings,
        directories: walker.response,
        showSplashScreen,
        setShowSplashScreen,
        isMinimapFullScreen,
        setMinimapFullscreen,
        isBrowserEnvironment
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
