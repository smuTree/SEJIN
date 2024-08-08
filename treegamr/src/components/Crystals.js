import { useStore } from "../hooks/useStore";
import { Crystal } from "./Crystal";

export const Crystals = () => {
    const [crystals] = useStore((state) => [state.crystals]);
    return crystals.map(({key, pos}) => {
        return <Crystal key={key} position={pos} />;
    });
};