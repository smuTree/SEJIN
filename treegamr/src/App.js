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

function App() {
  const [crystalNum] = useState("0");
  const [coinNum] = useState("0");
  return (
    <>
    <GameProvider>
      <Canvas shadows>
        <Sky 
          sunPosition={[0, -10, 0]} 
          distance={10000} // 태양의 거리 조정
          inclination={0.5} // 하늘의 경사
          azimuth={0.25} // 하늘의 방위
        />
        <ambientLight intensity={0.2} />
        
        {/* Directional Light */}
        <directionalLight 
          position={[0, 100, 5]} 
          intensity={2.5} 
          castShadow 
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
    </>
  );
}

const GameText = () => {
  const {cubesRemoved, crystalMelted, weaponMade}= useGameContext();

  return (
    <div className='overlay-text'>
      {'Crystal Cube Mine: '+ cubesRemoved}<br />
      {'Crystals Melted: ' + crystalMelted}<br />
      {'Weapons Made: ' + weaponMade}
    </div>
  );
};

export default App;
