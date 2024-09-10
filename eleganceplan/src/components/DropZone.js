import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop, children }) => {
  const [, drop] = useDrop(() => ({
    accept: 'FURNITURE',
    drop: (item, monitor) => {
      if (onDrop) {
        const offset = monitor.getClientOffset();
        onDrop(item, offset);
      }
    },
  }));

  return (
    <div
      ref={drop}
      style={{
        width: '100%',
        height: '500px',
        position: 'relative',
        border: '1px solid black',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
};

export default DropZone;
