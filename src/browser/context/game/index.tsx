import { createContext, type FC, type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { NoOpenProject } from "@/browser/components/shared/no-open-project";
import { useWalker } from "@/browser/hooks/useWalker";
import { useGameConfig } from "@/browser/hooks/useGame/config";
import { Loading } from "@/browser/components/shared/loading";
import { useExtensionContext } from "@/browser/hooks/useExtension/context";

export const GameContext = createContext<TGameConfig>({
  boatRef: null,
  floatingRef: null,
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
  directionInputRef: {
    current: { forward: false, backward: false, left: false, right: false },
  },
});

export const GameContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { isBrowserEnvironment } = useExtensionContext();
  const { walker, settings, openExplorer } = useWalker();
  const { ...gameConfig } = useGameConfig();

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
        isBrowserEnvironment,
      }}
    >
      {isBrowserEnvironment ? <Analytics /> : null}
      {children}
    </GameContext.Provider>
  );
};
