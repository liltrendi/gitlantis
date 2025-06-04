import type { TDirectoryContent } from "@/extension/types";
import { createContext, type FC, type ReactNode } from "react";
import { useGameConfig } from "@/browser/hooks/useGame/config";

export const GameContext = createContext<TGameConfig>({
  boatRef: null,
  oceanRef: null,
  nodeRef: null,
  worldOffsetRef: null,
  directories: [],
});

export const GameContextProvider: FC<{
  children: ReactNode;
  directories: TDirectoryContent[];
}> = ({ children, directories }) => {
  const gameConfig = useGameConfig();
  return (
    <GameContext.Provider value={{ ...gameConfig, directories }}>
      {children}
    </GameContext.Provider>
  );
};
