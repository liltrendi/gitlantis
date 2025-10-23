import type { RefObject } from "react";
import type {
  AnimationMixer,
  Clock,
  PerspectiveCamera,
  Scene,
  ShaderLibShader,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";
import type { GLTF, OrbitControls } from "three-stdlib";
import type { MovementControls } from "@/browser/components/world/terrestial/player/controls";
import { controlPlayerMovement } from "@/browser/components/world/terrestial/player/movement";
import {
  setupAnimationRunner,
  setupSkyAnimation,
} from "@/browser/components/world/terrestial/utils/animations";

export function runGameLoop({
  orbitControls,
  camera,
  radius,
  renderer,
  rootScene,
  skyScene,
  grassMaterial,
  skyMaterial,
  grassScene,
  globalClock,
  animationFrameRef,
  playerModelRef,
  playerAnimationMixerRef,
  globalCameraPosition,
  movementControls,
  wasInitialAnimationPlayed,
  getTime,
  setTime,
  setLastFrame,
  getLastFrame,
  groundShaderRef,
}: {
  orbitControls: OrbitControls;
  camera: PerspectiveCamera;
  radius: number;
  renderer: WebGLRenderer;
  grassMaterial: ShaderMaterial;
  skyMaterial: ShaderMaterial;
  rootScene: Scene;
  skyScene: Scene;
  grassScene: Scene;
  globalClock: Clock;
  wasInitialAnimationPlayed: () => boolean;
  animationFrameRef: RefObject<number | null>;
  playerModelRef: () => GLTF | null;
  playerAnimationMixerRef: () => AnimationMixer;
  getTime: () => number;
  setTime: (v: number) => void;
  setLastFrame: (time: number) => void;
  getLastFrame: () => number;
  movementControls: MovementControls;
  globalCameraPosition: Vector2;
  groundShaderRef: () => ShaderLibShader | null;
}) {
  const animate = () => {
    const dT = setupAnimationRunner({
      grassMaterial,
      getTime,
      setTime,
      getLastFrame,
      setLastFrame,
    });

    const globalDelta = setupSkyAnimation({
      globalClock,
      skyMaterial,
    });

    controlPlayerMovement({
      dT,
      camera,
      radius,
      globalDelta,
      orbitControls,
      grassMaterial,
      movementControls,
      globalCameraPosition,
      groundShaderRef,
      playerModelRef,
      playerAnimationMixerRef,
      wasInitialAnimationPlayed,
    });

    renderer.clear();

    rootScene.add(grassScene, skyScene);
    renderer.render(rootScene, camera);

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const cleanup = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  animate();

  return { cleanup };
}
