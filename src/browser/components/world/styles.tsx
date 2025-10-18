import { type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

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

export const WorldWrapper = ({
  children,
  showSplashScreen,
  fadeStage,
}: {
  children: ReactNode;
  showSplashScreen: boolean;
  fadeStage: "idle" | "fadingOut" | "fadingIn";
}) => {
  return (
    <div
      className={`relative h-screen w-screen overflow-hidden ${
        showSplashScreen ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {children}
      <div
        className={`pointer-events-none absolute inset-0 bg-black ${
          fadeStage === "fadingOut"
            ? "animate-fadeIn"
            : fadeStage === "fadingIn"
              ? "animate-fadeOutDelay"
              : "opacity-0"
        }`}
      />

      <style>
        {`
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes fadeOutDelay {
                0% {
                opacity: 1;
                }
                30% {
                opacity: 1;
                }
                100% {
                opacity: 0;
                }
            }

            .animate-fadeIn {
                animation: fadeIn 0.6s ease-in-out forwards;
            }

            .animate-fadeOutDelay {
                animation: fadeOutDelay 0.8s ease-in-out forwards;
            }
        `}
      </style>
    </div>
  );
};
