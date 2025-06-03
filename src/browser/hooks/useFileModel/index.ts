import { FILE_MODEL_PATH } from "@/browser/config";
import { useGLTF } from "@react-three/drei";

const modelUris = (window as any).__MODEL_URIS__ || {
  file: FILE_MODEL_PATH
};

export const useFileModel = () => {
  const model = useGLTF(modelUris.file as string);  
  return model.scene;
};
