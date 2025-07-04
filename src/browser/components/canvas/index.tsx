import { useGameContext } from "@/browser/hooks/useGame/context";
import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";

export const GameCanvas = ({ children }: { children: ReactNode }) => {
  const { showSplashScreen } = useGameContext();

  return (
    <div
      className={`${
        showSplashScreen ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <Canvas id="worldCanvas" className="!h-[100vh] !w-[100vw]">
        {children}
      </Canvas>
    </div>
  );
};
