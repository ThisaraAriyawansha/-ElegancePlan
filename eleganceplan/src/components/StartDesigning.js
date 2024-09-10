import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';
import './StartDesigning';

// Drag-and-Drop Types
const FurnitureType = 'FURNITURE';

// Furniture Item Component
const FurnitureItem = ({ id, type, name, onClick }) => {
  const [, drag] = useDrag(() => ({
    type: FurnitureType,
    item: { id, type },
  }));

  return (
    <div
      ref={drag}
      onClick={onClick}
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

// SectionalArea Component
const SectionalArea = ({ id, name, left, top, width, height }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        border: '1px solid black',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        boxSizing: 'border-box',
      }}
    >
      <h4 style={{ textAlign: 'center' }}>{name}</h4>
    </div>
  );
};

// Room Design Component
const RoomDesign = ({ furniture, sections, setFurniture }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: FurnitureType,
    drop: (item, monitor) => {
      const container = document.querySelector('#room-design');
      const containerRect = container.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      
      if (clientOffset) {
        const x = clientOffset.x - containerRect.left;
        const y = clientOffset.y - containerRect.top;

        setFurniture((prev) => [
          ...prev,
          {
            ...item,
            id: uuidv4(),
            left: Math.max(0, Math.min(containerRect.width - 100, x - 50)),
            top: Math.max(0, Math.min(containerRect.height - 100, y - 50)),
          },
        ]);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleDelete = (id) => {
    setFurniture((prev) => prev.filter((item) => item.id !== id));
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
        <SectionalArea
          key={section.id}
          id={section.id}
          name={section.name}
          left={section.left}
          top={section.top}
          width={section.width}
          height={section.height}
        />
      ))}
      {furniture.map((item) => (
        <DraggableFurniture
          key={item.id}
          id={item.id}
          type={item.type}
          left={item.left}
          top={item.top}
          onDelete={handleDelete}
        >
          {item.type}
        </DraggableFurniture>
      ))}
    </div>
  );
};

// Section Controls Component
const SectionControls = ({ sections, setSections }) => {
  const [updatedSections, setUpdatedSections] = useState([...sections]);

  const handleChange = (e, id, field) => {
    const value = parseInt(e.target.value, 10);
    setUpdatedSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const handleApply = () => {
    setSections(updatedSections);
  };

  return (
    <div>
      <h2>Adjust Sections</h2>
      {updatedSections.map((section) => (
        <div key={section.id} style={{ marginBottom: '20px' }}>
          <h3>{section.name}</h3>
          <label>
            Left:
            <input
              type="number"
              value={section.left}
              onChange={(e) => handleChange(e, section.id, 'left')}
            />
          </label>
          <label>
            Top:
            <input
              type="number"
              value={section.top}
              onChange={(e) => handleChange(e, section.id, 'top')}
            />
          </label>
          <label>
            Width:
            <input
              type="number"
              value={section.width}
              onChange={(e) => handleChange(e, section.id, 'width')}
            />
          </label>
          <label>
            Height:
            <input
              type="number"
              value={section.height}
              onChange={(e) => handleChange(e, section.id, 'height')}
            />
          </label>
        </div>
      ))}
      <button
        onClick={handleApply}
        style={{
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          padding: '8px 16px',
        }}
      >
        Apply
      </button>
    </div>
  );
};

// Furniture Selection Component
const FurnitureSelection = ({ onSelectFurniture }) => {
  const categories = {
    LivingRoom: [
      { id: 1, type: 'Sofa', name: 'Sofa' },
      { id: 2, type: 'CoffeeTable', name: 'Coffee Table' },
      { id: 3, type: 'Armchair', name: 'Armchair' },
      { id: 4, type: 'TVStand', name: 'TV Stand' },
      { id: 5, type: 'Bookshelf', name: 'Bookshelf' },
    ],
    DiningRoom: [
      { id: 6, type: 'DiningTable', name: 'Dining Table' },
      { id: 7, type: 'DiningChair', name: 'Dining Chair' },
      { id: 8, type: 'Buffet', name: 'Buffet' },
      { id: 9, type: 'Barstool', name: 'Barstool' },
    ],
    Bedroom: [
      { id: 10, type: 'Bed', name: 'Bed' },
      { id: 11, type: 'Nightstand', name: 'Nightstand' },
      { id: 12, type: 'Dresser', name: 'Dresser' },
      { id: 13, type: 'Wardrobe', name: 'Wardrobe' },
    ],
    Office: [
      { id: 14, type: 'Desk', name: 'Desk' },
      { id: 15, type: 'OfficeChair', name: 'Office Chair' },
      { id: 16, type: 'Bookshelf', name: 'Bookshelf' },
      { id: 17, type: 'FileCabinet', name: 'File Cabinet' },
      { id: 18, type: 'MeetingTable', name: 'Meeting Table' },
    ],
    Garden: [
      { id: 19, type: 'GardenChair', name: 'Garden Chair' },
      { id: 20, type: 'SunLounge', name: 'Sun Lounge' },
      { id: 21, type: 'Planter', name: 'Planter' },
    ],
  };

  return (
    <div>
      <h2>Select Furniture</h2>
      {Object.entries(categories).map(([category, items]) => (
        <div key={category}>
          <h3>{category}</h3>
          {items.map((item) => (
            <FurnitureItem
              key={item.id}
              id={item.id}
              type={item.type}
              name={item.name}
              onClick={() => onSelectFurniture(item)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// Main App Component
const App = () => {
  const [furniture, setFurniture] = useState([]);
  const [sections, setSections] = useState([
    { id: 1, name: 'Living Room', left: 0, top: 0, width: 300, height: 300 },
    { id: 2, name: 'Dining Room', left: 300, top: 0, width: 300, height: 300 },
    { id: 3, name: 'Bedroom', left: 0, top: 300, width: 300, height: 300 },
    { id: 4, name: 'Office', left: 300, top: 300, width: 300, height: 300 },
    { id: 5, name: 'Garden', left: 0, top: 600, width: 600, height: 200 },
  ]);
  

  const handleCleanAll = () => {
    setFurniture([]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: '20px' }}>
        <FurnitureSelection onSelectFurniture={(item) => setFurniture((prev) => [...prev, { ...item, id: uuidv4(), left: 0, top: 0 }])} />
        <RoomDesign furniture={furniture} sections={sections} setFurniture={setFurniture} />
        <SectionControls sections={sections} setSections={setSections} />
        <button
          onClick={handleCleanAll}
          style={{
            marginTop: '20px',
            backgroundColor: 'red',
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
    </DndProvider>
  );
};

export default App;
