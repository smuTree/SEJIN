import React, {createContext, useContext, useState} from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [cubesRemoved, setCubesRemoved] = useState(0);
    const [crystalMelted, setCrystalMelted] = useState(0);
    const [weaponMade, setWeaponMade] = useState(0);

    return (
        <GameContext.Provider value={{ 
            cubesRemoved, 
            setCubesRemoved, 
            crystalMelted, 
            setCrystalMelted,
            weaponMade,
            setWeaponMade
        }}>
            {children}
        </GameContext.Provider>
        
    )
}

export const useGameContext = () => useContext(GameContext);