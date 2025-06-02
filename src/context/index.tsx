import { getGameConfig } from "@/config";
import type { TDirectoryContent } from "@/extension/types";
import { createContext, type FC, type ReactNode } from "react";

export const GameContext = createContext<TGameConfig>({
  boatRef: null,
  oceanRef: null,
  nodeRef: null,
  worldOffsetRef: null,
  // @ts-expect-error
  projectInfoRef: [],
});

export const GameContextProvider: FC<{
  children: ReactNode;
  directories: TDirectoryContent[];
}> = ({ children, directories }) => {
  const gameConfig = getGameConfig(directories);
  return (
    // @ts-expect-error
    <GameContext.Provider value={gameConfig}>{children}</GameContext.Provider>
  );
};
