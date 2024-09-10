import React, { useState, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { fabric } from 'fabric'; // Ensure you have installed fabric
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

  useEffect(() => {
    // Initialize fabric.js canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: 'lightgrey',
      width: 800,
      height: 600,
    });
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

  // Handle adding the item to the canvas at a specific location
  const handleDrop = (x, y) => {
    if (draggedItem && canvasRef.current) {
      const canvas = canvasRef.current;

      // Create and add fabric text for the furniture item
      const newItem = new fabric.Text(draggedItem.name, {
        left: x,
        top: y,
        fill: 'black',
        fontSize: 20,
        selectable: true,
      });

      canvas.add(newItem);
      canvas.renderAll();
    }
  };

  // When dragging starts, set the current dragged item
  const onDragStart = (start) => {
    const item = furnitureItems.find(f => f.id === start.draggableId);
    setDraggedItem(item);
  };

  // Handle the drop event and map it to the canvas
  const onDragEnd = (result) => {
    if (!result.destination || !canvasRef.current) return;

    // Get the canvas and calculate where to drop the item
    const canvas = canvasRef.current;
    const pointer = canvas.getPointer({ clientX: result.source.index * 100, clientY: result.destination.index * 100 });

    handleDrop(pointer.x, pointer.y); // Drop the item at the calculated position
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
