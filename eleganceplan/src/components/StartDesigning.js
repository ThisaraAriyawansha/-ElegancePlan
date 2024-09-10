import React, { useState } from 'react';
import DraggableFurniture from './DraggableFurniture';
import DropZone from './DropZone';

const StartDesigning = () => {
  const [furniture, setFurniture] = useState([
    { id: 1, type: 'Sofa', left: 100, top: 100 },
    { id: 2, type: 'Table', left: 200, top: 200 },
  ]);

  const handleDrop = (item, offset) => {
    setFurniture((prevFurniture) =>
      prevFurniture.map((f) =>
        f.id === item.id
          ? { ...f, left: offset.x, top: offset.y }
          : f
      )
    );
  };

  return (
    <div>
      <h1>Start Designing Your Space</h1>
      <DropZone onDrop={handleDrop}>
        {furniture.map((f) => (
          <DraggableFurniture
            key={f.id}
            id={f.id}
            type={f.type}
            left={f.left}
            top={f.top}
          >
            <div style={{ padding: '10px', backgroundColor: 'lightblue', border: '1px solid blue' }}>
              {f.type}
            </div>
          </DraggableFurniture>
        ))}
      </DropZone>
    </div>
  );
};

export default StartDesigning;
