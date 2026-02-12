import { animateSkyFromDayToNight } from "@/browser/components/world/terrestial/materials/sky";
import type { Clock, ShaderMaterial } from "three";

export const setupAnimationRunner = ({
  grassMaterial,
  getTime,
  setTime,
  getLastFrame,
  setLastFrame,
}: any) => {
  const now = Date.now();
  const dT = (now - getLastFrame()) / 200.0;
  const updatedTime = getTime() + dT;
  setTime(updatedTime);
  setLastFrame(now);
  grassMaterial.uniforms.time.value = updatedTime;
  return dT;
};

export const setupSkyAnimation = ({
  globalClock,
  skyMaterial,
}: {
  globalClock: Clock;
  skyMaterial: ShaderMaterial;
}) => {
  const globalDelta = globalClock.getDelta();
  animateSkyFromDayToNight({ globalDelta, skyMaterial });
  return globalDelta;
};
