import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { GameContextProvider } from "@/browser/context";
import { Setup } from "@/browser/components/setup";
import { Ocean } from "@/browser/components/ocean";
import { Boat } from "@/browser/components/boat";
import { Nodes } from "@/browser/components/nodes";
import { Button, Container, Icon, Text } from "@/browser/components/styles";
import { useDirectoryWalker } from "@/browser/hooks/useDirectoryWalker";
import { DIRECTORY_ERRORS } from "@/extension/config";

const World = () => {
  const { walker, openFolder } = useDirectoryWalker();

  if (walker.loading) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  }

  if (walker.error && walker.response.length === 0) {
    return (
      <Container>
        <Text>{walker.error.message}</Text>
        {walker.error.type === DIRECTORY_ERRORS.no_open_project ? (
          <Button onClick={openFolder}>
            <Icon />
            Open Folder
          </Button>
        ) : null}
      </Container>
    );
  }

  return (
    <Canvas id="world">
      <Suspense fallback={null}>
        <GameContextProvider directories={walker.response}>
          <Physics>
            <Setup />
            <Ocean />
            <Boat />
            <Nodes />
          </Physics>
        </GameContextProvider>
      </Suspense>
    </Canvas>
  );
};

export default World;
