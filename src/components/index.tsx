import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { GameContextProvider } from "@/context";
import { Setup } from "@/components/setup";
import { Ocean } from "@/components/ocean";
import { Boat } from "@/components/boat";
import { Cabinets } from "@/components/filesystem";
import { Button, Container, Icon, Text } from "@/components/styles";
import { useDirectoryWalker } from "@/hooks/useDirectoryWalker";
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
            <Cabinets />
          </Physics>
        </GameContextProvider>
      </Suspense>
    </Canvas>
  );
};

export default World;
