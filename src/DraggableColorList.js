import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const DraggableColorList = ({
  colorsList,
  handleDelete,
  handleEdit,
  handleDrag,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDrag}
    >
      <SortableContext
        items={colorsList.map((color) => color.name)}
        strategy={verticalListSortingStrategy}
      >
        <div style={{ height: '100%' }}>
          {colorsList.map((color) => (
            <DraggableColorBox
              id={color.name}
              key={color.name}
              color={color.color}
              name={color.name}
              handleEdit={() => handleEdit(color.name, color.color)}
              handleDelete={() => handleDelete(color.name)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
export default DraggableColorList;
