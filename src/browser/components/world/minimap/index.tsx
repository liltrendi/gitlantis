import { useEffect, useRef, useState } from "react";
import { OrthographicCamera } from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { OrthographicCamera as MinimapCamera } from "@react-three/drei";
import { useGameContext } from "@/browser/hooks/useGame/context";

export const Minimap = () => {
  const { gl, scene, size } = useThree();
  const virtualCam = useRef<OrthographicCamera>(null);
  const { boatRef, settings, isMinimapFullScreen, showSplashScreen } =
    useGameContext();
  const [shouldFadeIn, setShouldFadeIn] = useState(
    settings.minimap === "Show" && !showSplashScreen
  );

  useEffect(() => {
    if (settings.minimap === "Show" && !showSplashScreen) {
      setTimeout(() => setShouldFadeIn(true), 1700);
    }
  }, [settings.minimap, showSplashScreen]);

  const minimapSize = isMinimapFullScreen
    ? { width: size.width, height: size.height }
    : { width: 120, height: 120 };

  const minimapPosition = isMinimapFullScreen
    ? {
        x: (size.width - minimapSize.width) / 2,
        y: (size.height - minimapSize.height) / 2,
      }
    : {
        x: size.width - minimapSize.width - 10,
        y: size.height - minimapSize.height - 10,
      };

  useFrame(() => {
    if (!virtualCam.current || !boatRef?.current || settings.minimap === "Hide")
      return;

    const targetPos = boatRef.current.position;
    virtualCam.current.position.set(targetPos.x, targetPos.y + 50, targetPos.z);
    virtualCam.current.lookAt(targetPos);
    virtualCam.current.rotateZ(Math.PI / 2);
    virtualCam.current.updateMatrixWorld();

    gl.autoClear = false;
    gl.clearDepth();
    gl.setScissorTest(true);

    gl.setViewport(
      minimapPosition.x,
      minimapPosition.y,
      minimapSize.width,
      minimapSize.height
    );
    gl.setScissor(
      minimapPosition.x,
      minimapPosition.y,
      minimapSize.width,
      minimapSize.height
    );
    gl.render(scene, virtualCam.current);

    gl.setScissorTest(false);
    gl.setViewport(0, 0, size.width, size.height);
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
