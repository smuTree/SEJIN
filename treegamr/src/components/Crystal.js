import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useBox } from '@react-three/cannon';

export function Crystal({ position = [-7, 1.3, 0.3], rotation = [0, Math.PI / 2, 0], scale = [0.5, 0.5, 0.5] }) {
    const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/crystal.glb');
  
    const [ref] = useBox(() => ({
        args: [1, 1, 1],
        position: position,
        rotation: rotation,
        mass: 0
    }));

    return (
        <mesh ref={ref} scale={scale} position={position} rotation={rotation}>
            <primitive object={gltf.scene} />
        </mesh>
    );
}
