import { useEffect, useRef, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";
import { FBXLoader } from "three/examples/jsm/Addons.js";
import { Vector2 } from "three";
import { Raycaster } from "three";
import { useStore } from "../hooks/useStore";

const JUMP_FORCE = 5;
const SPEED = 7;

export const Player = () => {
    const astro = useLoader(FBXLoader, process.env.PUBLIC_URL + '/models/astro.fbx');
    const {moveBackward, moveForward, moveLeft, moveRight, jump} = useKeyboard();
    const {camera, scene} = useThree();

    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 2, 0],
        rotation: [0, -Math.PI / 2, -Math.PI / 2],
    }));

    const vel = useRef([0, 0, 0]);
    useEffect(() => {
        api.velocity.subscribe((v) => (vel.current = v));
    }, [api.velocity]);

    const pos = useRef([0, 0, 0]);
    useEffect(() => {
        api.position.subscribe((p) => (pos.current = p));
    }, [api.position]);

    useFrame(() => {
        // Update camera position
        camera.position.copy(new Vector3(pos.current[0], pos.current[1] + 3, pos.current[2]));
        
        // Update player movement
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
        
        if (jump && Math.abs(vel.current[1]) < 0.05) {
            api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
        }

        // Update astro model position and rotation
        if (astro.scene) {
            astro.scene.position.set(pos.current[0], pos.current[1], pos.current[2]);
            astro.scene.rotation.set(0, camera.rotation.y, 0);
        }
    });

    const mouse = useRef(new Vector2());
    const raycaster = useRef(new Raycaster());
    const [addCube, meltCrystal, removeCube] = useStore((state) => [state.addCube, state.meltCrystal, state.removeCube]);

    useEffect(() => {
        const handleClick = (event) => {
          event.stopPropagation();
          mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
          raycaster.current.setFromCamera(mouse.current, camera);
          const intersects = raycaster.current.intersectObjects(scene.children, true);
          if (event.shiftKey) {
            console.log("Removed");
            const { x, y, z } = intersects[0].point;
            removeCube(Math.ceil(x), Math.ceil(y), Math.ceil(z));
            return;
          // 이후부터는 이벤트가 발생한 면 Number에 따라서 각 위치에 맞춰 addCube를 발생시킨다.
          }
          if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            console.log('Clicked object:', clickedObject.name || clickedObject);
            if(clickedObject.name === "furnace001" || clickedObject.name === "furnace" || clickedObject.name === "furnace1" ){
                console.log("Clicked furnace");
                meltCrystal();
            }
            else if(clickedObject.name === "SP_Ground02_Mat_0"){
                console.log("Clicked Ground");
                const { x, y, z } = intersects[0].point;
                addCube(Math.ceil(x), Math.ceil(y), Math.ceil(z));
            }
            else if(clickedObject.name === "crystal17_2_crystal_17_2_0"){
                console.log("Clicked Crystal");
                //ineCrystal();

            }
          }
        };
    
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
      }, [scene, camera]);

    return (
        <>
            <mesh ref={ref}>
                {/* Player's physical body (optional) */}
            </mesh>
            {astro.scene && (
                <primitive object={astro.scene} scale={[1, 1, 1]} />
            )}
            <MyCube />
        </>
    );
};

// Cube component
const MyCube = () => {
    const ref = useRef();
    
    useFrame(({ camera }) => {
        if (ref.current) {
            ref.current.position.set(camera.position.x, 1, camera.position.z + 3);
        }
    });
    
    return (
        <mesh ref={ref} scale={[0.5, 1, 0.5]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="hotpink" />
        </mesh>
    );
};
