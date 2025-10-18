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

export const TerrestialWorld = ({ visible }: { visible: boolean }) => {
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
      animationFrameRef,
      globalCameraPosition,
      getTime,
      setTime,
      getLastFrame,
      setLastFrame,
    } = setupTerrestialWorldConfiguration();

    const { renderer } = setupTerrestialWorldRenderer({ canvasRef });
    const { camera, FOV } = setupTerrestialWorldCamera();
    setupOrbitControls({ camera, renderer });

    const { noiseTexture, grassTexture, alphaMapTexture } =
      setupTerrestialWorldTextures();

    const { skyMaterial } = setupSkyMaterial({
      azimuth,
      skyScene,
      elevation,
      fogFade,
      FOV,
      renderer,
      camera,
    });

    setupGroundMaterial({
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

    const { cleanup } = runGameLoop({
      camera,
      grassMaterial,
      skyMaterial,
      renderer,
      rootScene,
      skyScene,
      grassScene,
      globalClock,
      animationFrameRef,
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
        materials: [grassMaterial, skyMaterial],
        textures: [noiseTexture, alphaMapTexture, grassTexture],
      });
    };
  }, [visible]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 transition-opacity duration-500 ${visible ? "opacity-100" : "pointer-events-none hidden opacity-0"}`}
    />
  );
};
