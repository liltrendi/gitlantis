import {
  AnimationMixer,
  AnimationClip,
  PerspectiveCamera,
  Vector2,
  type Shader,
  Vector3,
  AnimationAction,
  ShaderMaterial,
} from "three";
import { OrbitControls, type GLTF } from "three-stdlib";
import type { MovementControls } from "@/components/terrestial/events/movement";
import {
  HeightMap,
  getSphereOffset,
} from "@/components/terrestial/utils/height";
import type { setupHouses } from "@/components/terrestial/houses";

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
let playerVerticalVelocity = 0;
let playerVerticalOffset = 0;
const GRAVITY = 25;
const JUMP_FORCE = 20;

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
  } else if (animationType === PLAYER_ANIMATIONS.run) {
    playerAnimationMixer.timeScale = 1.0;
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
    currentPlayerAnimationAction.fadeOut(0.2);
    newAction.reset().fadeIn(0.2).play();
  } else if (!currentPlayerAnimationAction) {
    newAction.play();
  }

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
  groundShader: Shader;
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
  heightMap,
  delta,
  housesController,
}: {
  dT: number;
  orbitControls: OrbitControls;
  globalCameraPosition: Vector2;
  radius: number;
  movementControls: MovementControls;
  globalDelta: number;
  groundShader: Shader;
  camera: PerspectiveCamera;
  grassMaterial: ShaderMaterial;
  playerModel: GLTF;
  playerAnimationMixer: AnimationMixer;
  wasInitialAnimationPlayed: () => boolean;
  heightMap: HeightMap;
  delta: number;
  housesController: ReturnType<typeof setupHouses>;
}) => {
  const allowPlayerMovement = wasInitialAnimationPlayed();

  const playerSpeed = movementControls.sprint ? 8.0 : 3.5;

  const { forward, backward, left, right, jumpPressed, sprint } =
    movementControls;

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
    animationType = sprint ? PLAYER_ANIMATIONS.run : PLAYER_ANIMATIONS.walk;

    const velX = moveSpeed * viewDirection.x * direction;
    const velY = moveSpeed * viewDirection.z * direction;

    const nextCamX = globalCameraPosition.x + velX;
    const nextCamY = globalCameraPosition.y + velY;

    const collisionInfo = housesController.checkCollision(
      playerModel.scene.position.x,
      playerModel.scene.position.z,
      nextCamX,
      nextCamY,
      delta
    );

    if (!collisionInfo.colliding) {
      globalCameraPosition.x = nextCamX;
      globalCameraPosition.y = nextCamY;
    } else {
      const nx = collisionInfo.normalX;
      const ny = collisionInfo.normalZ;

      const dot = velX * nx + velY * ny;

      let finalMoveX = velX;
      let finalMoveY = velY;

      if (dot < 0) {
        finalMoveX = velX - dot * nx;
        finalMoveY = velY - dot * ny;

        let mag = Math.hypot(finalMoveX, finalMoveY);
        if (mag < 0.001) {
          finalMoveX = ny;
          finalMoveY = -nx;
          mag = Math.hypot(finalMoveX, finalMoveY);
        }

        const speed = Math.hypot(velX, velY);
        finalMoveX = (finalMoveX / mag) * speed;
        finalMoveY = (finalMoveY / mag) * speed;
      }

      globalCameraPosition.x += finalMoveX;
      globalCameraPosition.y += finalMoveY;
    }
  }

  if (jumpPressed && playerVerticalOffset <= 0) {
    playerVerticalVelocity = JUMP_FORCE;
  }
  movementControls.jumpPressed = false;
  if (playerVerticalOffset > 0 || playerVerticalVelocity > 0) {
    playerVerticalVelocity -= GRAVITY * dT;
    playerVerticalOffset += playerVerticalVelocity * dT;

    if (playerVerticalOffset <= 0) {
      playerVerticalOffset = 0;
      playerVerticalVelocity = 0;
    }
  }

  if (playerVerticalOffset > 0) {
    animationType =
      playerVerticalVelocity > 0
        ? PLAYER_ANIMATIONS.jump
        : PLAYER_ANIMATIONS.falling;
  }

  if (!allowPlayerMovement) {
    animationType = null;
  }

  const localX = playerModel.scene.position.x;
  const localZ = playerModel.scene.position.z;
  const worldX = localX + globalCameraPosition.x * delta;
  const worldZ = localZ + globalCameraPosition.y * delta;
  const groundY = heightMap.getYPosition(worldX, worldZ);
  const sphereY = getSphereOffset(localX, localZ, radius);

  playerModel.scene.position.y = groundY + sphereY + playerVerticalOffset;

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
