import { RepeatWrapping, TextureLoader } from "three";
import {
  ALPHA_MAP_TEXTURE_PATH,
  GRASS_TEXTURE_PATH,
  NOISE_TEXTURE_PATH,
} from "@/browser/config";

export const setupTerrestialWorldTextures = () => {
  const textureLoader = new TextureLoader();
  textureLoader.crossOrigin = "";
  const noiseTexture = textureLoader.load(NOISE_TEXTURE_PATH);
  const grassTexture = textureLoader.load(GRASS_TEXTURE_PATH);
  const alphaMapTexture = textureLoader.load(ALPHA_MAP_TEXTURE_PATH);
  noiseTexture.wrapS = RepeatWrapping;
  noiseTexture.wrapT = RepeatWrapping;
  return { noiseTexture, grassTexture, alphaMapTexture };
};
