import { PerspectiveCamera } from "three";

export const setupTerrestialWorldCamera = () => {
  const FOV = 40;
  const camera = new PerspectiveCamera(
    FOV,
    window.innerWidth / window.innerHeight,
    1,
    20000
  );
  camera.position.set(-30, 5, 30);
  return { camera, FOV };
};
