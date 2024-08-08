import { nanoid } from "nanoid";
import { create } from "zustand";
import { Crystal } from "../components/Crystal";

export const useStore = create((set) => ({
    texture: "purple",
    cubes: [
    ],
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
    crystals: [],
    meltCrystal: () => {
        set((prev) => ({
            crystals: [
                ...prev.crystals,
                {
                    key: nanoid(),
                },
            ],
        }));
    },   
    removeCube: (x, y, z) => {
    set((prev) => ({
        cubes: prev.cubes.filter((cube) => {
        const [X, Y, Z] = cube.pos;
        return X !== x || Y !== y || Z !== z;
        }),
      }));
    },
}));
