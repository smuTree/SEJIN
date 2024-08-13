import { Canvas, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import React, { useEffect } from "react";
import * as THREE from 'three';


export const NightSky = () => {
    // 배경을 검은색으로 설정
    const { scene } = useThree();
    useEffect(() => {
        scene.background = new THREE.Color(0x000000); // 배경을 검은색으로 설정
    }, [scene]);

    return (
        <>
            {/* 별을 추가하여 밤하늘에 빛나는 효과 */}
            <Stars
                radius={100} // 별이 생성될 반경
                depth={50}   // 별의 깊이
                count={5000} // 별의 개수
                factor={4}   // 별의 크기 조정
                saturation={0} // 별의 채도
                fade={true} // 시야에서 멀어질수록 희미해지는 효과
            />

            {/* 주변 광원 설정 */}
            <ambientLight intensity={0.7} />

            {/* 방향성 광원 설정 */}
            <directionalLight 
                position={[0, 100, 5]} 
                intensity={0.5} 
                castShadow 
            />
        </>
    );
};

