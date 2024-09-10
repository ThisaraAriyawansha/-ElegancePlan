import React, { useEffect, useRef } from 'react';
import 'aframe';
import 'ar.js/aframe/build/aframe-ar.js';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const StartDesign = () => {
  const arSceneRef = useRef(null);

  useEffect(() => {
    // Initialization or setup logic if needed
  }, []);

  return (
    <div>
      <h1>Start Designing Your Space</h1>
      <div>
        <p>Use the AR view to place furniture in your room and visualize your design.</p>
        <a-scene embedded arjs='trackingMethod: best;'>
          <a-marker preset='hiro'>
            <a-box position='0 0.5 0' rotation='0 45 0' color='blue'>
              <a-text value='Furniture' align='center' position='0 1 0'></a-text>
            </a-box>
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      </div>

      {/* Three.js Viewer for Desktop or Non-AR */}
      <div style={{ height: '400px' }}>
        <Canvas>
          <ambientLight />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <OrbitControls />
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color='orange' />
          </mesh>
        </Canvas>
      </div>
    </div>
  );
};

export default StartDesign;
