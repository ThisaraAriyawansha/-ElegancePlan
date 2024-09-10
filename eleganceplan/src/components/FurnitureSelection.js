import React from 'react';
import { useDrag } from 'react-dnd';

const FurnitureType = 'FURNITURE';

const FurnitureItem = ({ id, type, name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: FurnitureType,
    item: { id, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: '8px',
        margin: '4px',
        backgroundColor: isDragging ? 'lightgreen' : 'lightblue',
        border: '1px solid black',
        cursor: 'move',
      }}
    >
      {name}
    </div>
  );
};

const FurnitureSelection = ({ furnitureItems }) => {
  return (
    <div>
      <h2>Select Furniture</h2>
      {furnitureItems.map((item) => (
        <FurnitureItem
          key={item.id}
          id={item.id}
          type={item.type}
          name={item.name}
        />
      ))}
    </div>
  );
};

export default FurnitureSelection;
