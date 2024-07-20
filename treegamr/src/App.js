import './App.css';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { Suspense, useEffect, useState, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Sky } from '@react-three/drei';
import * as THREE from 'three';
import React from 'react';
import { Ground } from './components/Ground';
import { Physics } from '@react-three/cannon';
import { Player } from './components/Player';

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

function Player_astro() {
  const player = useLoader(FBXLoader, process.env.PUBLIC_URL + '/models/astro.fbx');
  const walkingAnimation = useLoader(FBXLoader, process.env.PUBLIC_URL + '/models/Walking.fbx');

  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0.5, z: 0 });
  player.rotation.y = Math.PI;

  const handleKeyDown = (e) => {
    const keyCode = e.keyCode;
    const moveAmount = 0.5; // 이동량

    // 키에 따라 위치 조정 및 회전
    if (keyCode === 65) { // 'A' key (LEFT)
      setPlayerPosition(prevPosition => ({ ...prevPosition, x: prevPosition.x + moveAmount }));
    } else if (keyCode === 68) { // 'D' key (RIGHT)
      setPlayerPosition(prevPosition => ({ ...prevPosition, x: prevPosition.x - moveAmount }));
    } else if (keyCode === 83) { // 'S' key (DOWN)
      setPlayerPosition(prevPosition => ({ ...prevPosition, z: prevPosition.z - moveAmount }));
    } else if (keyCode === 87) { // 'W' key (UP)
      setPlayerPosition(prevPosition => ({ ...prevPosition, z: prevPosition.z + moveAmount }));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  return (
    <primitive 
      object={player} 
      position={[playerPosition.x, playerPosition.y, playerPosition.z]} 
    />
  );
}

function App() {
  return (
    <div className="App">
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5}/>
        <Physics>
          <Player />
          <Ground />
        </Physics>  
      </Canvas>
    </div>
  );
}

export default App;
