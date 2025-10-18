import { useEffect, useState } from "react";
import { useGameContext } from "@/browser/hooks/useGame/context";

export const useWorldFader = () => {
  const { activeWorld, showSplashScreen } = useGameContext();

  const [fadeStage, setFadeStage] = useState<"idle" | "fadingOut" | "fadingIn">(
    "idle"
  );
  const [visibleWorld, setVisibleWorld] = useState(activeWorld);

  useEffect(() => {
    if (activeWorld === visibleWorld) return;

    setFadeStage("fadingOut");

    const timeout1 = setTimeout(() => {
      setVisibleWorld(activeWorld);
      setFadeStage("fadingIn");
    }, 600);

    const timeout2 = setTimeout(() => {
      setFadeStage("idle");
    }, 3000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [activeWorld, visibleWorld]);

  return { visibleWorld, fadeStage, showSplashScreen };
};
