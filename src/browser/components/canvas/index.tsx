import { useGameContext } from "@/browser/hooks/useGame/context";
import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";

export const GameCanvas = ({ children }: { children: ReactNode }) => {
  const { splashScreenInvisible, settings } = useGameContext();
  console.log(":::splashScreenInvisible:::", splashScreenInvisible);

  return (
    <div
      className={`${
        settings.splashScreen === "Hide"
          ? "opacity-100"
          : splashScreenInvisible
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <Canvas id="worldCanvas" className="!h-[100vh] !w-[100vw]">
        {children}
      </Canvas>
    </div>
  );
};
