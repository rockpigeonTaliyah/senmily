import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback
} from 'react';
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor
} from '@dnd-kit/core';
import DraggableItem from './DraggableItem';
import EditableDiv from './EditableDiv';
import { Mission } from '@/type/Page';

type DraggableAreaProps = {
  children: React.ReactNode;
  items: Mission[];
  onExport?: (result: Mission[]) => void;
  onMissionUpdate ?: (item:any) => void;
  onDragStart?: any;
  onDragEnd?: any;
};

export type DraggableAreaHandles = {
  handleExport: () => void;
  updateItemsAttributes: (attributes: Partial<Mission>[]) => void;
};

const DraggableArea = forwardRef<DraggableAreaHandles, DraggableAreaProps>(
  (
    {
      children,
      items,
      onExport,
      onMissionUpdate,
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
        ...item,
        text: texts[item.id],
        initialPosition: positions[item.id]
      }));

      if (onExport) {
        onExport(result);
      }
    }, [items, texts, positions, onExport]);

    const updateItemsAttributes = (attributes: Partial<Mission>[]) => {
      setPositions((prevPositions) => {
        const updatedPositions = { ...prevPositions };
        attributes.forEach(attr => {
          if (attr.id && attr.initialPosition) {
            updatedPositions[attr.id] = attr.initialPosition;
          }
        });
        return updatedPositions;
      });

      setTexts((prevTexts) => {
        const updatedTexts = { ...prevTexts };
        attributes.forEach(attr => {
          if (attr.id && attr.text) {
            updatedTexts[attr.id] = attr.text;
          }
        });
        return updatedTexts;
      });

      handleExport();
    };

    useImperativeHandle(ref, () => ({
      handleExport,
      updateItemsAttributes,
    }));

    const ParentHandleDragEnd = useCallback((event) => {
      onDragEnd && onDragEnd(); // call parent's onDragEnd if defined
    }, [onDragEnd]);

    const SelfhandleDragEnd = useCallback(
      (event: any) => {
        ParentHandleDragEnd(event);

        const { id } = event.active;
        const { delta } = event;

        setPositions((prevPositions) => {
          const newPosition = {
            x: Math.max(0, prevPositions[id].x + delta.x),
            y: Math.max(0, prevPositions[id].y + delta.y)
          };
          const containerRect = containerRef.current!.getBoundingClientRect();
          const itemWidth = 100; // consider making this dynamic or passing it as a prop
          const itemHeight = 100; // consider making this dynamic or passing it as a prop

          newPosition.x = Math.min(
            newPosition.x,
            containerRect.width - itemWidth
          );
          newPosition.y = Math.min(
            newPosition.y,
            containerRect.height - itemHeight
          );

          return { ...prevPositions, [id]: newPosition };
        });

        handleExport();
      },
      [ParentHandleDragEnd, handleExport]
    );

    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 1,
        }
      })
    );
    const onUpdate = (e,id,target,frame,position) => {
      onMissionUpdate({
        id : id,
        target : target,
        frame : frame,
        initialPosition : position,
        text : e.target.innerText,
      })
      console.log("Area reciveed",e.target.innerText);
      console.log("Area reciveed",target);
      console.log("Area reciveed",frame);
      console.log("Area reciveed",position);
      console.log("id",id);
    }
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
                textUpdate={(e: React.PointerEvent<HTMLDivElement>)=>{onUpdate(e,item.id,item.target,item.frame,positions[item.id])}}
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
