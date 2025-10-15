import { Camera } from "@/browser/components/world/marine/camera";
import { Lights } from "@/browser/components/world/marine/lights";
import { Sky } from "@/browser/components/world/marine/sky";
import { Audio } from "@/browser/components/world/marine/audio";
import { Ocean } from "@/browser/components/world/marine/ocean";
import { Boat } from "@/browser/components/world/marine/boat";
import { Nodes } from "@/browser/components/world/marine/nodes";
import { Minimap } from "@/browser/components/world/marine/minimap";

export const MarineWorld = ({ visible }: { visible: boolean }) => {
  return (
    <>
      {/* @ts-expect-error group isn't a valid React element */}
      <group visible={visible}>
        <Minimap />
        <Camera />
        <Lights />
        <Sky />
        <Audio />
        <Ocean />
        <Boat />
        <Nodes />
        {/* @ts-expect-error group isn't a valid React element */}
      </group>
    </>
  );
};
