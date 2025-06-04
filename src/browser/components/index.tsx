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
import { useWalker } from "@/browser/hooks/useWalker";

export const World = () => {
  const { walker, openExplorer } = useWalker();

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
      <Canvas id="world">
        <Suspense fallback={null}>
          <Physics>
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