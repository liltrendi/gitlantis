import { useGLTF } from '@react-three/drei';
import { useAdvancedNavigation } from '@/hooks/useBoat/useNavigation';
import { BOAT_MODEL_PATH } from '@/config';

export const useBoat = (
	boatRef: TBoatRef
) => {
	const boatModel = useGLTF(BOAT_MODEL_PATH);

	useAdvancedNavigation({ boatRef });

	return { boatModel };
};
