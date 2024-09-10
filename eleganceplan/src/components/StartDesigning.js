import React, { useState, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Canvas, Text } from 'fabric'; // Import specific fabric components
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
const Room = React.forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);

  useEffect(() => {
    const canvas = new Canvas(canvasRef.current, {
      backgroundColor: 'lightgrey',
      width: 800,
      height: 600,
    });
    setFabricCanvas(canvas);
    if (ref) ref.current = canvas; // Forward the ref to parent component

    return () => {
      canvas.dispose(); // Cleanup on unmount
    };
  }, [ref]);

  return (
    <div className="room">
      <canvas ref={canvasRef} width="800" height="600" />
    </div>
  );
});

const StartDesigning = () => {
  const [furnitureItems, setFurnitureItems] = useState(initialFurnitureItems);
  const [draggedItem, setDraggedItem] = useState(null);
  const canvasRef = useRef(null); // Reference for the Room canvas

  // Handle the drop of a furniture item on the canvas
  const handleDrop = (pointer) => {
    if (draggedItem && canvasRef.current) {
      const canvas = canvasRef.current;

      // Add the dragged item as fabric text at the pointer location
      const newItem = new Text(draggedItem.name, {
        left: pointer.x,
        top: pointer.y,
        fill: 'black',
        fontSize: 20,
        selectable: true,
      });

      canvas.add(newItem);
      canvas.renderAll();
    }
  };

  // Triggered when drag starts
  const onDragStart = (start) => {
    const item = furnitureItems.find(f => f.id === start.draggableId);
    if (item) {
      setDraggedItem(item);
    }
  };

  // Triggered when drag ends
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const canvas = canvasRef.current;
    if (canvas) {
      // Get mouse pointer coordinates on the canvas
      const pointer = canvas.getPointer({ x: result.destination.index * 100, y: result.destination.index * 100 });

      // Handle item drop at the pointer location
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
        <Room ref={canvasRef} />
      </div>
    </DragDropContext>
  );
};

export default StartDesigning;
