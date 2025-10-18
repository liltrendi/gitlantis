import { Suspense } from "react";
import { MarineWorld } from "@/browser/components/world/marine";
import { TerrestialWorld } from "@/browser/components/world/terrestial";
import { useWorldFader } from "@/browser/hooks/useWorldFader";
import { WorldWrapper } from "@/browser/components/world/styles";

export const WorldLayer = () => {
  const { showSplashScreen, visibleWorld, fadeStage } = useWorldFader();

  return (
    <WorldWrapper showSplashScreen={showSplashScreen} fadeStage={fadeStage}>
      <Suspense fallback={null}>
        <MarineWorld visible={visibleWorld === "marine"} />
        <TerrestialWorld visible={visibleWorld === "terrestial"} />
      </Suspense>
    </WorldWrapper>
  );
};
