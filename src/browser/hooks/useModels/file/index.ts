import { CLOUDFRONT_ROOT_URL, globalUris } from "@/browser/config";
import { useGLTF } from "@react-three/drei";

export const useFileModel = (isBrowserEnvironment: boolean) => {
  const model = useGLTF(
    `${isBrowserEnvironment ? CLOUDFRONT_ROOT_URL : ""}${globalUris.file}`
  );
  return model.scene;
};
