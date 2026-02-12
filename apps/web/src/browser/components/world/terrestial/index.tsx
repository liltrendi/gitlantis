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
import { registerMeadowSounds } from "@/browser/components/world/terrestial/audio/meadow";
import { registerFootstepsSounds } from "@/browser/components/world/terrestial/audio/footsteps";

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
    const minimap = new TerrestialMinimap();

    const {
      playerModelRef,
      playerAnimationMixerRef,
      wasInitialAnimationPlayed,
      playerDirectionalLight,
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

    const meadowSoundsCleanup = registerMeadowSounds(isBrowserEnvironment);
    const footstepsSoundCleanup = registerFootstepsSounds({
      movementControls,
      wasInitialAnimationPlayed,
      isBrowserEnvironment,
    });

    const { gameLoopCleanup } = runGameLoop({
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
        cleanups: [gameLoopCleanup, meadowSoundsCleanup, footstepsSoundCleanup],
        renderers: [renderer],
        lights: [grassAmbience, playerDirectionalLight],
        scenes: [rootScene, skyScene, grassScene],
        listeners: [resizeHandler, movementControls],
        materials: [grassMaterial, skyMaterial],
        textures: [noiseTexture, alphaMapTexture, grassTexture],
      });
    };
  }, [visible, activeWorld, isBrowserEnvironment]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 transition-opacity duration-500 ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
    />
  );
};
