export const DEFAULT_SETTINGS: TDefaultSettings = {
  minimap: "Show",
  breadcrumbs: "Show",
  compass: "Show",
  nodesToShow: "Folders and files",
  boatSpeed: 3.0,
  acceleration: 0.02,
  deceleration: 0.01,
  turnSpeed: 0.02,
  turnDeceleration: 0.05,
  collisionRadius: 100,
  collisionPushStrength: 5,
  rockingAmplitude: 0.03,
  rockingSpeed: 0.30,
  bobbingAmplitude: 0.20,
  bobbingSpeed: 0.6,
  volume: 0.5,
} as const;

export const PERSISTED_SETTINGS_KEY = "__gitlantis_._settings__";
