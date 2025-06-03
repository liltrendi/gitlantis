import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { useGameContext } from "@/browser/hooks/useGame/context";

export const useNodePlacement = () => {
  const { worldOffsetRef, boatRef, nodeRef, projectInfoRef } = useGameContext();
  const [nodes, setNodes] = useState<TNodeInstances>([]);

  const TILE_SIZE = 1000;
  const SINK_DEPTH_MIN = 5.0;
  const SINK_DEPTH_MAX = 5.0;
  const NODE_COUNT = projectInfoRef.current.directories.length ?? 0;
  const MIN_DISTANCE_FROM_BOAT = 200;
  const MIN_DISTANCE_BETWEEN_NODES = 100;
  const MAX_GENERATION_ATTEMPTS = 100;

  const getRandomlyGeneratedNodes = (boatPos: Vector3) => {
    if (!worldOffsetRef?.current) return [];

    const positionsToPlaceNodes: TNodeInstances = [];

    // create a grid-based approach for even distribution
    const GENERATION_RADIUS = TILE_SIZE * 1.5; // total generation area
    const GRID_SIZE = Math.ceil(Math.sqrt(NODE_COUNT * 1.5)); // slightly larger grid for better distribution
    const CELL_SIZE = (GENERATION_RADIUS * 2) / GRID_SIZE;

    // create grid cells and shuffle them for random selection
    const gridCells: Array<{ x: number; z: number }> = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        gridCells.push({
          x: (i - GRID_SIZE / 2) * CELL_SIZE + boatPos.x,
          z: (j - GRID_SIZE / 2) * CELL_SIZE + boatPos.z,
        });
      }
    }

    // shuffle the grid cells for random selection
    for (let i = gridCells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gridCells[i], gridCells[j]] = [gridCells[j], gridCells[i]];
    }

    const isValidPosition = (
      pos: [number, number],
      boatPos: Vector3,
      existingPositions: Array<[number, number]>
    ) => {
      // check distance from boat
      const distanceFromBoat = Math.hypot(
        pos[0] - boatPos.x,
        pos[1] - boatPos.z
      );
      if (distanceFromBoat < MIN_DISTANCE_FROM_BOAT) {
        return false;
      }

      // check distance from other nodes
      return !existingPositions.some(
        ([x, z]) =>
          Math.hypot(pos[0] - x, pos[1] - z) < MIN_DISTANCE_BETWEEN_NODES
      );
    };

    let nodeIndex = 0;

    // try to place nodes in shuffled grid cells
    for (const cell of gridCells) {
      if (nodeIndex >= NODE_COUNT) break;

      let attempts = 0;
      let placed = false;

      while (attempts < MAX_GENERATION_ATTEMPTS && !placed) {
        // add some randomness within the cell
        const offsetX = (Math.random() - 0.5) * CELL_SIZE * 0.8;
        const offsetZ = (Math.random() - 0.5) * CELL_SIZE * 0.8;

        const xPosition = cell.x + offsetX;
        const zPosition = cell.z + offsetZ;

        const candidatePosition: [number, number] = [xPosition, zPosition];

        if (
          isValidPosition(
            candidatePosition,
            boatPos,
            positionsToPlaceNodes.map((p) => [
              p.position[0] + worldOffsetRef.current!.x,
              p.position[2] + worldOffsetRef.current!.z,
            ])
          )
        ) {
          const randSink = Math.random();
          const randFloat = Math.random();

          const sinkOffset =
            SINK_DEPTH_MIN + randSink * (SINK_DEPTH_MAX - SINK_DEPTH_MIN);
          const floatPhase = randFloat * Math.PI * 2;

          positionsToPlaceNodes.push({
            key: `node-grid-${nodeIndex}`,
            position: [
              xPosition - worldOffsetRef.current.x,
              -sinkOffset,
              zPosition - worldOffsetRef.current.z,
            ],
            sinkOffset,
            floatPhase,
            data: projectInfoRef.current.directories[nodeIndex]
          });

          placed = true;
          nodeIndex++;
        }

        attempts++;
      }
    }

    return positionsToPlaceNodes;
  };

  useEffect(() => {
    if (!boatRef?.current) return;
    const boatPosition = boatRef.current.position;
    const generatedNodes = getRandomlyGeneratedNodes(boatPosition);
    setNodes(generatedNodes);
  }, [worldOffsetRef]);

  useEffect(() => {
    if (!nodeRef?.current) return;
    nodeRef.current = nodeRef.current.slice(0, nodes.length);
  }, [nodes.length]);

  return { nodes, boatRef, nodeRef };
};
