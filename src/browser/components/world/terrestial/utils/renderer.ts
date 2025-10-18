import type { RefObject } from "react";
import { WebGLRenderer } from "three";

export const setupTerrestialWorldRenderer = ({
  canvasRef,
}: {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}) => {
  const renderer = new WebGLRenderer({
    antialias: true,
    canvas: canvasRef.current ?? undefined,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  return { renderer };
};
