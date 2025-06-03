import { Stats } from "@react-three/drei";
import { Camera } from "@/browser/components/setup/camera";
import { Lights } from "@/browser/components/setup/lights";
import { Sky } from "@/browser/components/setup/sky";
import { Minimap } from "@/browser/components/setup/minimap";
import { useRecalibration } from "@/browser/hooks/useRecalibration";

export const Setup = () => {
  useRecalibration();

  return (
    <>
      <Camera />
      <Lights />
      <Sky />
      <Minimap />
      <Stats showPanel={3} />
    </>
  );
};
