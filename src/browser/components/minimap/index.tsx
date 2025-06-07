import { useRef, useEffect } from "react";
import { OrthographicCamera } from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { OrthographicCamera as MinimapCamera } from "@react-three/drei";
import { useGameContext } from "@/browser/hooks/useGame/context";

export const Minimap = () => {
  const { gl, scene, size } = useThree();
  const virtualCam = useRef<OrthographicCamera>(null);
  const {
    boatRef,
    settings,
    showSplashScreen,
    isMinimapFullScreen,
    setMinimapFullscreen,
  } = useGameContext();

  useEffect(() => {
    const button = document.createElement("button");

    button.innerHTML = isMinimapFullScreen
      ? '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>'
      : '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>';

    const buttonRight = isMinimapFullScreen ? "calc(3.9% + 10px)" : "15px";
    const buttonBottom = isMinimapFullScreen ? "calc(5.5% + 10px)" : "15px";

    Object.assign(button.style, {
      position: "absolute",
      right: buttonRight,
      bottom: buttonBottom,
      width: "44px",
      height: "44px",
      backgroundColor: "rgba(34,34,34, 0.9)",
      border: "1px solid rgba(255, 255, 255, 0.4)",
      borderRadius: "0.5rem",
      color: "white",
      cursor: "pointer",
      zIndex: "1001",
      display:
        !showSplashScreen && settings.minimap === "Show" ? "flex" : "none",
      alignItems: "center",
      justifyContent: "center",
    });

    button.onclick = () => setMinimapFullscreen(!isMinimapFullScreen);
    button.title = isMinimapFullScreen
      ? "Minimize minimap"
      : "Fullscreen minimap";

    document.body.appendChild(button);

    return () => {
      if (document.body.contains(button)) {
        document.body.removeChild(button);
      }
    };
  }, [isMinimapFullScreen, settings.minimap, showSplashScreen]);

  const minimapSize = isMinimapFullScreen
    ? { width: size.width * 0.93, height: size.height * 0.9 }
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

  if (settings.minimap === "Hide") return null;

  return (
    <>
      <MinimapCamera
        ref={virtualCam}
        makeDefault={false}
        zoom={isMinimapFullScreen ? 0.8 : 3.5}
      />
    </>
  );
};
