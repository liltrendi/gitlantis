import { Suspense } from "react";
import { Physics } from "@react-three/cannon";
import { GameContextProvider } from "@/browser/context/game";
import { GameCanvas } from "@/browser/components/canvas";
import { Splash } from "@/browser/components/shared/splash";
import { Camera } from "@/browser/components/camera";
import { Lights } from "@/browser/components/lights";
import { Sky } from "@/browser/components/sky";
import { Audio } from "@/browser/components/audio";
import { Ocean } from "@/browser/components/ocean";
import { Boat } from "@/browser/components/boat";
import { Nodes } from "@/browser/components/nodes";
import { GlobalSettings } from "@/browser/components/settings";
import { Minimap } from "@/browser/components/minimap";
import { Breadcrumbs } from "@/browser/components/shared/breadcrumbs";
import { Compass } from "@/browser/components/shared/compass";
import { MinimapToggle } from "@/browser/components/minimap/toggle";
import { Joystick } from "@/browser/components/joystick";

export const World = () => {
  return (
    <GameContextProvider>
      <Splash />
      <Breadcrumbs />
      <Compass />
      <Joystick />
      <GlobalSettings />
      <MinimapToggle />
      <GameCanvas>
        <Suspense fallback={null}>
          <Physics>
            <Minimap />
            <Camera />
            <Lights />
            <Sky />
            <Audio />
            <Ocean />
            <Boat />
            <Nodes />
          </Physics>
        </Suspense>
      </GameCanvas>
    </GameContextProvider>
  );
};
