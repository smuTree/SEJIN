import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useBox } from '@react-three/cannon';

export function Building() {
  const gameSpace = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/building.glb');
  //
  const [ref] = useBox(() => ({
    args: [1, 1, 1],
    mass: 0 
  }));

  return (
    <mesh ref={ref}>
      <primitive object={gameSpace.scene} scale={[1, 1, 1]} />
    </mesh>
  );
}

export default Building;
