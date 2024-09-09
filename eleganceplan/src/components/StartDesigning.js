import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const StartDesigning3D = () => {
  const mountRef = useRef(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

  useEffect(() => {
    if (!mountRef.current) return;

    // Set up the Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 10);
    scene.add(light);

    // Function to create a furniture item
    const createFurnitureItem = (color, position, scale) => {
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshStandardMaterial({ color });
      const item = new THREE.Mesh(geometry, material);
      item.position.copy(position);
      item.scale.copy(scale);
      scene.add(item);
      return item;
    };

    // Create furniture items
    const sofa = createFurnitureItem(0x8b4513, new THREE.Vector3(-3, 0.5, 0), new THREE.Vector3(3, 1, 1)); // Brown sofa
    const table = createFurnitureItem(0xdeb887, new THREE.Vector3(0, 0.5, 0), new THREE.Vector3(2, 0.5, 2)); // Light brown table
    const chair = createFurnitureItem(0xd3d3d3, new THREE.Vector3(3, 0.5, 0), new THREE.Vector3(1, 1.5, 1)); // Light gray chair

    // Handle mouse interactions
    const onMouseDown = (event) => {
      setIsDragging(true);
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        setSelectedObject(intersects[0].object);
      }
    };

    const onMouseMove = (event) => {
      if (selectedObject && isDragging) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
          selectedObject.position.copy(intersects[0].point);
        }
      }
    };

    const onMouseUp = () => {
      setIsDragging(false);
      setSelectedObject(null);
    };

    const onKeyPress = (event) => {
      if (selectedObject) {
        switch (event.key) {
          case 'r': // Rotate object
            selectedObject.rotation.y += 0.1;
            break;
          case '+': // Scale up
            selectedObject.scale.multiplyScalar(1.1);
            break;
          case '-': // Scale down
            selectedObject.scale.multiplyScalar(0.9);
            break;
          default:
            break;
        }
      }
    };

    // Handle touch interactions
    const onTouchStart = (event) => {
      setIsDragging(true);
      if (event.touches.length === 1) {
        const x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        const y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera({ x, y }, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
          setSelectedObject(intersects[0].object);
        }
      }
    };

    const onTouchMove = (event) => {
      if (selectedObject && isDragging && event.touches.length === 1) {
        const x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        const y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera({ x, y }, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
          selectedObject.position.copy(intersects[0].point);
        }
      }
    };

    const onTouchEnd = () => {
      setIsDragging(false);
      setSelectedObject(null);
    };

    // Add event listeners
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('keypress', onKeyPress);
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

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
      window.removeEventListener('keypress', onKeyPress);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [selectedObject, isDragging]);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default StartDesigning3D;
