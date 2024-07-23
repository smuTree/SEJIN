import './App.css';
import { Canvas} from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
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
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={2}/>
        <FPV />
        <Physics>
          <Player />
          <Cubes/>
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
