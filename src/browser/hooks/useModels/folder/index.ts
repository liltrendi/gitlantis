import { FOLDER_MODEL_PATH } from "@/browser/config";
import { useGLTF } from "@react-three/drei";

const globalUris = (window as any).__GLOBAL_URIS__ || {
  folder: FOLDER_MODEL_PATH
};

export const useFolderModel = () => {
  const model = useGLTF(globalUris.folder as string);  
  return model.scene;
};
