import { Folder } from "@/components/folder";
import { File } from "@/components/file";
import { useCabinetModel } from "@/hooks/useCabinetModel";
import { useCabinetMovement } from "@/hooks/useCabinetMovement";
import { useCabinetGeneration } from "@/hooks/useCabinetGeneration";
import { useCabinetCollision } from "@/hooks/useCabinetCollision";
import { useGameContext } from "@/hooks/useGameContext";
import { useFileModel } from "@/hooks/useFileModel";

export const Cabinets = () => {
  const { worldOffsetRef, boatRef, cabinetsRef, projectInfoRef } =
    useGameContext();

  const cabinetModel = useCabinetModel();
  const fileModel = useFileModel();

  const { cabinets } = useCabinetGeneration({
    boatRef,
    cabinetsRef,
    worldOffsetRef,
    projectInfoRef,
  });

  useCabinetMovement({ cabinets, boatRef, cabinetsRef });
  useCabinetCollision({ boatRef, cabinetsRef });

  return (
    <>
      {cabinets.map((instance, index) => {
        const isFile = instance.data.type === "file";
        const sharedProps = {
          index,
          instance,
          modelRef: cabinetsRef,
          label: instance.data.name,
          model: isFile ? fileModel : cabinetModel,
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
