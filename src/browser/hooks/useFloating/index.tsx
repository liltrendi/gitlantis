import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export const useFloating = ({
	boatRef,
}: {
	boatRef: TBoatRef
}) => {
	// TODO: this hook affects the user's rotation left or right
	// at some degree, the user can't rotate at all

	const floatingState = useRef({
		time: 0,
		baseY: -5,
		waveHeight: 0.4,
		waveSpeed: 0.7,
		roughness: 0.1,
	});

	useFrame((_, delta) => {
		if (!boatRef?.current) return;

		const boat = boatRef.current;

		floatingState.current.time += delta * floatingState.current.waveSpeed;
		const time = floatingState.current.time;
		const config = floatingState.current;

		// get boat's world position for position-based waves
		const boatPos = boat.position;

		// create position-based wave simulation
		const positionWave =
			Math.sin(boatPos.x * 0.1 + time) * Math.cos(boatPos.z * 0.1 + time);

		// multiple wave layers for realism
		const primaryWave = Math.sin(time * 0.6) * config.waveHeight;
		const secondaryWave =
			Math.sin(time * 1.3 + Math.PI / 3) * (config.waveHeight * 0.4);
		const chop = Math.sin(time * 2.8) * (config.waveHeight * config.roughness);

		// combine all wave effects
		const totalFloat = primaryWave + secondaryWave + chop + positionWave * 0.2;

		// apply floating motion
		boat.position.y = config.baseY + totalFloat;

		// realistic boat tilting based on wave motion
		const tiltStrength = 0.03;
		boat.rotation.x = Math.sin(time * 0.9 + Math.PI / 4) * tiltStrength;
		boat.rotation.z = Math.cos(time * 0.7) * tiltStrength * 0.8;
	});
};
