import { nanoid } from "nanoid";
import { create } from "zustand";
import { Crystal } from "../components/Crystal";

export const useStore = create((set) => ({
    texture: "dirt",
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
    // mineCrystal: (x, y, z) => {
    //     set((prev) => ({
    //       crystals: prev.crystals.filter((crystal) => {
    //         const [X, Y, Z] = crystal.pos;
    //         return X !== x || Y !== y || Z !== z;
    //       }),
    //     }));
    //   },
      
    removeCube: (x, y, z) => {
    set((prev) => ({
        cubes: prev.cubes.filter((cube) => {
        const [X, Y, Z] = cube.pos;
        return X !== x || Y !== y || Z !== z;
        }),
      }));
    },
}));
