import { useEffect, useRef } from "react";
import { setupTerrestialWorldTextures } from "@/components/terrestial/utils/textures";
import { setupOrbitControls } from "@/components/terrestial/utils/controls";
import { setupTerrestialWorldRenderer } from "@/components/terrestial/utils/renderer";
import { setupTerrestialWorldCamera } from "@/components/terrestial/utils/camera";
import { setupTerrestialWorldConfiguration } from "@/components/terrestial/utils/config";
import { setupSkyMaterial } from "@/components/terrestial/materials/sky";
import { setupGroundMaterial } from "@/components/terrestial/materials/ground";
import { setupGrassMaterial } from "@/components/terrestial/materials/grass";
import { runGameLoop } from "@/components/terrestial/utils/gameloop";
import { disposeGameResources } from "@/components/terrestial/utils/cleanup";
import { useExtensionContext } from "@/hooks/useExtension/context";
import { addPlayerToWorld } from "@/components/terrestial/player";
import { InitTerrestialListeners } from "@/components/terrestial/events/init";
import { TerrestialMinimap } from "@/components/terrestial/utils/minimap";
import { useGameContext } from "@/hooks/useGame/context";
import { registerMeadowSounds } from "@/components/terrestial/audio/meadow";
import { registerFootstepsSounds } from "@/components/terrestial/audio/footsteps";

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
