import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { MarineWorld } from "@/browser/components/world/marine";
import { TerrestialWorld } from "@/browser/components/world/terrestial";
import { useGameContext } from "@/browser/hooks/useGame/context";

export const WorldLayer = () => {
  const { showSplashScreen, activeWorld } = useGameContext();
  const wrapperStyles = showSplashScreen
    ? "pointer-events-none opacity-0"
    : "opacity-100";

  return (
    <div className={wrapperStyles}>
      <Canvas id="worldCanvas" className="!h-[100vh] !w-[100vw]">
        <Suspense fallback={null}>
          <Physics>
            <MarineWorld visible={activeWorld === "marine"} />
            <TerrestialWorld visible={activeWorld === "terrestial"} />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
};
