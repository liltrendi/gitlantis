import { Folder } from "@/components/nodes/folder";
import { File } from "@/components/nodes/file";
import { useFolderModel } from "@/hooks/useFolderModel";
import { useNodeMovement } from "@/hooks/useNodeMovement";
import { useNodePlacement } from "@/hooks/useNodePlacement";
import { useNodeCollision } from "@/hooks/useNodeCollision";
import { useGameContext } from "@/hooks/useGameContext";
import { useFileModel } from "@/hooks/useFileModel";

export const Nodes = () => {
  const { worldOffsetRef, boatRef, nodeRef, projectInfoRef } = useGameContext();

  const folderModel = useFolderModel();
  const fileModel = useFileModel();

  const { nodes } = useNodePlacement({
    boatRef,
    nodeRef,
    worldOffsetRef,
    projectInfoRef,
  });

  useNodeMovement({ nodes, boatRef, nodeRef });
  useNodeCollision({ boatRef, nodeRef });

  return (
    <>
      {nodes.map((instance, index) => {
        const isFile = instance.data.type === "file";
        const sharedProps = {
          index,
          instance,
          nodeRef,
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
