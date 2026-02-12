import { Physics } from "@react-three/cannon";
import { Camera } from "@/components/marine/camera";
import { Lights } from "@/components/marine/lights";
import { Sky } from "@/components/marine/sky";
import { Audio } from "@/components/marine/audio";
import { Ocean } from "@/components/marine/ocean";
import { Boat } from "@/components/marine/boat";
import { Nodes } from "@/components/marine/nodes";
import { Minimap } from "@/components/marine/minimap";
import { MarineCanvas } from "@/components/marine/canvas";

export const MarineWorld = ({ visible }: { visible: boolean }) => {
  return (
    <MarineCanvas visible={visible}>
      <Physics>
        <Minimap />
        <Camera />
        <Lights />
        <Sky />
        <Audio />
        <Ocean />
        <Boat />
        <Nodes />
      </Physics>
    </MarineCanvas>
  );
};
