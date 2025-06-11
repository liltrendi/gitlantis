import { CLOUDFRONT_ROOT_URL, FILE_MODEL_PATH } from "@/browser/config";
import { useGLTF } from "@react-three/drei";

const globalUris = (window as any).__GLOBAL_URIS__ || {
  file: FILE_MODEL_PATH,
};

export const useFileModel = (isBrowserEnvironment: boolean) => {
  const model = useGLTF(
    `${isBrowserEnvironment ? CLOUDFRONT_ROOT_URL : ""}${globalUris.file}`
  );
  return model.scene;
};
