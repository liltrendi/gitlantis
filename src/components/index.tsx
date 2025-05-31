"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { GameContextProvider } from "@/context";
import { Setup } from "@/components/setup";
import { Camera } from "@/components/camera";
import { Sky } from "@/components/sky";
import { Ocean } from "@/components/ocean";
import { Boat } from "@/components/boat";
import { Cabinets } from "@/components/cabinets";

const World = () => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <GameContextProvider>
          <Physics>
            <Setup />
            <Sky />
            <Boat />
            <Ocean />
            <Cabinets />
            <Camera />
          </Physics>
        </GameContextProvider>
      </Suspense>
    </Canvas>
  );
};

export default World;
