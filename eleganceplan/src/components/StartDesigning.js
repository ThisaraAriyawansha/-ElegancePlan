import React, { useState, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';
import './StartDesigning.css';

// Drag-and-Drop Types
const FurnitureType = 'FURNITURE';

// Furniture Item Component
const FurnitureItem = ({ id, type, name, onClick }) => {
  const [, drag] = useDrag(() => ({
    type: FurnitureType,
    item: { id, type },
  }));

  return (
    <div ref={drag} onClick={onClick} className="furniture-item">
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
      className="draggable-furniture"
      style={{ left: `${left}px`, top: `${top}px` }}
    >
      {children}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
        className="delete-button"
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
      className="sectional-area"
      style={{ left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` }}
    >
      <h4>{name}</h4>
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
      className={`room-design ${isOver ? 'over' : ''}`}
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

  const handleApply = (id) => {
    const updatedSection = updatedSections.find((section) => section.id === id);
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? updatedSection : section
      )
    );
  };

  useEffect(() => {
    const totalWidth = 900; // total width of the room
    const totalHeight = 600; // total height of the room
    let remainingWidth = totalWidth;
    let remainingHeight = totalHeight;

    updatedSections.forEach((section) => {
      remainingWidth -= section.width;
      remainingHeight -= section.height;
    });

    const autoWidth = remainingWidth / (updatedSections.length - 1);
    const autoHeight = remainingHeight / (updatedSections.length - 1);

    setUpdatedSections((prev) =>
      prev.map((section, index) => ({
        ...section,
        width: section.id === id ? section.width : autoWidth,
        height: section.id === id ? section.height : autoHeight,
      }))
    );
  }, [updatedSections, setSections]);

  return (
    <div className="section-controls">
      <h2>Adjust Sections</h2>
      {updatedSections.map((section) => (
        <div key={section.id} className="section-controls-item">
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
          <button
            onClick={() => handleApply(section.id)}
            className="apply-button"
          >
            Apply {section.name}
          </button>
        </div>
      ))}
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
    <div className="furniture-selection">
      <h2 className='h22'>Select Furniture</h2>
      {Object.entries(categories).map(([category, items]) => (
        <div key={category} className="furniture-category">
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

// Main StartDesigning Component
const StartDesigning = () => {
  const [furniture, setFurniture] = useState([]);
  const [sections, setSections] = useState([
    { id: 1, name: 'Section 1', left: 50, top: 50, width: 300, height: 200 },
    { id: 2, name: 'Section 2', left: 400, top: 50, width: 300, height: 200 },
    { id: 3, name: 'Section 3', left: 50, top: 300, width: 300, height: 200 },
    { id: 4, name: 'Section 4', left: 400, top: 300, width: 300, height: 200 },
  ]);

  const handleSelectFurniture = (item) => {
    setFurniture((prev) => [
      ...prev,
      {
        ...item,
        id: uuidv4(),
        left: 50,
        top: 50,
      },
    ]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="start-designing">
        <h1 className='title'>Start Designing Your Room</h1>
        <div className="design-controls">
          <FurnitureSelection onSelectFurniture={handleSelectFurniture} />
          <SectionControls sections={sections} setSections={setSections} />
        </div>
        <RoomDesign
          furniture={furniture}
          sections={sections}
          setFurniture={setFurniture}
        />
      </div>
    </DndProvider>
  );
};

export default StartDesigning;
