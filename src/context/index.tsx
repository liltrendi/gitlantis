import { getGameConfig } from "@/config";
import { createContext, type FC, type ReactNode } from "react";

export const GameContext = createContext<TGameConfig>({
  boatRef: null,
  oceanRef: null,
  cabinetsRef: null,
  worldOffsetRef: null,
  projectInfoRef: null
});

export const GameContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const gameConfig = getGameConfig();
  return (
    <GameContext.Provider value={gameConfig}>{children}</GameContext.Provider>
  );
};
