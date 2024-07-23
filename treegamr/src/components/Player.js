import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";
import { Vector2 } from "three";
import { Raycaster } from "three";
const JUMP_FORCE = 5;
const SPEED = 7;

// merge study
export const Player = () => {
    const {moveBackward, moveForward, moveLeft, moveRight, jump} = useKeyboard();
    const {scene, camera} = useThree();
    const mouse = useRef(new Vector2());
    const raycaster = useRef(new Raycaster());
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 2, 0],
    }));

    const vel = useRef([0, 0, 0]);
    useEffect(() => {
        api.velocity.subscribe((v) => (vel.current = v));
    }, [api.velocity]);

    const pos = useRef([0, 0, 0]);
    useEffect(() => {
        api.position.subscribe((p) => (pos.current = p));
    }, [api.position]);

    useEffect(() => {
        const handleClick = (event) => {
          mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
          raycaster.current.setFromCamera(mouse.current, camera);
          const intersects = raycaster.current.intersectObjects(scene.children, true);
    
          if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            console.log('Clicked object:', clickedObject.name || clickedObject);
          }
        };
    
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
      }, [scene, camera]);

    useFrame(()=>{
        camera.position.copy(
            new Vector3(pos.current[0], pos.current[1] + 2, pos.current[2])
        );
        

        const direction = new Vector3();
        const frontVector = new Vector3(
            0,
            0,
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
        );

        const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
            0,
            0
        );

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);
        
        api.velocity.set(direction.x, vel.current[1], direction.z);

        if(jump && Math.abs(vel.current[1]) < 0.05){
            api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
        }
    });
    return <mesh ref={ref}></mesh>;
};