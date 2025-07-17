import { useCallback, useEffect, useRef } from "react";
import throttle from "lodash.throttle";
import type { RefObject } from "react";
import { useExtensionContext } from "@/browser/hooks/useExtension/context";
import type { TDirectoryContent } from "@/extension/types";
import { DIRECTORY_COMMANDS } from "@/extension/config";
import { NODE_SHORTCUTS } from "@/browser/config";

export const useNodeShortcuts = ({
  enabled = true,
  nodes,
  collisionStateRef,
}: {
  enabled?: boolean;
  nodes: TNodeInstance[];
  collisionStateRef: RefObject<boolean[]>;
}) => {
  const { vscodeApi, setCurrentPath } = useExtensionContext();
  const pressedKeys = useRef<Set<string>>(new Set());

  const getCollidingNode = useCallback((): TNodeInstance | null => {
    if (!collisionStateRef.current) return null;
    const collidingIndex = collisionStateRef.current.findIndex(
      (isColliding) => isColliding
    );
    return collidingIndex >= 0 ? nodes[collidingIndex] : null;
  }, [nodes, collisionStateRef]);

  const throttledOpenNode = useRef(
    throttle(
      ({ type, path }: TDirectoryContent) => {
        if (!vscodeApi) return;
        if (type === "file") {
          vscodeApi.postMessage({
            type: DIRECTORY_COMMANDS.open_file,
            path: path.path,
          });
        } else {
          setCurrentPath(path.path);
        }
      },
      500,
      { trailing: false }
    )
  ).current;

  const throttledGoBackOneDirectory = useRef(
    throttle(
      () => {
        if (!vscodeApi) return;
        setCurrentPath((prevState) => {
          const newPath = prevState.split("/").slice(0, -1).join("/");
          return newPath !== "" ? newPath : prevState;
        });
      },
      500,
      { trailing: false }
    )
  ).current;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      pressedKeys.current.add(event.key);

      if (pressedKeys.current.has("Escape")) {
        throttledGoBackOneDirectory();
        return;
      }

      for (const shortcut of NODE_SHORTCUTS) {
        const combinationPressed = shortcut.keys.every((requiredKey) =>
          pressedKeys.current.has(requiredKey)
        );

        if (!combinationPressed) continue;

        const nodeInfo = getCollidingNode()?.data;
        if (!nodeInfo) return;
        event.preventDefault();
        throttledOpenNode(nodeInfo);
      }
    },
    [enabled, getCollidingNode, throttledOpenNode, throttledGoBackOneDirectory]
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
      throttledOpenNode.cancel();
    };
  }, [handleKeyDown, handleKeyUp, enabled, throttledOpenNode]);

  useEffect(() => {
    if (!enabled) {
      pressedKeys.current.clear();
    }
  }, [enabled]);

  useEffect(() => {
    const handleBlur = () => {
      pressedKeys.current.clear();
    };

    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return {
    getCollidingNode,
  };
};
