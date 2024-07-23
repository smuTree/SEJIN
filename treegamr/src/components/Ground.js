import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../images/textures";
import { useStore } from "../hooks/useStore";

export const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], 
    position: [0, -0.5, 0],
  }));

  // Extract both addCube and addCrystal
  const [addCube, addCrystal] = useStore((state) => [state.addCube, state.addCrystal]);

  groundTexture.repeat.set(100, 100);

  return (
    <mesh 
      onClick={(e) => {
        e.stopPropagation();
        const [x, y, z] = Object.values(e.point).map((val) => Math.ceil(val)); // Round the values
        
        // Use Alt key to decide whether to add a crystal or cube
        if (e.altKey) {
          addCrystal(x, y, z);
        } else {
          addCube(x, y, z);
        }
      }}
      ref={ref}
    >
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};
