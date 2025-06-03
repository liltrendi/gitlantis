import { NODE_SHORTCUTS } from "@/browser/config";
import type { TDirectoryContent } from "@/extension/types";
import { useEffect, useCallback, useRef, type RefObject } from "react";

export const useNodeShortcuts = ({
  enabled = true,
  nodes,
  collisionStateRef,
}: {
  enabled?: boolean;
  nodes: TNodeInstance[];
  collisionStateRef: RefObject<boolean[]>;
}) => {
  const pressedKeys = useRef<Set<string>>(new Set());

  const getCollidingNode = useCallback((): TNodeInstance | null => {
    if (!collisionStateRef.current) return null;

    const collidingIndex = collisionStateRef.current.findIndex(
      (isColliding) => isColliding
    );
    return collidingIndex >= 0 ? nodes[collidingIndex] : null;
  }, [nodes, collisionStateRef]);

  const openNode = useCallback(({name, type}: TDirectoryContent) => {
    console.log("openNode::", name);
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      const key = event.key;
      pressedKeys.current.add(key);

      for (const shortcut of NODE_SHORTCUTS) {
        const combinationPressed = shortcut.keys.every((requiredKey) =>
          pressedKeys.current.has(requiredKey)
        );

        if (!combinationPressed) return;

        const nodeInfo = getCollidingNode()?.data;
        if (nodeInfo) {
          event.preventDefault();
          openNode(nodeInfo);
        }
      }
    },
    [enabled, getCollidingNode]
  );

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    pressedKeys.current.delete(event.key);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp, enabled]);

  useEffect(() => {
    if (!enabled) {
      pressedKeys.current.clear();
    }
  }, [enabled]);

  return {
    getCollidingNode,
  };
};
