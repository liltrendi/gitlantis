import { useRef } from 'react';
import { type Group, Vector3 } from 'three';

export const BOAT_MODEL_PATH = `/models/boat/scene-transformed.glb`;
export const WATER_TEXTURE_PATH = '/models/ocean/waternormals.jpeg';

export const getGameConfig = () => {
	const boatRef = useRef<Group>(null);
	const sunDirection = new Vector3(-1, 1, 1).normalize();

	return { sunDirection, boatRef };
};
