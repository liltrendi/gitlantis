import { useRef, useState } from "react";
import { Water } from "three-stdlib";
import { extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import { PlaneGeometry, RepeatWrapping, TextureLoader, Vector3 } from "three";
import { WATER_TEXTURE_PATH } from "@/config";

extend({ Water });

// this prevents the user from entering dark zones
const useFloatingOrigin = ({
  boatRef,
  floatingRefs,
  threshold = 500,
}: {
  boatRef: TBoatRef;
  floatingRefs: Array<TBoatRef>;
  threshold?: number;
}) => {
  const { camera } = useThree();
  const worldOffset = useRef(new Vector3());
  const origin = new Vector3();

  useFrame(() => {
    const boat = boatRef.current;
    if (!boat) return;

    const distance = boat.position.distanceTo(origin);
    if (distance > threshold) {
      const offset = boat.position.clone();

      boat.position.sub(offset);
      camera.position.sub(offset);
      worldOffset.current.add(offset);

      for (const ref of floatingRefs) {
        if (ref.current) ref.current.position.sub(offset);
      }
    }
  });

  return worldOffset;
};

export const Ocean = ({
  sunDirection,
  boatRef,
}: {
  sunDirection: Vector3;
  boatRef: TBoatRef;
}) => {
  const tilesRef = useRef<Array<Water | null>>([]);
  const [tiles, setTiles] = useState<
    Array<{ key: string; position: [number, number, number] }>
  >([]);

  const waterNormals = useLoader(TextureLoader, WATER_TEXTURE_PATH);
  waterNormals.wrapS = waterNormals.wrapT = RepeatWrapping;

  const TILE_SIZE = 1000;
  const TILES_RADIUS = 2;

  const sceneConfig = {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals,
    sunDirection,
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 0.7,
    fog: true,
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
    tilesRef.current.forEach((waterRef) => {
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

  useFloatingOrigin({
    boatRef,
    floatingRefs: tilesRef.current.map((tile) => ({ current: tile })),
  });

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
            tilesRef.current[index] = el;
          }}
        />
      ))}
    </>
  );
};
