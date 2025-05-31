import { Stats } from "@react-three/drei";
import { Camera } from "@/components/camera";
import { Lights } from "@/components/lights";
import { Sky } from "@/components/sky";
import { Minimap } from "@/components/minimap";
import { useRecalibration } from "@/hooks/useRecalibration";

export const Setup = () => {
  useRecalibration();

  return (
    <>
      <Camera />
      <Lights />
      <Sky />
      <Minimap />
      <Stats />
    </>
  );
};
