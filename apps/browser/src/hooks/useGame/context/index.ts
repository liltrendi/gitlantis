import { GameContext } from "@/context/game/context";
import { useContext } from "react";

export const useGameContext = () => useContext(GameContext);
