import type { Object3DNode } from '@react-three/fiber';
import type { RefObject, Group } from 'react';
import type { Water } from 'three-stdlib';

declare module '@react-three/fiber' {
    interface ThreeElements {
        water: Object3DNode<Water, typeof Water>;
    }
}

declare global {
  type TBoatRef = RefObject<Group | null>;
}