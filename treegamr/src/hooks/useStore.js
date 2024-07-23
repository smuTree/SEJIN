import { nanoid } from "nanoid";
import { create } from "zustand";

export const useStore = create((set) => ({
    texture: "dirt",
    cubes: [],
    crystals: [],
    addCube: (x, y, z) => {
        set((prev) => ({
            cubes: [
                ...prev.cubes,
                {
                    key: nanoid(),
                    pos: [x, y, z],
                    texture: prev.texture,
                },
            ],
        }));
    },
    addCrystal: (x, y, z) => {
        set((prev) => ({
            crystals: [
                ...prev.crystals,
                {
                    key: nanoid(),
                    pos: [x, y, z],
                },
            ],
        }));
    },
    removeCube: () => {},
    setTexture: () => {},
    saveWorld: () => {},
    resetWorld: () => {},
}));
