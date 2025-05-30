import { CABINET_FILE_PATH } from "@/config";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";

export const useCabinetModel = () => {
  const model = useGLTF(CABINET_FILE_PATH);
  model.scene.scale.setScalar(20);
  model.scene.updateMatrixWorld(true);

  const cabinet = new Group();
  cabinet.add(model.scene);
  
  return cabinet;
};
