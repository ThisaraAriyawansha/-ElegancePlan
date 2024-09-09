import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './StartDesigning.css'; // Create this CSS file for styling

// Furniture Item Component
const FurnitureItem = ({ id, name, type, moveFurniture }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'FURNITURE',
    item: { id, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`furniture-item ${isDragging ? 'dragging' : ''}`}>
      {name}
    </div>
  );
};

// Room Component
const Room = () => {
  const [{ isOver }, drop] = useDrop({
    accept: 'FURNITURE',
    drop: (item) => console.log(`Dropped item: ${item.id}`),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`room ${isOver ? 'highlight' : ''}`}>
      <h2>Design Your Room</h2>
      {/* Furniture items will be dropped here */}
    </div>
  );
};

const StartDesigning = () => {
  const [furnitureItems] = useState([
    { id: 1, name: 'Sofa', type: 'furniture' },
    { id: 2, name: 'Table', type: 'furniture' },
    { id: 3, name: 'Chair', type: 'furniture' },
  ]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="design-container">
        <aside className="furniture-palette">
          <h2>Select Furniture</h2>
          {furnitureItems.map((item) => (
            <FurnitureItem key={item.id} {...item} />
          ))}
        </aside>
        <Room />
      </div>
    </DndProvider>
  );
};

export default StartDesigning;
