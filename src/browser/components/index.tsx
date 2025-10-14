import { GameContextProvider } from "@/browser/context/game";
import { UILayer } from "@/browser/components/ui";
import { MarineLayer } from "@/browser/components/world/marine";

export const World = () => {
  return (
    <GameContextProvider>
      <UILayer />
      <MarineLayer />
    </GameContextProvider>
  );
};
