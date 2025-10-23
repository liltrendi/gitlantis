import { Clock, Scene, Vector2 } from "three";
import { GLTFLoader } from "three-stdlib";

export const setupTerrestialWorldConfiguration = () => {
  const rootScene = new Scene();
  const grassScene = new Scene();
  const skyScene = new Scene();
  const globalClock = new Clock();
  const gltfModelLoader = new GLTFLoader();

  const globalCameraPosition = new Vector2(0.01, 0.01);
  const animationFrameRef = { current: null as number | null };

  const width = 100;
  const radius = 240;
  const azimuth = 0.4;
  const resolution = 64;
  const elevation = 0.2;
  const fogFade = 0.009;

  let timeValue = 0;
  let lastFrame = Date.now();
  const delta = width / resolution;

  const getTime = () => timeValue;
  const setTime = (v: number) => (timeValue = v);
  const getLastFrame = () => lastFrame;
  const setLastFrame = (v: number) => (lastFrame = v);

  return {
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
  };
};
