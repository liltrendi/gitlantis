import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";

export const MarineCanvas = ({
  children,
  visible,
}: {
  children: ReactNode;
  visible: boolean;
}) => {
  return (
    <Canvas
      id="marineCanvas"
      className={`absolute inset-0 transition-opacity duration-500 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {children}
    </Canvas>
  );
};
