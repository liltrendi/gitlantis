import { Folder } from "@/browser/components/nodes/folder";
import { File } from "@/browser/components/nodes/file";
import { useFolderModel } from "@/browser/hooks/useModels/folder";
import { useFileModel } from "@/browser/hooks/useModels/file";
import { useNodeMovement } from "@/browser/hooks/useNode/movement";
import { useNodePlacement } from "@/browser/hooks/useNode/placement";
import { useNodeCollision } from "@/browser/hooks/useNode/collision";

export const Nodes = () => {
  const fileModel = useFileModel();
  const folderModel = useFolderModel();

  const { nodes, boatRef, nodeRef } = useNodePlacement();
  const { trackedCollisions } = useNodeCollision({ boatRef, nodeRef });
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
