import { Physics } from "@react-three/cannon";
import { Camera } from "@/browser/components/world/marine/camera";
import { Lights } from "@/browser/components/world/marine/lights";
import { Sky } from "@/browser/components/world/marine/sky";
import { Audio } from "@/browser/components/world/marine/audio";
import { Ocean } from "@/browser/components/world/marine/ocean";
import { Boat } from "@/browser/components/world/marine/boat";
import { Nodes } from "@/browser/components/world/marine/nodes";
import { Minimap } from "@/browser/components/world/marine/minimap";
import { MarineCanvas } from "@/browser/components/world/styles";

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
