import { FOLDER_MODEL_PATH } from "@/browser/config";
import { useGLTF } from "@react-three/drei";

const modelUris = (window as any).__MODEL_URIS__ || {
  folder: FOLDER_MODEL_PATH
};

export const useFolderModel = () => {
  const model = useGLTF(modelUris.folder as string);  
  return model.scene;
};
