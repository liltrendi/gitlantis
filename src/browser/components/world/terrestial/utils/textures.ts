import { RepeatWrapping, TextureLoader } from "three";
import {
  ALPHA_MAP_TEXTURE_PATH,
  CLOUDFRONT_MEADOW_URL,
  GRASS_TEXTURE_PATH,
  NOISE_TEXTURE_PATH,
} from "@/browser/config";

const globalUris = (window as any).__GLOBAL_URIS__ || {
  noiseTexture: NOISE_TEXTURE_PATH,
  bladeDiffuse: GRASS_TEXTURE_PATH,
  bladeAlpha: ALPHA_MAP_TEXTURE_PATH,
};

export const setupTerrestialWorldTextures = ({
  isBrowserEnvironment,
}: {
  isBrowserEnvironment: boolean;
}) => {
  const textureLoader = new TextureLoader();
  textureLoader.crossOrigin = "";
  const rootUrl = isBrowserEnvironment ? CLOUDFRONT_MEADOW_URL : "";
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
