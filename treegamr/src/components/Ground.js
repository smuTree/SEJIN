import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../images/textures";
import { useStore } from "../hooks/useStore";
import { random } from "nanoid";
import { useEffect } from "react";

export const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], 
    position: [0, -0.5, 0],
  }));

  // Extract both addCube and addCrystal
  const [addCube, addCrystal] = useStore((state) => [state.addCube, state.addCrystal]);

  groundTexture.repeat.set(100, 100);

  const randomRange = (min, max) => (Math.random() * (max - min + 1)) + min;

  useEffect(() => {
    for(let i = 0; i < 20; i++){
      const x = randomRange(2, 8);
      const z = randomRange(-4, 3);
      const y = 0.3;
      
      addCube(x, y, z);
    }
  }, [addCube]);

  return (
    <mesh 

      ref={ref}
    >
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};
