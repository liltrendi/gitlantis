import { useEffect, useRef, useState } from "react";
import { setupTerrestialWorldTextures } from "@/components/terrestial/utils/textures";
import { setupOrbitControls } from "@/components/terrestial/utils/controls";
import { setupTerrestialWorldRenderer } from "@/components/terrestial/utils/renderer";
import { setupTerrestialWorldCamera } from "@/components/terrestial/utils/camera";
import { setupTerrestialWorldConfiguration } from "@/components/terrestial/utils/config";
import { HeightMap } from "@/components/terrestial/utils/height";
import {
  globalUris,
  CLOUDFRONT_ROOT_URL,
} from "@/packages/shared/browser-config";
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
import { setupHouses, type HouseUIState } from "@/components/terrestial/houses";

export const TerrestialWorld = ({ visible }: { visible: boolean }) => {
  const { isBrowserEnvironment } = useExtensionContext();
  const { isMinimapFullScreen, activeWorld } = useGameContext();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMinimapFullScreenRef = useRef(isMinimapFullScreen);
  const [housesUI, setHousesUI] = useState<HouseUIState[]>([]);

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

    const rootUrl = isBrowserEnvironment ? CLOUDFRONT_ROOT_URL : "";
    const noiseTexturePath = `${rootUrl}${globalUris.noiseTexture}`;
    const heightMap = new HeightMap(noiseTexturePath);

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

    const housesController = setupHouses({
      grassScene,
      gltfModelLoader,
      setHousesUI,
      heightMap,
      isBrowserEnvironment,
    });

    const { gameLoopCleanup } = runGameLoop({
      camera,
      radius,
      housesController,
      heightMap,
      delta,
      width,
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
    <div
      className={`absolute inset-0 transition-opacity duration-500 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {housesUI.map((house) => (
          <div
            key={house.id}
            className="pointer-events-auto absolute flex min-w-[200px] flex-col items-center gap-2 whitespace-nowrap rounded-xl border-[1.5px] border-[#fbd348] bg-black/80 p-4 px-6 text-white shadow-xl backdrop-blur-md transition-transform hover:scale-105"
            style={{
              left: house.x,
              top: house.y,
              transform: `translate(-50%, -100%) scale(${house.scale})`,
              opacity: house.visible ? 1 : 0,
              display: house.visible ? "flex" : "none",
            }}
          >
            <a
              href={house.url}
              target="_blank"
              rel="noreferrer"
              className="text-xl font-bold text-[#fbd348] hover:underline"
            >
              Buy me a coffee - {house.name}
            </a>
            <div className="text-lg font-medium text-gray-300">
              "{house.message}"
            </div>
            <div className="mt-1 flex items-center gap-2 text-base font-bold text-[#fbd348]">
              <span className="text-2xl">☕</span> {house.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
