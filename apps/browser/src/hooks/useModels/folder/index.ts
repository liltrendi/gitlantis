import {
  CLOUDFRONT_ROOT_URL,
  globalUris,
} from "@/packages/shared/browser-config";
import { useGLTF } from "@react-three/drei";

export const useFolderModel = (isBrowserEnvironment: boolean) => {
  const model = useGLTF(
    `${isBrowserEnvironment ? CLOUDFRONT_ROOT_URL : ""}${globalUris.folder}`
  );
  return model.scene;
};
