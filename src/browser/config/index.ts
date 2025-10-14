export const CLOUDFRONT_ROOT_URL = `https://d309f6bqnc919e.cloudfront.net/gitlantis`;

export const OCEAN_MODEL_PATH = `/models/ocean/ocean.jpeg?v=1`;
export const BOAT_MODEL_PATH = `/models/boat/boat.glb?v=1`;
export const FOLDER_MODEL_PATH = `/models/folder/folder.glb?v=1`;
export const FILE_MODEL_PATH = `/models/file/file.glb?v=1`;
export const OCEAN_AUDIO_PATH = `/music/waves.mp3?v=1`;
export const FAVICON_PATH = `/images/favicon.png?v=1`;
export const HORN_AUDIO_PATH = `/music/horn.ogg?v=1`;

export const NODE_SHORTCUTS: Array<{ label: string; keys: string[] }> = [
  { label: "Shift+Enter to explore", keys: ["Shift", "Enter"] },
  { label: "Escape", keys: ["Escape"] },
  { label: "H", keys: ["H"] },
];

export const SAMPLE_DATA = [
  {
    name: ".cargo",
    type: "folder",
  },
  {
    name: "HeroicGamesLauncher",
    type: "folder",
  },
  {
    name: ".gitignore",
    type: "file",
  },
  {
    name: ".pipelines",
    type: "folder",
  },
  {
    name: ".vscode",
    type: "folder",
  },
  {
    name: "CODE_OF_CONDUCT.md",
    type: "file",
  },
  {
    name: "CONTRIBUTING.md",
    type: "file",
  },
  {
    name: "Cargo.lock",
    type: "file",
  },
  {
    name: "Cargo.toml",
    type: "file",
  },
  {
    name: "LICENSE",
    type: "file",
  },
  {
    name: "README.md",
    type: "file",
  },
  {
    name: "SECURITY.md",
    type: "file",
  },
  {
    name: "assets",
    type: "folder",
  },
  {
    name: "benches",
    type: "folder",
  },
  {
    name: "build.rs",
    type: "file",
  },
  {
    name: "rust-toolchain.toml",
    type: "file",
  },
  {
    name: "rustfmt.toml",
    type: "file",
  },
  {
    name: "src",
    type: "folder",
  },
  {
    name: "target",
    type: "folder",
  },
  {
    name: "tools",
    type: "folder",
  },
];
