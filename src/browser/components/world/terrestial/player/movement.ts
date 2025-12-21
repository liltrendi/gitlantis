import {
  AnimationMixer,
  PerspectiveCamera,
  ShaderMaterial,
  Vector2,
  Vector3,
  type ShaderLibShader,
} from "three";
import type { GLTF, OrbitControls } from "three-stdlib";
import type { MovementControls } from "@/browser/components/world/terrestial/player/controls";
import {
  animatePlayerAndManageCamera,
  PLAYER_ANIMATIONS,
  playMovementAnimation,
  turnPlayer,
  updateUniformsAfterPlayerMovement,
  type TPlayerAnimations,
} from "@/browser/components/world/terrestial/player/utils";

export const controlPlayerMovement = ({
  dT,
  grassMaterial,
  camera,
  orbitControls,
  globalCameraPosition,
  radius,
  movementControls,
  globalDelta,
  playerModelRef,
  groundShaderRef,
  playerAnimationMixerRef,
  wasInitialAnimationPlayed,
}: {
  dT: number;
  orbitControls: OrbitControls;
  globalCameraPosition: Vector2;
  radius: number;
  movementControls: MovementControls;
  globalDelta: number;
  groundShaderRef: () => ShaderLibShader | null;
  camera: PerspectiveCamera;
  grassMaterial: ShaderMaterial;
  playerModelRef: () => GLTF | null;
  playerAnimationMixerRef: () => AnimationMixer;
  wasInitialAnimationPlayed: () => boolean;
}) => {
  const playerModel: GLTF | null = playerModelRef();
  const playerAnimationMixer = playerAnimationMixerRef();
  const allowPlayerMovement = wasInitialAnimationPlayed();

  if (!playerModel?.scene) return;

  const playerSpeed = 5;

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
    groundShaderRef,
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
