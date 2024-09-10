import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

// Drag-and-Drop Types
const FurnitureType = 'FURNITURE';
const SectionType = 'SECTION';

// Furniture Item Component
const FurnitureItem = ({ id, type, name }) => {
  const [, drag] = useDrag(() => ({
    type: FurnitureType,
    item: { id, type },
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: '8px',
        margin: '4px',
        backgroundColor: 'lightblue',
        border: '1px solid black',
        cursor: 'move',
        display: 'inline-block',
        textAlign: 'center',
      }}
    >
      {name}
    </div>
  );
};

// Draggable Furniture Component
const DraggableFurniture = ({ id, type, left, top, onDelete, children }) => {
  const [, drag] = useDrag(() => ({
    type: FurnitureType,
    item: { id, type, left, top },
  }));

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        cursor: 'move',
        padding: '10px',
        backgroundColor: 'lightblue',
        border: '1px solid blue',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {children}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevents triggering drag
          onDelete(id);
        }}
        style={{
          marginLeft: '8px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          padding: '4px 8px',
        }}
      >
        X
      </button>
    </div>
  );
};

// Resizable Section Component
const ResizableSection = ({ id, name, left, top, width, height, onResize, onDelete, children }) => {
  const [, drag] = useDrag(() => ({
    type: SectionType,
    item: { id, left, top, width, height },
  }));

  const [resizing, setResizing] = useState(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setResizing(true);
  };

  const handleMouseMove = (e) => {
    if (resizing) {
      const newWidth = e.clientX - left;
      const newHeight = e.clientY - top;
      onResize(id, Math.max(newWidth, 50), Math.max(newHeight, 50));
    }
  };

  const handleMouseUp = () => {
    setResizing(false);
  };

  React.useEffect(() => {
    if (resizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing]);

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: 'lightgrey',
        border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {children}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevents triggering drag
          onDelete(id);
        }}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          padding: '4px 8px',
        }}
      >
        X
      </button>
      <div
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
          bottom: '5px',
          right: '5px',
          width: '10px',
          height: '10px',
          backgroundColor: 'darkgray',
          cursor: 'nwse-resize',
        }}
      ></div>
    </div>
  );
};

// Room Design Component
const RoomDesign = () => {
  const [furniture, setFurniture] = useState([]);
  const [sections, setSections] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: [FurnitureType, SectionType],
    drop: (item, monitor) => {
      const container = document.querySelector('#room-design');
      const containerRect = container.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      
      if (clientOffset) {
        const x = clientOffset.x - containerRect.left;
        const y = clientOffset.y - containerRect.top;

        if (item.type === FurnitureType) {
          setFurniture((prev) => [
            ...prev,
            {
              ...item,
              id: uuidv4(),
              left: Math.max(0, Math.min(containerRect.width - 100, x - 50)),
              top: Math.max(0, Math.min(containerRect.height - 100, y - 50)),
            },
          ]);
        } else if (item.type === SectionType) {
          setSections((prev) => [
            ...prev,
            {
              ...item,
              id: uuidv4(),
              left: Math.max(0, Math.min(containerRect.width - 100, x - 50)),
              top: Math.max(0, Math.min(containerRect.height - 100, y - 50)),
              width: 200,
              height: 200,
            },
          ]);
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleDeleteFurniture = (id) => {
    setFurniture((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteSection = (id) => {
    setSections((prev) => prev.filter((item) => item.id !== id));
    setFurniture((prev) => prev.filter((item) => !sections.some((section) => section.id === id)));
  };

  const handleResizeSection = (id, width, height) => {
    setSections((prev) => prev.map((section) =>
      section.id === id ? { ...section, width, height } : section
    ));
  };

  const handleClean = () => {
    setFurniture([]);
    setSections([]);
  };

  return (
    <div
      id="room-design"
      ref={drop}
      style={{
        width: '100%',
        height: '600px',
        position: 'relative',
        border: '1px solid black',
        backgroundColor: isOver ? 'lightgrey' : 'white',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {sections.map((section) => (
        <ResizableSection
          key={section.id}
          id={section.id}
          name={section.name}
          left={section.left}
          top={section.top}
          width={section.width}
          height={section.height}
          onResize={handleResizeSection}
          onDelete={handleDeleteSection}
        >
          {section.name}
        </ResizableSection>
      ))}
      {furniture.map((item) => (
        <DraggableFurniture
          key={item.id}
          id={item.id}
          type={item.type}
          left={item.left}
          top={item.top}
          onDelete={handleDeleteFurniture}
        >
          {item.type}
        </DraggableFurniture>
      ))}
      <button
        onClick={handleClean}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'darkred',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          padding: '8px 16px',
        }}
      >
        Clean All
      </button>
    </div>
  );
};

// Furniture Selection Component
const FurnitureSelection = () => {
  // Define an expanded range of furniture items
  const categories = {
    LivingRoom: [
      { id: 1, type: 'Sofa', name: 'Sofa' },
      { id: 2, type: 'CoffeeTable', name: 'Coffee Table' },
    ],
    Bedroom: [
      { id: 3, type: 'Bed', name: 'Bed' },
      { id: 4, type: 'Nightstand', name: 'Nightstand' },
    ],
    Kitchen: [
      { id: 5, type: 'DiningTable', name: 'Dining Table' },
      { id: 6, type: 'Refrigerator', name: 'Refrigerator' },
    ],
    // Add other categories as needed
  };

  return (
    <div style={{ padding: '10px' }}>
      {Object.entries(categories).map(([category, items]) => (
        <div key={category} style={{ marginBottom: '20px' }}>
          <h4>{category}</h4>
          {items.map((item) => (
            <FurnitureItem
              key={item.id}
              id={item.id}
              type={item.type}
              name={item.name}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// App Component
const App = () => (
  <DndProvider backend={HTML5Backend}>
    <div style={{ display: 'flex', height: '100vh' }}>
      <FurnitureSelection />
      <RoomDesign />
    </div>
  </DndProvider>
);

export default App;
