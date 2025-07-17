import { useEffect } from "react";
import { useGameContext } from "../../useGame/context";

export const useKeyboard = () => {
  const { directionInputRef } = useGameContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "arrowup":
        case "w":
          directionInputRef.current.forward = true;
          break;
        case "arrowdown":
        case "s":
          directionInputRef.current.backward = true;
          break;
        case "arrowleft":
        case "a":
          directionInputRef.current.left = true;
          break;
        case "arrowright":
        case "d":
          directionInputRef.current.right = true;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "arrowup":
        case "w":
          directionInputRef.current.forward = false;
          break;
        case "arrowdown":
        case "s":
          directionInputRef.current.backward = false;
          break;
        case "arrowleft":
        case "a":
          directionInputRef.current.left = false;
          break;
        case "arrowright":
        case "d":
          directionInputRef.current.right = false;
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return directionInputRef.current;
};
