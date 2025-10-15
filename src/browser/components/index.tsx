import { GameContextProvider } from "@/browser/context/game";
import { UILayer } from "@/browser/components/ui";
import { WorldLayer } from "@/browser/components/world/";

export const World = () => {
  return (
    <GameContextProvider>
      <UILayer />
      <WorldLayer />
    </GameContextProvider>
  );
};
