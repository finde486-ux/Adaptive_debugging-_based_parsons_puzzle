import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import PuzzlePiece from './PuzzlePiece';

const PieceList = ({ items }) => {
  return (
    <div className="space-y-2">
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <PuzzlePiece
            key={item.id}
            id={item.id}
            content={item.content}
            indentLevel={0}
            isFixed={false}
          />
        ))}
      </SortableContext>
    </div>
  );
};

export default PieceList;
