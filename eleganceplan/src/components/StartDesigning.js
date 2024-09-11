import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';
import './StartDesigning.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation
import { FaHome } from 'react-icons/fa'; // Font Awesome home icon
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
      className="furniture-item"
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
    const remainingSections = updatedSections.filter((section) => section.id !== id);
  
    // Update the dimensions of the target section
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
  
    let newLeft = 0;
    let newTop = 0;
    const sectionSpacing = 10; // Space between sections
  
    const adjustedSections = [];
    let fit = true;
  
    // Resize and reposition sections
    remainingSections.forEach((section) => {
      if (fit) {
        if (newLeft + section.width > containerWidth) {
          newLeft = 0;
          newTop += section.height + sectionSpacing;
        }
  
        // Ensure the section fits within the container
        const updated = {
          ...section,
          left: newLeft,
          top: newTop,
        };
  
        adjustedSections.push(updated);
  
        newLeft += section.width + sectionSpacing; // Move to the next position
      }
    });
  
    // Ensure the target section does not overlap and fits in the container
    const targetSection = {
      ...updatedSection,
      left: Math.min(updatedSection.left, containerWidth - updatedSection.width),
      top: Math.min(updatedSection.top, containerHeight - updatedSection.height),
    };
  
    // Combine updated and adjusted sections
    const finalSections = [
      targetSection,
      ...adjustedSections,
    ];
  
    setSections(finalSections);
  };
  

  return (
    <div className="section-controls">
      <h2 className='h22'>Adjust Sections</h2>
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

// Main App Component
const App = () => {
  const [furniture, setFurniture] = useState([]);
  const [sections, setSections] = useState([
    { id: 1, name: 'Living Room', left: 0, top: 0, width: 300, height: 300 },
    { id: 2, name: 'Dining Room', left: 300, top: 0, width: 300, height: 300 },
    { id: 3, name: 'Bedroom', left: 0, top: 300, width: 300, height: 300 },
    { id: 4, name: 'Office', left: 300, top: 300, width: 300, height: 300 },
    { id: 5, name: 'Garden', left: 600, top: 0, width: 300, height: 300 },
  ]);

  const handleFurnitureSelection = (item) => {
    setFurniture((prev) => [
      ...prev,
      {
        ...item,
        id: uuidv4(),
        left: 0,
        top: 0,
      },
    ]);
  };

  const handleDeleteAll = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete all!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setFurniture([]); // Clear all furniture
        Swal.fire(
          'Deleted!',
          'All furniture items have been deleted.',
          'success'
        );
      }
    });
  };

  const handleDownloadPDF = () => {
    const roomDesign = document.querySelector('#room-design');
    
    // Add class to hide close icons
    roomDesign.classList.add('hide-close-icons');
    
    html2canvas(roomDesign).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('room-design.pdf');
      
      // Remove class to restore close icons
      roomDesign.classList.remove('hide-close-icons');
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
      <header className='header'>
      <Link to="/" className='home-link'>
        <FaHome className='home-icon' />
      </Link>
      <h1 className='header-title'>Furniture Design Tool</h1>
      <button onClick={handleDownloadPDF} className="download-button">
        Download PDF
      </button>
      <button onClick={handleDeleteAll} className="delete-all-button">
        <span className="button-text">Delete All</span>
      </button>
    </header>

        <br></br><br></br><br></br>
        <div className="main-content">
          <FurnitureSelection onSelectFurniture={handleFurnitureSelection} />
          <RoomDesign furniture={furniture} sections={sections} setFurniture={setFurniture} />
          <SectionControls sections={sections} setSections={setSections} />
        </div>
      </div>

    </DndProvider>
    
  );
};

export default App;
