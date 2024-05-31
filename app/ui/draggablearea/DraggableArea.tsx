'use client';
import React, { useState, useRef } from 'react';
import { DndContext, useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
import DraggableItem from './DraggableItem';
import EditableDiv from './EditableDiv';

function DraggableArea({ items }) {
  const [positions, setPositions] = useState(items.map(item => item.initialPosition || { x: 0, y: 0 }));
  const [texts, setTexts] = useState(items.map(item => item.text || 'Edit me!'));
  const containerRef = useRef(null);

  const handleDragEnd = (event) => {
    const { id } = event.active;
    const { delta } = event;
    const index = items.findIndex(item => item.id === id);

    if (index !== -1) {
      setPositions((prevPositions) => {
        const newPositions = [...prevPositions];
        const newPosition = {
          x: Math.max(0, prevPositions[index].x + delta.x),
          y: Math.max(0, prevPositions[index].y + delta.y),
        };
        const containerRect = containerRef.current.getBoundingClientRect();
        const itemWidth = 100;  // Set this to the width of your draggable item
        const itemHeight = 100; // Set this to the height of your draggable item

        newPosition.x = Math.min(
          newPosition.x,
          containerRect.width - itemWidth
        );
        newPosition.y = Math.min(
          newPosition.y,
          containerRect.height - itemHeight
        );

        newPositions[index] = newPosition;

        return newPositions;
      });
    }
  };

  const handleTextChange = (index, newText) => {
    setTexts((prevTexts) => {
      const newTexts = [...prevTexts];
      newTexts[index] = newText;
      return newTexts;
    });
  };

  const handleExport = () => {
    const result = items.map((item, index) => ({
      id: item.id,
      text: texts[index],
      position: positions[index],
    }));
    console.log(result);
    // You can replace console.log with any method to handle the result, like saving to a file or sending to a server.
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  return (
    <div>
      <button onClick={handleExport}>Export Positions and Texts</button>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div
          id="container"
          ref={containerRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            border: '1px solid red',
            overflow: 'hidden',
          }}
        >
          {items.map((item, index) => (
            <DraggableItem
              key={item.id}
              id={item.id}
              initialPosition={positions[index]}
              containerRef={containerRef}
            >
              <EditableDiv
                text={texts[index]}
                setText={(newText) => handleTextChange(index, newText)}
                onMouseDown={(e) => e.stopPropagation()}
                onFocus={(e) => e.stopPropagation()}
                onBlur={(e) => e.stopPropagation()}
              />
            </DraggableItem>
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default DraggableArea;
