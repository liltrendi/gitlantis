export const Lights = () => {
	return (
		<>
			{/* @ts-expect-error */}
			<ambientLight intensity={0.8} />
			{/* @ts-expect-error */}
			<ambientLight intensity={1.5} distance={15} decay={2} color="#fceec1" />
			{/* @ts-expect-error */}
			<directionalLight
				position={[-100, 100, 100]}
				intensity={1.0}
				color={0xffffff}
			/>
		</>
	);
};
