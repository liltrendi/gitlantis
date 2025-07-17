import { type FC, type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { NoOpenProject } from "@/browser/components/shared/no-open-project";
import { useWalker } from "@/browser/hooks/useWalker";
import { useGameConfig } from "@/browser/hooks/useGame/config";
import { Loading } from "@/browser/components/shared/loading";
import { useExtensionContext } from "@/browser/hooks/useExtension/context";
import { GameContext } from "@/browser/context/game/context";

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
