export const Lights = () => {
	return (
		<>
			<ambientLight intensity={0.8} />
			<directionalLight
				position={[-100, 100, 100]}
				intensity={1.0}
				color={0xffffff}
			/>
		</>
	);
};
