import { GameContext } from "@/browser/context/game/context";
import { useContext } from "react";

export const useGameContext = () => useContext(GameContext);
