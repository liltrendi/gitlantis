import { Suspense } from "react";
import { Physics } from "@react-three/cannon";
import { WorldCanvas } from "@/browser/components/world/marine/canvas";
import { Camera } from "@/browser/components/world/marine/camera";
import { Lights } from "@/browser/components/world/marine/lights";
import { Sky } from "@/browser/components/world/marine/sky";
import { Audio } from "@/browser/components/world/marine/audio";
import { Ocean } from "@/browser/components/world/marine/ocean";
import { Boat } from "@/browser/components/world/marine/boat";
import { Nodes } from "@/browser/components/world/marine/nodes";
import { Minimap } from "@/browser/components/world/marine/minimap";

export const MarineLayer = () => {
  return (
    <WorldCanvas>
      <Suspense fallback={null}>
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
      </Suspense>
    </WorldCanvas>
  );
};
