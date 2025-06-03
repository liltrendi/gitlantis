import { GameContext } from "@/browser/context/game";
import { useContext } from "react";

export const useGameContext = () => useContext(GameContext);