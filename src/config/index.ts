import { useRef } from 'react';
import { type Group, Object3D, Vector3 } from 'three';

export const WATER_TEXTURE_PATH = '/models/ocean/waternormals.jpeg';
export const BOAT_MODEL_PATH = `/models/boat/scene-transformed.glb`;
export const CABINET_FILE_PATH = `/models/cabinet/cabinet.glb`;

export const getGameConfig = () => {
	const boatRef = useRef<Group>(null);
	const cabinetsRef = useRef<Array<Object3D | null>>([]);

	return { boatRef, cabinetsRef };
};
