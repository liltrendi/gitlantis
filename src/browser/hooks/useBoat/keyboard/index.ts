import { useEffect } from "react";
import { useGameContext } from "@/browser/hooks/useGame/context";

export const useKeyboard = () => {
  const { directionInputRef, gameAudio, setMinimapFullscreen } =
    useGameContext();

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
        case "h":
          if (!gameAudio.horn.current?.isPlaying) {
            gameAudio.horn.current?.play();
          }
          break;
        case "f":
          setMinimapFullscreen((prev) => !prev);
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
        case "h":
          if (gameAudio.horn.current?.isPlaying) {
            gameAudio.horn.current?.stop();
          }
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
