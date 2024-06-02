'use client';
import React from 'react';
import { useDraggable } from '@dnd-kit/core';

function DraggableItem({ id, children, initialPosition, containerRef ,frame}) {
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
    // touchAction: 'none',
    // backgroundSize: 'cover',
    // backgroundRepeat: "no-repeat",
    // wordBreak: "break-all",
    backgroundImage:`url(${frame})`,
    aspectRatio:"4 / 3",
    // width:"10rem",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  };

  return (
    <div ref={setNodeRef} className="absolute w-[10rem] flex justify-center touch-none items-center bg-cover bg-no-repeat break-all" style={style} {...attributes} {...listeners} >
      {children}
    </div>
  );
}

export default DraggableItem;
