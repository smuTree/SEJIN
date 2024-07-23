import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useBox } from '@react-three/cannon';

export function Crystal({ position, scale = [0.5, 0.5, 0.5] }) {
  const gameSpace = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/crystal.glb');
  
  const [ref] = useBox(() => ({
    args: [1, 1, 1],
    position: position,
    mass: 0
  }));

  return (
    <mesh ref={ref}>
      <primitive object={gameSpace.scene} scale={scale} />
    </mesh>
  );
}

