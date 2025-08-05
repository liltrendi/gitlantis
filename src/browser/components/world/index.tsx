import { Suspense } from "react";
import { Physics } from "@react-three/cannon";
import { WorldCanvas } from "@/browser/components/world/canvas";
import { Camera } from "@/browser/components/world/camera";
import { Lights } from "@/browser/components/world/lights";
import { Sky } from "@/browser/components/world/sky";
import { Audio } from "@/browser/components/world/audio";
import { Ocean } from "@/browser/components/world/ocean";
import { Boat } from "@/browser/components/world/boat";
import { Nodes } from "@/browser/components/world/nodes";
import { Minimap } from "@/browser/components/world/minimap";

export const WorldLayer = () => {
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
