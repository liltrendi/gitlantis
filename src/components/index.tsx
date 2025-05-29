"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Setup } from "@/components/setup";
import { Camera } from "@/components/camera";
import { Sky } from "@/components/sky";
import { Ocean } from "@/components/ocean";
import { Boat } from "@/components/boat";
import { Cabinets } from "@/components/cabinet";
import { getGameConfig } from "@/config";

const World = () => {
  const { boatRef, oceanTilesRef, cabinetsRef, floatingOriginOffset } =
    getGameConfig();

  return (
    <Canvas>
      <Suspense fallback={null}>
        <Setup
          boatRef={boatRef}
          cabinetsRef={cabinetsRef}
          oceanTilesRef={oceanTilesRef}
          floatingOriginOffset={floatingOriginOffset}
        />
        <Physics>
          <Sky />
          <Boat ref={boatRef} />
          <Ocean boatRef={boatRef} />
          <Cabinets
            cabinetCount={50}
            boatRef={boatRef}
            cabinetsRef={cabinetsRef}
            floatingOriginOffset={floatingOriginOffset}
          />
          <Camera boatRef={boatRef} />
        </Physics>
      </Suspense>
    </Canvas>
  );
};

export default World;
