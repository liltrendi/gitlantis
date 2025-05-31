import { CABINET_FILE_PATH } from "@/config";
import { useGLTF } from "@react-three/drei";

export const useCabinetModel = () => {
  const model = useGLTF(CABINET_FILE_PATH);  
  return model.scene;
};
