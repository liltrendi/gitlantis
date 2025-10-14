import { useEffect, useState } from "react";
import { OrthographicCamera as MinimapCamera } from "@react-three/drei";
import { useGameContext } from "@/browser/hooks/useGame/context";
import {
  useMinimapCamera,
  useMinimapClickHandler,
} from "@/browser/hooks/useMinimap";

export const Minimap = () => {
  const { settings, isMinimapFullScreen, showSplashScreen } = useGameContext();

  const [shouldFadeIn, setShouldFadeIn] = useState(
    settings.minimap === "Show" && !showSplashScreen
  );

  useEffect(() => {
    if (settings.minimap === "Show" && !showSplashScreen) {
      setTimeout(() => setShouldFadeIn(true), 1700);
    }
  }, [settings.minimap, showSplashScreen]);

  const { gl, scene, virtualCam, minimapPosition, minimapSize } =
    useMinimapCamera();

  useMinimapClickHandler({
    gl,
    scene,
    virtualCam,
    minimapPosition,
    minimapSize,
  });

  if (!shouldFadeIn) return null;

  return (
    <MinimapCamera
      ref={virtualCam}
      makeDefault={false}
      zoom={isMinimapFullScreen ? 0.8 : 3.5}
    />
  );
};
