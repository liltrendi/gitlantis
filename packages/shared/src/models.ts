const OCEAN_MODEL_PATH = "/models/ocean/ocean.jpeg";
const BOAT_MODEL_PATH = "/models/boat/boat.glb";
const FOLDER_MODEL_PATH = "/models/folder/folder.glb";
const FILE_MODEL_PATH = "/models/file/file.glb";
const OCEAN_AUDIO_PATH = "/music/waves.mp3";
const FAVICON_PATH = "/images/favicon.png";
const HORN_AUDIO_PATH = "/music/horn.ogg";
const NOISE_TEXTURE_PATH = "/images/textures/noise_texture.jpg";
const GRASS_TEXTURE_PATH = "/images/textures/blade_diffuse.jpg";
const ALPHA_MAP_TEXTURE_PATH = "/images/textures/blade_alpha.jpg";
const PLAYER_MODEL_PATH = "/models/bot/bot.glb";
const MEADOW_AUDIO_PATH = "/music/meadow.mp3";
const FOOTSTEPS_AUDIO_PATH = "/music/footsteps.mp3";
const BASELINE_HOUSE_PATH = "/models/house/baseline.glb";

export const GLOBAL_MODEL_URLS = {
  player: PLAYER_MODEL_PATH,
  ocean: OCEAN_MODEL_PATH,
  boat: BOAT_MODEL_PATH,
  folder: FOLDER_MODEL_PATH,
  file: FILE_MODEL_PATH,
  waves: OCEAN_AUDIO_PATH,
  favicon: FAVICON_PATH,
  horn: HORN_AUDIO_PATH,
  noiseTexture: NOISE_TEXTURE_PATH,
  bladeDiffuse: GRASS_TEXTURE_PATH,
  bladeAlpha: ALPHA_MAP_TEXTURE_PATH,
  meadow: MEADOW_AUDIO_PATH,
  footsteps: FOOTSTEPS_AUDIO_PATH,
  baselineHouse: BASELINE_HOUSE_PATH,
} as const;
