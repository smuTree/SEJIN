import './App.css';
import { Canvas, useLoader} from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { Sky } from '@react-three/drei';
import * as THREE from 'three';
import React from 'react';
import { Ground } from './components/Ground';
import { Physics } from '@react-three/cannon';
import { Player } from './components/Player';
import { FPV } from './components/FPV';
import { Cubes } from './components/Cubes';

// 모델 가져오기
function Model() {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0, 1)
  const gameSpace = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/ingame.glb');
  return <primitive object={gameSpace.scene} scale={[1, 1, 1]} />;
}

function App() {
  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5}/>
        <FPV />
        <Physics>
          <Player />
          <Ground />
          <Cubes />
        </Physics>  
      </Canvas>
      <div className='centered cursor'>+</div>
    </>
  );
}

export default App;
