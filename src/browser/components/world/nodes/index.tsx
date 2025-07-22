import { Folder } from "@/browser/components/world/nodes/folder";
import { File } from "@/browser/components/world/nodes/file";
import { useFolderModel } from "@/browser/hooks/useModels/folder";
import { useFileModel } from "@/browser/hooks/useModels/file";
import { useNodeMovement } from "@/browser/hooks/useNode/movement";
import { useNodePlacement } from "@/browser/hooks/useNode/placement";
import { useNodeCollision } from "@/browser/hooks/useNode/collision";

export const Nodes = () => {
  const { nodes, boatRef, nodeRef, isBrowserEnvironment } = useNodePlacement();

  const fileModel = useFileModel(isBrowserEnvironment);
  const folderModel = useFolderModel(isBrowserEnvironment);

  const { trackedCollisions } = useNodeCollision({ nodes, boatRef, nodeRef });
  useNodeMovement({ nodes, boatRef, nodeRef });

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
          label: instance.data.name,
          model: isFile ? fileModel : folderModel,
          key: `${instance.data.type}-${instance.key}`,
        };
        if (isFile) {
          return <File {...sharedProps} />;
        }
        return <Folder {...sharedProps} />;
      })}
    </>
  );
};
