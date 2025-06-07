import { FILE_MODEL_PATH } from "@/browser/config";
import { useGLTF } from "@react-three/drei";

const globalUris = (window as any).__GLOBAL_URIS__ || {
  file: FILE_MODEL_PATH
};

export const useFileModel = () => {
  const model = useGLTF(globalUris.file as string);  
  return model.scene;
};
