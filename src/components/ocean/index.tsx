import { useState } from "react";
import { Water } from "three-stdlib";
import { extend, useFrame, useLoader } from "@react-three/fiber";
import { PlaneGeometry, RepeatWrapping, TextureLoader, Vector3 } from "three";
import { OCEAN_MODEL_PATH } from "@/config";
import { useGameContext } from "@/hooks/useGameContext";

extend({ Water });

const modelUris = (window as any).__MODEL_URIS__ || {
  ocean: OCEAN_MODEL_PATH
};

export const Ocean = () => {
  const [tiles, setTiles] = useState<
    Array<{ key: string; position: [number, number, number] }>
  >([]);
  const { boatRef, oceanRef } = useGameContext();

  const waterNormals = useLoader(TextureLoader, modelUris.ocean as string);
  waterNormals.wrapS = waterNormals.wrapT = RepeatWrapping;

  const TILE_SIZE = 10000;
  const TILES_RADIUS = 2;

  const sceneConfig = {
    fog: true,
    waterNormals,
    textureWidth: 512,
    textureHeight: 512,
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 0.7,
    sunDirection: new Vector3(-1, 1, 1).normalize(),
  };

  const generateTiles = (boatPosition: Vector3) => {
    const boatTileX = Math.floor(boatPosition.x / TILE_SIZE);
    const boatTileZ = Math.floor(boatPosition.z / TILE_SIZE);

    const newTiles = [];

    for (let x = -TILES_RADIUS; x <= TILES_RADIUS; x++) {
      for (let z = -TILES_RADIUS; z <= TILES_RADIUS; z++) {
        const tileX = boatTileX + x;
        const tileZ = boatTileZ + z;
        const key = `${tileX}-${tileZ}`;

        newTiles.push({
          key,
          position: [tileX * TILE_SIZE, 0, tileZ * TILE_SIZE] as [
            number,
            number,
            number
          ],
        });
      }
    }

    return newTiles;
  };

  useFrame((_, delta) => {
    if (!oceanRef?.current) return;

    oceanRef.current.forEach((waterRef) => {
      if (waterRef?.material) {
        waterRef.material.uniforms.time.value += delta;
      }
    });

    if (boatRef?.current) {
      const newTiles = generateTiles(boatRef.current.position);

      const currentKeys = tiles
        .map((t) => t.key)
        .sort()
        .join(",");
      const newKeys = newTiles
        .map((t) => t.key)
        .sort()
        .join(",");

      if (currentKeys !== newKeys) {
        setTiles(newTiles);
      }
    }
  });

  const planeGeometry = new PlaneGeometry(TILE_SIZE, TILE_SIZE);

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
