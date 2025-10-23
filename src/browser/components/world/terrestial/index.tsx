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
import { ResizeHandler } from "@/browser/components/world/terrestial/events/resize";
import { addPlayerToWorld } from "@/browser/components/world/terrestial/player";
import { MovementControls } from "@/browser/components/world/terrestial/player/controls";

export const TerrestialWorld = ({ visible }: { visible: boolean }) => {
  const { isBrowserEnvironment } = useExtensionContext();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    const { camera, FOV } = setupTerrestialWorldCamera();
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
      FOV,
      renderer,
      camera,
    });

    const { groundShaderRef } = setupGroundMaterial({
      delta,
      globalCameraPosition,
      noiseTexture,
      radius,
      resolution,
      width,
      grassScene,
    });

    const { grassMaterial, grassAmbience } = setupGrassMaterial({
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

    const resizeHandler = new ResizeHandler(camera, renderer, FOV);
    const movementControls = new MovementControls();
    resizeHandler.attach(skyMaterial);
    movementControls.attach();

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
        scenes: [skyScene, grassScene],
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
