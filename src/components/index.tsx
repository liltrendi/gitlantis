"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Camera } from "@/components/camera";
import { Sky } from "@/components/sky";
import { Lights } from "@/components/lights";
import { Ocean } from "@/components/ocean";
import { Boat } from "@/components/boat";
import { getGameConfig } from "@/config";

const World = () => {
  const { sunDirection, boatRef } = getGameConfig();

  return (
    <Canvas>
      <Suspense fallback={null}>
        <Physics>
          <Sky />
          <Lights />
          <Ocean boatRef={boatRef} sunDirection={sunDirection} />
          <Boat ref={boatRef} />
          <Camera boatRef={boatRef} />
        </Physics>
      </Suspense>
    </Canvas>
  );
};

export default World;
