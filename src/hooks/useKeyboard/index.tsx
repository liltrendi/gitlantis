import { type IUseKeyboardProps } from '@/hooks/useKeyboard/types';
import { useCallback, useEffect } from 'react';

export const useKeyboard = ({
	up,
	down,
	left,
	right,
}: IUseKeyboardProps): void => {
	const handleEvent = useCallback(
		(e: KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowUp':
				case 'w':
					up();
					break;
				case 'ArrowDown':
				case 's':
					down();
					break;
				case 'ArrowLeft':
				case 'a':
					left();
					break;
				case 'ArrowRight':
				case 'd':
					right();
					break;
				default:
					break;
			}
		},
		[up, down, left, right]
	);

	useEffect(() => {
		document.addEventListener('keydown', handleEvent);
		return () => {
			document.removeEventListener('keydown', handleEvent);
		};
	}, []);
};
