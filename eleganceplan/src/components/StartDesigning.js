import React, { useState } from 'react';
import './StartDesigning.css'; // Add your CSS file for styling

// Sample furniture items
const furnitureItems = [
  { id: 1, name: 'Sofa', img: '/images/sofa.png' },
  { id: 2, name: 'Table', img: '/images/table.png' },
  { id: 3, name: 'Bed', img: '/images/bed.png' },
  { id: 4, name: 'Chair', img: '/images/chair.png' },
];

const StartDesigning = () => {
  const [droppedItems, setDroppedItems] = useState([]); // State to store dropped items

  // Handle drag start
  const handleDragStart = (event, furniture) => {
    event.dataTransfer.setData('furniture', JSON.stringify(furniture)); // Pass item details
  };

  // Handle drop on canvas
  const handleDrop = (event) => {
    event.preventDefault();
    const furniture = JSON.parse(event.dataTransfer.getData('furniture')); // Get dropped item data
    const x = event.clientX - event.target.offsetLeft;
    const y = event.clientY - event.target.offsetTop;
    setDroppedItems((prevItems) => [
      ...prevItems,
      { ...furniture, x, y }, // Save dropped item's position
    ]);
  };

  // Allow dropping on canvas
  const allowDrop = (event) => {
    event.preventDefault();
  };

  return (
    <div className="design-page">
      {/* Furniture items to drag */}
      <div className="furniture-panel">
        <h2>Select Furniture</h2>
        <div className="furniture-list">
          {furnitureItems.map((item) => (
            <div
              key={item.id}
              className="furniture-item"
              draggable
              onDragStart={(event) => handleDragStart(event, item)}
            >
              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Design canvas */}
      <div
        className="design-canvas"
        onDrop={handleDrop}
        onDragOver={allowDrop}
      >
        <h2>Design Your Home</h2>
        <div className="canvas-area">
          {droppedItems.map((item, index) => (
            <img
              key={index}
              src={item.img}
              alt={item.name}
              className="dropped-item"
              style={{ top: `${item.y}px`, left: `${item.x}px`, position: 'absolute' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartDesigning;
