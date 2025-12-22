import { useEffect, useRef } from "react";
import { setupTerrestialWorldTextures } from "@/browser/components/world/terrestial/utils/textures";
import { setupOrbitControls } from "@/browser/components/world/terrestial/utils/controls";
import { setupTerrestialWorldRenderer } from "@/browser/components/world/terrestial/utils/renderer";
import { setupTerrestialWorldCamera } from "@/browser/components/world/terrestial/utils/camera";
import { setupTerrestialWorldConfiguration } from "@/browser/components/world/terrestial/utils/config";
import { setupSkyMaterial } from "@/browser/components/world/terrestial/materials/sky";
import { setupGroundMaterial } from "@/browser/components/world/terrestial/materials/ground";
import { setupGrassMaterial } from "@/browser/components/world/terrestial/materials/grass";
import { runGameLoop } from "@/browser/components/world/terrestial/utils/gameloop";
import { disposeGameResources } from "@/browser/components/world/terrestial/utils/cleanup";
import { useExtensionContext } from "@/browser/hooks/useExtension/context";
import { addPlayerToWorld } from "@/browser/components/world/terrestial/player";
import { InitTerrestialListeners } from "@/browser/components/world/terrestial/events/init";
import { TerrestialMinimap } from "@/browser/components/world/terrestial/utils/minimap";
import { useGameContext } from "@/browser/hooks/useGame/context";

export const TerrestialWorld = ({ visible }: { visible: boolean }) => {
  const { isBrowserEnvironment } = useExtensionContext();
  const { isMinimapFullScreen, activeWorld } = useGameContext();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMinimapFullScreenRef = useRef(isMinimapFullScreen);

  useEffect(() => {
    isMinimapFullScreenRef.current = isMinimapFullScreen;
  }, [isMinimapFullScreen]);

  useEffect(() => {
    if (!canvasRef.current || !visible) return;

    let {
      width,
      delta,
      radius,
      azimuth,
      fogFade,
      skyScene,
      rootScene,
      grassScene,
      elevation,
      resolution,
      globalClock,
      gltfModelLoader,
      animationFrameRef,
      globalCameraPosition,
      getTime,
      setTime,
      getLastFrame,
      setLastFrame,
    } = setupTerrestialWorldConfiguration();

    const { renderer } = setupTerrestialWorldRenderer({ canvasRef });
    const { camera } = setupTerrestialWorldCamera();
    const { orbitControls } = setupOrbitControls({ camera, renderer });

    const {
      playerModelRef,
      playerAnimationMixerRef,
      wasInitialAnimationPlayed,
    } = addPlayerToWorld({
      grassScene,
      gltfModelLoader,
      isBrowserEnvironment,
    });

    const { noiseTexture, grassTexture, alphaMapTexture } =
      setupTerrestialWorldTextures({ isBrowserEnvironment });

    const { skyMaterial } = setupSkyMaterial({
      azimuth,
      skyScene,
      elevation,
      fogFade,
      renderer,
      camera,
    });

    const { ground, groundShaderRef } = setupGroundMaterial({
      delta,
      globalCameraPosition,
      noiseTexture,
      radius,
      resolution,
      width,
      grassScene,
    });

    const { grass, grassMaterial, grassAmbience } = setupGrassMaterial({
      azimuth,
      camera,
      delta,
      elevation,
      globalCameraPosition,
      radius,
      grassScene,
      width,
      noiseTexture,
      grassTexture,
      alphaMapTexture,
    });

    const { resizeHandler, movementControls } = new InitTerrestialListeners({
      camera,
      renderer,
      skyMaterial,
      activeWorld,
    }).initialize();

    const minimap = new TerrestialMinimap();

    const { cleanup } = runGameLoop({
      camera,
      radius,
      orbitControls,
      grassMaterial,
      skyMaterial,
      renderer,
      rootScene,
      skyScene,
      grassScene,
      globalClock,
      animationFrameRef,
      movementControls,
      globalCameraPosition,
      minimap,
      isMinimapFullScreenRef,
      ground,
      grass,
      wasInitialAnimationPlayed,
      groundShaderRef,
      playerModelRef,
      playerAnimationMixerRef,
      getTime,
      setTime,
      setLastFrame,
      getLastFrame,
    });

    return () => {
      disposeGameResources({
        cleanups: [cleanup],
        renderers: [renderer],
        lights: [grassAmbience],
        scenes: [rootScene, skyScene, grassScene],
        listeners: [resizeHandler],
        materials: [grassMaterial, skyMaterial],
        textures: [noiseTexture, alphaMapTexture, grassTexture],
      });
    };
  }, [visible]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 transition-opacity duration-500 ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
    />
  );
};
