import {
  setupAnimationRunner,
  setupSkyAnimation,
} from "@/browser/components/world/terrestial/utils/animations";
import type { RefObject } from "react";
import type {
  Clock,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";

export function runGameLoop({
  camera,
  renderer,
  rootScene,
  skyScene,
  grassMaterial,
  skyMaterial,
  grassScene,
  globalClock,
  animationFrameRef,
  getTime,
  setTime,
  setLastFrame,
  getLastFrame,
}: {
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  grassMaterial: ShaderMaterial;
  skyMaterial: ShaderMaterial;
  rootScene: Scene;
  skyScene: Scene;
  grassScene: Scene;
  globalClock: Clock;
  animationFrameRef: RefObject<number | null>;
  getTime: () => number;
  setTime: (v: number) => void;
  setLastFrame: (time: number) => void;
  getLastFrame: () => number;
}) {
  const animate = () => {
    setupAnimationRunner({
      grassMaterial,
      getTime,
      setTime,
      getLastFrame,
      setLastFrame,
    });

    setupSkyAnimation({
      globalClock,
      skyMaterial,
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
