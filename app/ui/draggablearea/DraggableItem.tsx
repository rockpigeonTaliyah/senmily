'use client';
import React from 'react';
import { useDraggable } from '@dnd-kit/core';

function DraggableItem({ id, children, initialPosition, containerRef }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  const containerRect = containerRef?.current?.getBoundingClientRect();
  const initialX = initialPosition?.x || 0;
  const initialY = initialPosition?.y || 0;

  let translateX = initialX;
  let translateY = initialY;

  if (isDragging && transform && containerRect) {
    const itemWidth = 100;  // Set this to the width of your draggable item
    const itemHeight = 100; // Set this to the height of your draggable item

    translateX = Math.max(
      0,
      Math.min(initialX + transform.x, containerRect.width - itemWidth)
    );
    translateY = Math.max(
      0,
      Math.min(initialY + transform.y, containerRect.height - itemHeight)
    );
  }

  const style = {
    transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
    touchAction: 'none',
    position: 'absolute',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export default DraggableItem;
