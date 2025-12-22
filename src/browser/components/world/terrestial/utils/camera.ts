import { PerspectiveCamera } from "three";

export const setupTerrestialWorldCamera = () => {
  const TERRESTIAL_CAMERA_FOV = 40;
  const camera = new PerspectiveCamera(
    TERRESTIAL_CAMERA_FOV,
    window.innerWidth / window.innerHeight,
    1,
    20000
  );
  camera.position.set(-30, 5, 30);
  return { camera };
};
