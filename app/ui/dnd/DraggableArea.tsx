import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
} from '@dnd-kit/core';
import DraggableItem from './DraggableItem';
import EditableDiv from './EditableDiv';
import { PageConfig, Mission } from '@/type/Page';

type DraggableAreaProps = {
  children: React.ReactNode;
  items: Mission[];
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  onExport?: (result: Mission[]) => void;
  onTextChange?: (id: string, newText: string) => void;
  onItemsChange?: (updatedItems: Mission[]) => void;
  onDragStart?:any;
  onDragEnd?:any;
};

export type DraggableAreaHandles = {
  handleExport: () => void;
};

const DraggableArea = forwardRef<DraggableAreaHandles, DraggableAreaProps>(
  (
    {
      children,
      items,
      onExport,
      onMouseDown,
      onMouseUp,
      onTouchStart,
      onTouchEnd,
      onTextChange,
      onItemsChange,
      onDragStart,
      onDragEnd
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [positions, setPositions] = useState<
      Record<string, { x: number; y: number }>
    >(() =>
      items.reduce(
        (acc, item) => ({ ...acc, [item.id]: item.initialPosition }),
        {},
      ),
    );

    const [texts, setTexts] = useState<Record<string, string>>(() =>
      items.reduce((acc, item) => ({ ...acc, [item.id]: item.text }), {}),
    );

    useEffect(() => {
      setPositions((prevPositions) =>
        items.reduce(
          (acc, item) => ({
            ...acc,
            [item.id]: prevPositions[item.id] || item.initialPosition,
          }),
          {},
        ),
      );
      setTexts((prevTexts) =>
        items.reduce(
          (acc, item) => ({
            ...acc,
            [item.id]: prevTexts[item.id] || item.text,
          }),
          {},
        ),
      );
    }, [items]);

    const handleExport = useCallback(() => {
      const result = items.map((item) => ({
        ...item, // Spread all existing properties of `item`
        text: texts[item.id], // Override the `text` property
        initialPosition: positions[item.id], // Override the `position` property
      }));

      if (onExport) {
        onExport(result);
      }
    }, [items, texts, positions, onExport]);
    const ParentHandleDragEnd = onDragEnd;
    const SelfhandleDragEnd = useCallback(
      (event: any) => {
        ParentHandleDragEnd();
        const { id } = event.active;
        const { delta } = event;

        setPositions((prevPositions) => {
          const newPosition = {
            x: Math.max(0, prevPositions[id].x + delta.x),
            y: Math.max(0, prevPositions[id].y + delta.y),
          };
          const containerRect = containerRef.current!.getBoundingClientRect();
          const itemWidth = 100; // consider making this dynamic or passing it as a prop
          const itemHeight = 100; // consider making this dynamic or passing it as a prop

          newPosition.x = Math.min(
            newPosition.x,
            containerRect.width - itemWidth,
          );
          newPosition.y = Math.min(
            newPosition.y,
            containerRect.height - itemHeight,
          );

          return { ...prevPositions, [id]: newPosition };
        });
        handleExport();
      },
      [handleExport],
    );

    const handleTextChange = useCallback(
      (id: string, newText: string) => {
        setTexts((prevTexts) => {
          const updatedTexts = { ...prevTexts, [id]: newText };
          return updatedTexts;
        });
        if (onTextChange) {
          onTextChange(id, newText);
        }
      },
      [onTextChange],
    );

    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 1,
        },
      }),
    );

    useImperativeHandle(ref, () => ({
      handleExport,
    }));

    return (
      <DndContext sensors={sensors} onDragEnd={SelfhandleDragEnd} onDragStart={onDragStart}>
        <div
          id="container"
          ref={containerRef}
          key="dndcontainer"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {items.map((item) => (
            <DraggableItem
              key={item.id}
              id={item.id}
              initialPosition={positions[item.id]}
              containerRef={containerRef}
              frame={item.frame}
            >
              <EditableDiv
                text={texts[item.id]}
                setText={(newText: string) =>
                  handleTextChange(item.id, newText)
                }
                onMouseDown={(e: React.PointerEvent<HTMLDivElement>) => {
                  if (onMouseDown) onMouseDown();
                   e.stopPropagation();
                }}
                onMouseUp={(e: React.PointerEvent<HTMLDivElement>) => {
                  if (onMouseUp) onMouseUp();
                   e.stopPropagation();
                }}
              />
            </DraggableItem>
          ))}
          {children}
        </div>
      </DndContext>
    );
  },
);

DraggableArea.displayName = 'DraggableArea';

export default DraggableArea;
