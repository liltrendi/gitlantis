import type { PerspectiveCamera, WebGLRenderer } from "three";
import { OrbitControls } from "three-stdlib";

export const setupOrbitControls = ({
  camera,
  renderer,
}: {
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
}) => {
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.autoRotate = false;
  orbitControls.autoRotateSpeed = 1.0;
  orbitControls.maxDistance = 65.0;
  orbitControls.minDistance = 3.0;
  const fixedPolarAngle = Math.PI / 2 - 0.15;
  orbitControls.minPolarAngle = fixedPolarAngle;
  orbitControls.maxPolarAngle = fixedPolarAngle;
  orbitControls.enablePan = false;
  orbitControls.enableZoom = false;
  return { orbitControls };
};
