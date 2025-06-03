import { Water } from "three-stdlib";
import { extend } from "@react-three/fiber";
import { useOceanRegen } from "@/browser/hooks/useOcean/regen";

extend({ Water });

export const Ocean = () => {
  const { tiles, sceneConfig, planeGeometry, oceanRef } = useOceanRegen();
  return (
    <>
      {tiles.map((tile, index) => (
        // @ts-ignore
        <water
          key={tile.key}
          args={[planeGeometry, sceneConfig]}
          position={tile.position}
          rotation-x={-Math.PI / 2}
          ref={(el: Water | null) => {
            if (!oceanRef?.current) return;
            oceanRef.current[index] = el;
          }}
        />
      ))}
    </>
  );
};
