import { Stats } from "@react-three/drei";
import { Camera } from "@/components/setup/camera";
import { Lights } from "@/components/setup/lights";
import { Sky } from "@/components/setup/sky";
import { Minimap } from "@/components/setup/minimap";
import { useRecalibration } from "@/hooks/useRecalibration";

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
