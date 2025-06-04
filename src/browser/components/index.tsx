import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { GameContextProvider } from "@/browser/context/game";
import { Loading } from "@/browser/components/shared/loading";
import { NoOpenProject } from "@/browser/components/shared/no-open-project";
import { Setup } from "@/browser/components/setup";
import { Ocean } from "@/browser/components/ocean";
import { Boat } from "@/browser/components/boat";
import { Nodes } from "@/browser/components/nodes";
import { Minimap } from "@/browser/components/setup/minimap";
import { Breadcrumbs } from "@/browser/components/shared/breadcrumbs";
import { Compass } from "@/browser/components/shared/compass";
import { useWalker } from "@/browser/hooks/useWalker";
import { useGameStore } from "@/browser/store";

export const World = () => {
  const { walker, openExplorer } = useWalker();
  const { settings } = useGameStore();

  if (walker.loading) return <Loading />;

  if (walker.error && walker.response.length === 0) {
    return (
      <NoOpenProject
        type={walker.error.type}
        message={walker.error.message}
        action={openExplorer}
      />
    );
  }

  return (
    <GameContextProvider directories={walker.response}>
      {settings.showBreadcrumbs ? <Breadcrumbs /> : null}
      {settings.showCompass ? <Compass /> : null}
      <Canvas id="world">
        <Suspense fallback={null}>
          <Physics>
            {settings.showMinimap ? <Minimap /> : null}
            <Setup />
            <Ocean />
            <Boat />
            <Nodes />
          </Physics>
        </Suspense>
      </Canvas>
    </GameContextProvider>
  );
};
