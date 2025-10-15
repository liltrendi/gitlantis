export const TerrestialWorld = ({ visible }: { visible: boolean }) => {
  return (
    <>
      {/* @ts-expect-error group isn't a valid React element */}
      <group visible={visible}>
        {/* @ts-expect-error group isn't a valid React element */}
      </group>
    </>
  );
};
