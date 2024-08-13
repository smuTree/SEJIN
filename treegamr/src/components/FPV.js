import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export const FPV = () => {
    const { camera, gl } = useThree();
    const controlsRef = useRef();
    return (
        <PointerLockControls ref={controlsRef} args={[camera, gl.domElement]} />
    );
};
