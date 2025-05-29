import { useRef, useEffect} from 'react';
import { useFrame } from '@react-three/fiber';

const useKeyboardState = () => {
	const keys = useRef({
		forward: false,
		backward: false,
		left: false,
		right: false,
	});

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key.toLowerCase()) {
				case 'arrowup':
				case 'w':
					keys.current.forward = true;
					break;
				case 'arrowdown':
				case 's':
					keys.current.backward = true;
					break;
				case 'arrowleft':
				case 'a':
					keys.current.left = true;
					break;
				case 'arrowright':
				case 'd':
					keys.current.right = true;
					break;
			}
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			switch (e.key.toLowerCase()) {
				case 'arrowup':
				case 'w':
					keys.current.forward = false;
					break;
				case 'arrowdown':
				case 's':
					keys.current.backward = false;
					break;
				case 'arrowleft':
				case 'a':
					keys.current.left = false;
					break;
				case 'arrowright':
				case 'd':
					keys.current.right = false;
					break;
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	return keys.current;
};

export const useAdvancedNavigation = ({
	boatRef,
}: {
	boatRef: TBoatRef
}) => {
	const keys = useKeyboardState();

	const config = {
		maxSpeed: 1.5,
		momentum: 0.98,
		acceleration: 0.02,
		deceleration: 0.01,
		turnSpeed: 0.01,
		turnWhileMoving: 0.8,
		turnDeceleration: 0.05,
	};

	const state = useRef({
		velocity: { x: 0, z: 0 },
		angularVelocity: 0,
		speed: 0,
	});

	useFrame((_, delta) => {
		const boat = boatRef.current;
		if (!boat) return;

		const deltaMultiplier = Math.min(delta * 60, 2);
		const currentState = state.current;

		// handle forward/backward input
		let targetSpeed = 0;
		if (keys.forward) targetSpeed = config.maxSpeed;
		if (keys.backward) targetSpeed = -config.maxSpeed * 0.5;

		// accelerate or decelerate towards target speed
		if (targetSpeed !== 0) {
			currentState.speed +=
				(targetSpeed - currentState.speed) * config.acceleration;
		} else {
			currentState.speed *= 1 - config.deceleration;
		}

		// handle turning
		let targetTurn = 0;
		const isMovingBackward = currentState.speed < 0;

		if (keys.left) {
			targetTurn = isMovingBackward ? -config.turnSpeed : config.turnSpeed;
		}
		if (keys.right) {
			targetTurn = isMovingBackward ? config.turnSpeed : -config.turnSpeed;
		}

		// turn faster when moving forward (like real boats)
		const speedFactor = Math.abs(currentState.speed) / config.maxSpeed;
		targetTurn *= 1 + speedFactor * config.turnWhileMoving;

		// apply turning
		if (targetTurn !== 0) {
			currentState.angularVelocity +=
				(targetTurn - currentState.angularVelocity) * 0.1;
		} else {
			currentState.angularVelocity *= 1 - config.turnDeceleration;
		}

		// apply rotation
		if (Math.abs(currentState.angularVelocity) > 0.001) {
			boat.rotateY(currentState.angularVelocity * deltaMultiplier);
		}

		// apply forward movement in the boat's current direction
		if (Math.abs(currentState.speed) > 0.001) {
			boat.translateX(currentState.speed * deltaMultiplier);
		}

		// clean up tiny values
		if (Math.abs(currentState.speed) < 0.001) currentState.speed = 0;
		if (Math.abs(currentState.angularVelocity) < 0.001)
			currentState.angularVelocity = 0;
	});

	return {
		speed: state.current.speed,
		angularVelocity: state.current.angularVelocity,
		isBoatMoving:
			Math.abs(state.current.speed) > 0.001 ||
			Math.abs(state.current.angularVelocity) > 0.001,
	};
};
