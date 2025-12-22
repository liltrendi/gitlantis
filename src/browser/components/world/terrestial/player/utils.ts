import {
  AnimationMixer,
  AnimationClip,
  PerspectiveCamera,
  Vector2,
  type ShaderLibShader,
  Vector3,
  AnimationAction,
  ShaderMaterial,
} from "three";
import { OrbitControls, type GLTF } from "three-stdlib";
import type { MovementControls } from "@/browser/components/world/terrestial/events/movement";

export const PLAYER_ANIMATIONS = {
  attack: "bob_rig|attack",
  die: "bob_rig|die",
  falling: "bob_rig|falling",
  falling_col: "bob_rig|falling_col",
  hurt: "bob_rig|hurt",
  idle: "bob_rig|idle",
  in_air: "bob_rig|in_air",
  jump: "bob_rig|jump",
  jump_gun: "bob_rig|jump_gun",
  kick: "bob_rig|kick",
  rest: "bob_rig|rest",
  run: "bob_rig|run",
  run_gun: "bob_rig|run_gun",
  walk: "bob_rig|walk",
  walk_gun: "bob_rig|walk_gun",
  walk_push: "bob_rig|walk_push",
} as const;

export type TPlayerAnimations =
  (typeof PLAYER_ANIMATIONS)[keyof typeof PLAYER_ANIMATIONS];

const headOffset = new Vector3(0, 5, 0);
let currentPlayerAnimationAction: AnimationAction | null = null;

export const getRotationDirection = ({
  turn,
  backward,
}: {
  backward: boolean;
  turn: "left" | "right";
}) => {
  let rotationDirection: number = 1;
  if (turn === "left") {
    rotationDirection = backward ? 1 : -1;
  } else {
    rotationDirection = backward ? -1 : 1;
  }
  return rotationDirection;
};

export const turnPlayer = ({
  dT,
  turn,
  camera,
  backward,
  playerModel,
  orbitControls,
}: {
  dT: number;
  backward: boolean;
  playerModel: GLTF;
  turn: "left" | "right";
  camera: PerspectiveCamera;
  orbitControls: OrbitControls;
}) => {
  if (!playerModel?.scene) return;

  const rotationSpeed = 0.25;
  const playerRotation = dT * rotationSpeed;

  if (turn === "left") {
    playerModel.scene.rotation.y += playerRotation;
  } else {
    playerModel.scene.rotation.y -= playerRotation;
  }

  const rotationAngle =
    playerRotation * getRotationDirection({ turn, backward });

  const playerPosition = playerModel.scene.position.clone();
  const cameraOffsetFromPlayer = camera.position.clone().sub(playerPosition);

  const originalX = cameraOffsetFromPlayer.x;
  const originalZ = cameraOffsetFromPlayer.z;

  cameraOffsetFromPlayer.x =
    originalX * Math.cos(rotationAngle) - originalZ * Math.sin(rotationAngle);
  cameraOffsetFromPlayer.z =
    originalX * Math.sin(rotationAngle) + originalZ * Math.cos(rotationAngle);

  camera.position.copy(playerPosition.clone().add(cameraOffsetFromPlayer));

  const target = playerPosition.clone().add(headOffset);
  orbitControls.target.copy(target);
};

export const playMovementAnimation = ({
  animationType,
  playerAnimationMixer,
  playerModel,
}: {
  animationType: TPlayerAnimations | null;
  playerAnimationMixer: AnimationMixer;
  playerModel: GLTF;
}) => {
  if (!playerAnimationMixer || !animationType) return;

  playerAnimationMixer.timeScale = 1;

  if (animationType === PLAYER_ANIMATIONS.walk) {
    playerAnimationMixer.timeScale = 0.85;
  }

  const newAction = playerAnimationMixer.clipAction(
    (playerModel.animations as unknown as { name: TPlayerAnimations }[]).find(
      (a) => a.name === animationType
    ) as AnimationClip
  );

  if (
    currentPlayerAnimationAction &&
    currentPlayerAnimationAction !== newAction
  ) {
    currentPlayerAnimationAction.stop();
  }

  newAction.play();
  currentPlayerAnimationAction = newAction;
};

export const repositionPlayerRotationWise = ({
  camera,
  playerModel,
  orbitControls,
  animationType,
}: {
  playerModel: GLTF;
  camera: PerspectiveCamera;
  orbitControls: OrbitControls;
  animationType: TPlayerAnimations | null;
}) => {
  const target = playerModel.scene.position.clone().add(headOffset);
  orbitControls.target.copy(target);

  const directionFromPlayerToCamera = new Vector3();

  directionFromPlayerToCamera
    .subVectors(camera.position, playerModel.scene.position)
    .normalize();

  // negating initially makes the player look at us while their intro animation plays
  if (!animationType) {
    directionFromPlayerToCamera.negate();
  }

  const currentYAxisRotation = playerModel.scene.rotation.y;
  const targetYAxisRotation = Math.atan2(
    -directionFromPlayerToCamera.x,
    -directionFromPlayerToCamera.z
  );

  const finalYRotation = (targetYAxisRotation - currentYAxisRotation) * 0.1;

  playerModel.scene.rotation.y += finalYRotation;

  orbitControls.update();
};

const updatePlayerAnimationMixer = ({
  globalDelta,
  playerAnimationMixer,
}: {
  playerAnimationMixer: AnimationMixer;
  globalDelta: number;
}) => {
  if (!playerAnimationMixer?.update) return;
  if (playerAnimationMixer?.update) {
    playerAnimationMixer.update(globalDelta);
  }
};

export const animatePlayerAndManageCamera = ({
  camera,
  playerModel,
  globalDelta,
  orbitControls,
  animationType,
  playerAnimationMixer,
}: {
  playerModel: GLTF;
  globalDelta: number;
  playerAnimationMixer: AnimationMixer;
  orbitControls: OrbitControls;
  camera: PerspectiveCamera;
  animationType: TPlayerAnimations | null;
}) => {
  updatePlayerAnimationMixer({ playerAnimationMixer, globalDelta });
  repositionPlayerRotationWise({
    playerModel,
    orbitControls,
    camera,
    animationType,
  });
};

export const updateUniformsAfterPlayerMovement = ({
  radius,
  grassMaterial,
  globalCameraPosition,
  groundShader,
}: {
  radius: number;
  playerModel: GLTF;
  globalCameraPosition: Vector2;
  grassMaterial: ShaderMaterial;
  groundShader: ShaderLibShader;
}) => {
  if (groundShader) {
    const materials = [groundShader, grassMaterial];
    materials.forEach((material) => {
      material.uniforms.radius.value = radius;
      material.uniforms.posX.value = globalCameraPosition.x;
      material.uniforms.posZ.value = globalCameraPosition.y;
    });
  }
};

export const controlPlayerMovement = ({
  dT,
  grassMaterial,
  camera,
  orbitControls,
  globalCameraPosition,
  radius,
  movementControls,
  globalDelta,
  playerModel,
  groundShader,
  playerAnimationMixer,
  wasInitialAnimationPlayed,
}: {
  dT: number;
  orbitControls: OrbitControls;
  globalCameraPosition: Vector2;
  radius: number;
  movementControls: MovementControls;
  globalDelta: number;
  groundShader: ShaderLibShader;
  camera: PerspectiveCamera;
  grassMaterial: ShaderMaterial;
  playerModel: GLTF;
  playerAnimationMixer: AnimationMixer;
  wasInitialAnimationPlayed: () => boolean;
}) => {
  const allowPlayerMovement = wasInitialAnimationPlayed();

  const playerSpeed = 3.5;

  const { forward, backward, left, right } = movementControls;

  const viewDirection = new Vector3();

  camera.getWorldDirection(viewDirection);

  const length = Math.hypot(viewDirection.x, viewDirection.z);
  viewDirection.x /= length;
  viewDirection.z /= length;

  let animationType: TPlayerAnimations | null = PLAYER_ANIMATIONS.idle;

  if (left || right) {
    const turn = left ? "left" : "right";
    turnPlayer({
      dT,
      turn,
      camera,
      backward,
      playerModel,
      orbitControls,
    });
  }

  const moveSpeed = allowPlayerMovement ? dT * playerSpeed : 0;

  if (forward !== backward) {
    const direction = forward ? 1 : -1;
    animationType = PLAYER_ANIMATIONS.walk;
    globalCameraPosition.x += moveSpeed * viewDirection.x * direction;
    globalCameraPosition.y += moveSpeed * viewDirection.z * direction;
  }

  if (!allowPlayerMovement) {
    animationType = null;
  }

  playMovementAnimation({ animationType, playerAnimationMixer, playerModel });

  updateUniformsAfterPlayerMovement({
    radius,
    grassMaterial,
    playerModel,
    globalCameraPosition,
    groundShader,
  });

  animatePlayerAndManageCamera({
    camera,
    playerModel,
    globalDelta,
    orbitControls,
    animationType,
    playerAnimationMixer,
  });
};
