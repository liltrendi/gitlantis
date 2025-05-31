"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { GameContextProvider } from "@/context";
import { Setup } from "@/components/setup";
import { Ocean } from "@/components/ocean";
import { Boat } from "@/components/boat";
import { Cabinets } from "@/components/cabinets";

const World = () => {
  return (
    <Canvas id="world">
      <Suspense fallback={null}>
        <GameContextProvider>
          <Physics>
            <Setup />
            <Ocean />
            <Boat />
            <Cabinets />
          </Physics>
        </GameContextProvider>
      </Suspense>
    </Canvas>
  );
};

export default World;
