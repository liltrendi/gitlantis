import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Sky } from "@/components/sky";
import { CAMERA_SETTINGS } from "@/config";

const World = () => {
  return (
    <Canvas camera={CAMERA_SETTINGS}>
      <Suspense fallback={null}>
        <Physics>
          <Sky />
        </Physics>
      </Suspense>
      <OrbitControls
        minDistance={500}
        maxDistance={500}
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={1.3}
        target={[0, 10, 0]}
      />
    </Canvas>
  );
};

export default World;
