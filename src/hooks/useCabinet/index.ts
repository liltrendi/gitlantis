import { CABINET_MODEL_PATH } from "@/config";
import { useGLTF } from "@react-three/drei";

const modelUris = (window as any).__MODEL_URIS__ || {
  cabinet: CABINET_MODEL_PATH
};

export const useCabinetModel = () => {
  const model = useGLTF(modelUris.cabinet as string);  
  return model.scene;
};
