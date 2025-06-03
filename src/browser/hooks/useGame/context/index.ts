import { GameContext } from "@/browser/context";
import { useContext } from "react";

export const useGameContext = () => useContext(GameContext);