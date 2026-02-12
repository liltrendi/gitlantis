import { type FC, type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { NoOpenProject } from "@/packages/components/no-open-project";
import { useWalker } from "@/hooks/useWalker";
import { useGameConfig } from "@/hooks/useGame/config";
import { Loading } from "@/packages/components/loading";
import { useExtensionContext } from "@/hooks/useExtension/context";
import { GameContext } from "@/context/game/context";

export const GameContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { isBrowserEnvironment } = useExtensionContext();
  const { git, walker, settings, openExplorer } = useWalker();
  const gameConfig = useGameConfig();

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
        baseFolder: walker.baseFolder,
        directories: walker.response,
        isBrowserEnvironment,
        settings,
        git,
      }}
    >
      {isBrowserEnvironment ? <Analytics /> : null}
      {children}
    </GameContext.Provider>
  );
};
