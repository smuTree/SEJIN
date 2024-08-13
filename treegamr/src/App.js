import './App.css';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import React from 'react';
import { Ground } from './components/Ground';
import { Physics } from '@react-three/cannon';
import { Player } from './components/Player';
import { FPV } from './components/FPV';
import { Cubes } from './components/Cubes';
import { Building } from './components/Building';
import { Crystals } from './components/Crystals';
import { GameProvider, useGameContext } from './components/GameContext';
import { NightSky } from './components/NightSky';
import { PointLight } from 'three';

function App() {
  return (
    <GameProvider>
      <Canvas shadows>
        <NightSky />
        <pointLight 
                position={[5, 2, 0.2]}
                intensity={20}
                distance={10}
            />
        <FPV />
        <Physics>
          <Player />
          <Cubes />
          <Ground />
          <Crystals />
          <Building />
        </Physics>
      </Canvas>
      <div className='centered cursor'>+</div>
      <GameText />
    </GameProvider>
  );
}

const GameText = () => {
  const { cubesRemoved, crystalMelted, weaponMade } = useGameContext();

  return (
    <div className='overlay-text'>
      {'💎 Crystal Cube ---- ' + cubesRemoved}<br/>
      {'🫧 Melted Crystal -- ' + crystalMelted}<br/>
      {'🗡️ Weapon -------- ' + weaponMade}
    </div>
  );
};

export default App;
