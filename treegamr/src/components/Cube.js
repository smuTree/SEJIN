import { useBox } from "@react-three/cannon";
import * as textures from "../images/textures";

export const Cube = ({ position, texture, scale=[0.6, 0.6, 0.6], name }) => {
    const [ref] = useBox(() => ({
        type: "Static",
        position,
    }));

    const activeTexture = textures[texture + "Texture"];

    return (
        <mesh ref={ref} scale={scale} name={name}>
            <boxGeometry attach="geometry" />
            <meshStandardMaterial map={activeTexture} attach="material" />
        </mesh>
    );
};
