import { useRef, useEffect } from "react";

export const useKeyboard = () => {
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "arrowup":
        case "w":
          keys.current.forward = true;
          break;
        case "arrowdown":
        case "s":
          keys.current.backward = true;
          break;
        case "arrowleft":
        case "a":
          keys.current.left = true;
          break;
        case "arrowright":
        case "d":
          keys.current.right = true;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "arrowup":
        case "w":
          keys.current.forward = false;
          break;
        case "arrowdown":
        case "s":
          keys.current.backward = false;
          break;
        case "arrowleft":
        case "a":
          keys.current.left = false;
          break;
        case "arrowright":
        case "d":
          keys.current.right = false;
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keys.current;
};
