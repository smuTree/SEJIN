import './App.css';
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

function App() {
  return (
    <>
      <Canvas shadows>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        
        {/* Directional Light */}
        <directionalLight 
          position={[0, 100, 5]} 
          intensity={2} 
          castShadow 
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
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
    </>
  );
}

export default App;
