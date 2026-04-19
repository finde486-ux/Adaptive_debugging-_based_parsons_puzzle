import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import PuzzlePiece from './PuzzlePiece';

const DropZone = ({ id, items, indentMap, onIndentIncrease, onIndentDecrease }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="p-4 border-2 border-dashed border-gray-300 rounded-lg min-h-[400px] bg-gray-50"
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <PuzzlePiece
            key={item.id}
            id={item.id}
            content={item.content}
            indentLevel={indentMap[item.id] || 0}
            isFixed={item.isFixed}
            isBuggy={item.isBuggy}
            onIndentIncrease={onIndentIncrease}
            onIndentDecrease={onIndentDecrease}
          />
        ))}
      </SortableContext>
    </div>
  );
};

export default DropZone;
