import {
  AnimationMixer,
  DirectionalLight,
  AmbientLight,
  Scene,
  LoopRepeat,
  LoopOnce,
} from "three";
import { GLTFLoader, type GLTF } from "three-stdlib";
import { PLAYER_ANIMATIONS } from "@/browser/components/world/terrestial/player/utils";
import { CLOUDFRONT_ROOT_URL, globalUris } from "@/browser/config";

export const addPlayerToWorld = ({
  grassScene,
  gltfModelLoader,
  isBrowserEnvironment,
}: {
  grassScene: Scene;
  gltfModelLoader: GLTFLoader;
  isBrowserEnvironment: boolean;
}) => {
  const playerAmbientLight = new AmbientLight(0xffffff, 0.5);
  const playerDirectionalLight = new DirectionalLight(0xffffff, 2);

  let playerModel: GLTF | null = null;
  let playerAnimationMixer: AnimationMixer;
  let initialAnimationPlayed = false;

  gltfModelLoader.load(
    `${isBrowserEnvironment ? CLOUDFRONT_ROOT_URL : ""}${globalUris.player}`,
    (loadedModel: GLTF) => {
      playerModel = loadedModel;

      playerModel.scene.scale.setScalar(35);
      playerModel.scene.position.set(-20, -1.75, 18);
      grassScene.add(
        playerAmbientLight,
        playerDirectionalLight,
        playerModel.scene
      );

      playerAnimationMixer = new AnimationMixer(playerModel.scene);

      const initialAnimation = playerAnimationMixer.clipAction(
        playerModel.animations.find(
          (a) => a.name === PLAYER_ANIMATIONS.initial
        )!
      );
      initialAnimation.setLoop(LoopOnce, 1);
      initialAnimation.clampWhenFinished = true;
      initialAnimation.timeScale = 0.9;
      initialAnimation.play();

      const idleAnimation = playerAnimationMixer.clipAction(
        playerModel.animations.find((a) => a.name === PLAYER_ANIMATIONS.idle)!
      );
      idleAnimation.setLoop(LoopRepeat, Infinity);

      playerAnimationMixer.addEventListener("finished", (e) => {
        if (e.action === initialAnimation) {
          initialAnimationPlayed = true;
          initialAnimation.fadeOut(0.3);
          idleAnimation.reset().fadeIn(0.3).play();
        }
      });
    }
  );

  return {
    playerDirectionalLight,
    playerModelRef: () => playerModel,
    playerAnimationMixerRef: () => playerAnimationMixer,
    wasInitialAnimationPlayed: () => initialAnimationPlayed,
  };
};
