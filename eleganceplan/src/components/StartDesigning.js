import React, { useState, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Canvas, Text } from 'fabric'; // Import specific classes
import './StartDesigning.css';

// Initial furniture items
const initialFurnitureItems = [
  { id: '1', name: 'Sofa' },
  { id: '2', name: 'Table' },
  { id: '3', name: 'Chair' },
];

// FurnitureItem Component
const FurnitureItem = ({ item, index }) => (
  <Draggable draggableId={item.id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="furniture-item"
      >
        {item.name}
      </div>
    )}
  </Draggable>
);

// Room Component
const Room = ({ onDrop }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const fabricCanvas = new Canvas(canvasRef.current, {
      backgroundColor: 'lightgrey',
    });
    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose(); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="room">
      <canvas ref={canvasRef} width="800" height="600" />
    </div>
  );
};

const StartDesigning = () => {
  const [furnitureItems, setFurnitureItems] = useState(initialFurnitureItems);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDrop = (pointer) => {
    if (draggedItem) {
      const fabricCanvas = document.querySelector('canvas');
      if (fabricCanvas) {
        const canvas = new Canvas(fabricCanvas);
        const newItem = new Text(draggedItem.name, {
          left: pointer.x,
          top: pointer.y,
          draggable: true,
        });

        canvas.add(newItem);
        canvas.renderAll();
      }
    }
  };

  const onDragStart = (start) => {
    const item = furnitureItems.find(f => f.id === start.draggableId);
    if (item) {
      setDraggedItem(item);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    // Use the canvas dimensions for dropping
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const fabricCanvas = new Canvas(canvas);
      const pointer = fabricCanvas.getPointer({ x: result.destination.droppableId, y: result.destination.droppableId });
      handleDrop(pointer);
    }
  };

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="design-container">
        <Droppable droppableId="furniture" direction="vertical">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="furniture-palette"
            >
              <h2>Select Furniture</h2>
              {furnitureItems.map((item, index) => (
                <FurnitureItem key={item.id} item={item} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Room />
      </div>
    </DragDropContext>
  );
};

export default StartDesigning;
