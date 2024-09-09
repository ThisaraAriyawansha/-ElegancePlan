import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';

const StartDesigning3D = () => {
  const mountRef = useRef(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

  useEffect(() => {
    // Set up the Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Create AR button
    document.body.appendChild(ARButton.createButton(renderer));

    // Add lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 10);
    scene.add(light);

    // Load 3D furniture model
    const loader = new GLTFLoader();
    loader.load('/models/sofa.gltf', (gltf) => {
      const sofa = gltf.scene;
      sofa.scale.set(1, 1, 1);
      sofa.position.set(0, 0, 0);
      scene.add(sofa);
    });

    // Drag and drop functionality
    const onMouseMove = (event) => {
      if (selectedObject) {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera({ x, y }, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
          selectedObject.position.copy(intersects[0].point);
        }
      }
    };

    const onMouseDown = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        setSelectedObject(intersects[0].object);
      }
    };

    const onMouseUp = () => {
      setSelectedObject(null);
    };

    // Add event listeners for dragging
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation loop
    const animate = () => {
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    };

    animate();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [selectedObject]);

  return <div ref={mountRef} />;
};

export default StartDesigning3D;
