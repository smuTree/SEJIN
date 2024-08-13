import { useBox } from "@react-three/cannon";
import { Color, PointLight } from "three";
import { useRef } from 'react';

export const Cube = ({ position, scale = [0.4, 0.4, 0.4], name }) => {
    const [ref] = useBox(() => ({
        type: "Static",
        position,
    }));

    // PointLight를 위한 ref
    const lightRef = useRef();

    return (
            <mesh ref={ref} scale={scale} name={name}>
                <boxGeometry attach="geometry" />
                <meshStandardMaterial
                    color={new Color(0x800080)} // 보라색
                    emissive={new Color(0x800080)} // 보라색으로 발광
                    emissiveIntensity={1} // 발광 강도
                    metalness={20} // 메탈릭 효과
                    roughness={0.3} // 표면 거칠기
                />
                
            </mesh>

    );
};
