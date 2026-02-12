import { RepeatWrapping, TextureLoader } from "three";
import {
  globalUris,
  CLOUDFRONT_ROOT_URL,
} from "@/packages/shared/browser-config";

export const setupTerrestialWorldTextures = ({
  isBrowserEnvironment,
}: {
  isBrowserEnvironment: boolean;
}) => {
  const textureLoader = new TextureLoader();
  textureLoader.crossOrigin = "";
  const rootUrl = isBrowserEnvironment ? CLOUDFRONT_ROOT_URL : "";
  const noiseTexture = textureLoader.load(
    `${rootUrl}${globalUris.noiseTexture}`
  );
  const grassTexture = textureLoader.load(
    `${rootUrl}${globalUris.bladeDiffuse}`
  );
  const alphaMapTexture = textureLoader.load(
    `${rootUrl}${globalUris.bladeAlpha}`
  );
  noiseTexture.wrapS = RepeatWrapping;
  noiseTexture.wrapT = RepeatWrapping;
  return { noiseTexture, grassTexture, alphaMapTexture };
};
