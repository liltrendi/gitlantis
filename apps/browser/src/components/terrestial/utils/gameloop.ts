import type { RefObject } from "react";
import type {
  AnimationMixer,
  Clock,
  InstancedBufferGeometry,
  Mesh,
  MeshPhongMaterial,
  Object3DEventMap,
  PerspectiveCamera,
  PlaneGeometry,
  RawShaderMaterial,
  Scene,
  Shader,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";
import type { GLTF, OrbitControls } from "three-stdlib";
import type { MovementControls } from "@/components/terrestial/events/movement";
import { controlPlayerMovement } from "@/components/terrestial/player/utils";
import {
  setupAnimationRunner,
  setupSkyAnimation,
} from "@/components/terrestial/utils/animations";
import type { TerrestialMinimap } from "@/components/terrestial/utils/minimap";

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
  minimap,
  isMinimapFullScreenRef,
  ground,
  grass,
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
  minimap: TerrestialMinimap;
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
  groundShaderRef: () => Shader | null;
  isMinimapFullScreenRef: RefObject<boolean>;
  ground: Mesh<PlaneGeometry, MeshPhongMaterial, Object3DEventMap>;
  grass: Mesh<InstancedBufferGeometry, RawShaderMaterial, Object3DEventMap>;
}) {
  const animate = () => {
    renderer.clear();

    rootScene.add(grassScene, skyScene);
    renderer.render(rootScene, camera);

    animationFrameRef.current = requestAnimationFrame(animate);

    const playerModel = playerModelRef();
    const groundShader = groundShaderRef();
    const playerAnimationMixer = playerAnimationMixerRef();

    if (!playerModel || !groundShader || !playerAnimationMixer) {
      return;
    }

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
      groundShader,
      playerModel,
      playerAnimationMixer,
      wasInitialAnimationPlayed,
    });

    minimap.render({
      renderer,
      scene: grassScene,
      playerModel,
      isFullScreen: isMinimapFullScreenRef.current,
      ground,
      grass,
    });
  };

  const gameLoopCleanup = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  animate();

  return { gameLoopCleanup };
}
