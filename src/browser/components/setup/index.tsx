import { Stats } from "@react-three/drei";
import { Camera } from "@/browser/components/setup/camera";
import { Lights } from "@/browser/components/setup/lights";
import { Sky } from "@/browser/components/setup/sky";
import { useReset } from "@/browser/hooks/useReset";

export const Setup = () => {
  useReset();

  return (
    <>
      <Camera />
      <Lights />
      <Sky />
      <Stats showPanel={3} />
    </>
  );
};
