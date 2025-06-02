import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { GameContextProvider } from "@/context";
import { Setup } from "@/components/setup";
import { Ocean } from "@/components/ocean";
import { Boat } from "@/components/boat";
import { Cabinets } from "@/components/cabinets";
import { Button, Container, Icon, Text } from "@/components/styles";
import { useDirectoryWalker } from "@/hooks/useDirectoryWalker";
import { DIRECTORY_ERRORS } from "@/extension/config";
import { useEnvironment } from "@/hooks/useEnvironment";

const World = () => {
  const debug = true;
  const {vscodeRef} = useEnvironment();
  const { walkerLoading, walkerError, walkerResponse, openFolder } =
    useDirectoryWalker({ vscodeRef });


  console.log("gitlantis::useEnvironment", walkerResponse, walkerError);

  if (walkerLoading && !debug) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  }

  if (walkerError && !debug) {
    return (
      <Container>
        <Text>{walkerError.message}</Text>
        {walkerError.type === DIRECTORY_ERRORS.no_open_project ? (
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
        <GameContextProvider directories={walkerResponse}>
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
