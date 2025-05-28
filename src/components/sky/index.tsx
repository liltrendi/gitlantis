import { Sky as ThreeSky } from '@react-three/drei';

export const Sky = () => {
	return (
		<ThreeSky
			rayleigh={5}
			turbidity={0.1}
			mieDirectionalG={0.8}
			mieCoefficient={0.005}
			sunPosition={[500, 200, -500]}
		/>
	);
};
