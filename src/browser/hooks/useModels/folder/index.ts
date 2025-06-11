import { CLOUDFRONT_ROOT_URL, FOLDER_MODEL_PATH } from "@/browser/config";
import { useGLTF } from "@react-three/drei";

const globalUris = (window as any).__GLOBAL_URIS__ || {
  folder: FOLDER_MODEL_PATH,
};

export const useFolderModel = (isBrowserEnvironment: boolean) => {
  const model = useGLTF(
    `${isBrowserEnvironment ? CLOUDFRONT_ROOT_URL : ""}${globalUris.folder}`
  );
  return model.scene;
};
