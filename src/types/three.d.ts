import type { Water } from 'three-stdlib';
import type { Object3DNode } from '@react-three/fiber';

declare module '@react-three/fiber' {
    interface ThreeElements {
        water: Object3DNode<Water, typeof Water>;
    }
}