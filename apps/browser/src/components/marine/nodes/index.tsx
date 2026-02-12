import type { Group } from "three";
import { Folder } from "@/components/marine/nodes/folder";
import { File } from "@/components/marine/nodes/file";
import { useFolderModel } from "@/hooks/useModels/folder";
import { useFileModel } from "@/hooks/useModels/file";
import { useNodeMovement } from "@/hooks/useNode/movement";
import { useNodePlacement } from "@/hooks/useNode/placement";
import { useNodeCollision } from "@/hooks/useNode/collision";

export type TNodeProps = {
  label: string;
  index: number;
  model: Group;
  nodeRef: TNodeRef;
  instance: TNodeInstance;
  isColliding: boolean;
  isBrowserEnvironment: boolean;
  isMinimapFullScreen: boolean;
  openOnClick: () => void;
};

export const Nodes = () => {
  const { nodes, boatRef, nodeRef, isBrowserEnvironment, isMinimapFullScreen } =
    useNodePlacement();

  const fileModel = useFileModel(isBrowserEnvironment);
  const folderModel = useFolderModel(isBrowserEnvironment);

  const { trackedCollisions, throttledOpenNode } = useNodeCollision({
    nodes,
    boatRef,
    nodeRef,
  });
  useNodeMovement({ nodes, boatRef, nodeRef, isMinimapFullScreen });

  return (
    <>
      {nodes.map((instance, index) => {
        const isFile = instance.data.type === "file";
        const isColliding = trackedCollisions[index] || false;
        const sharedProps = {
          index,
          instance,
          nodeRef,
          isColliding,
          isBrowserEnvironment,
          isMinimapFullScreen,
          label: instance.data.name,
          model: isFile ? fileModel : folderModel,
          key: `${instance.data.type}-${instance.key}`,
          openOnClick: () => throttledOpenNode(instance.data),
        };
        if (isFile) {
          return <File {...sharedProps} />;
        }
        return <Folder {...sharedProps} />;
      })}
    </>
  );
};
