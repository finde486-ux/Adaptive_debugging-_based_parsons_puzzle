import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const PuzzlePiece = ({ id, content, indentLevel, isFixed, isBuggy, onIndentIncrease, onIndentDecrease }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id, disabled: isFixed });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    paddingLeft: `${indentLevel * 20}px`,
  };

  const handleKeyDown = (e) => {
    if (isFixed) return;
    if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        onIndentDecrease?.(id);
      } else {
        onIndentIncrease?.(id);
      }
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={`p-3 mb-2 border rounded cursor-move bg-white shadow-sm flex items-center ${
        isFixed ? 'bg-gray-100 cursor-not-allowed' : ''
      }`}
    >
      <div className="mr-3 text-xs text-gray-400 font-mono">::</div>
      <code className="font-mono text-sm">{content}</code>
      {indentLevel > 0 && (
        <span className="ml-auto text-[10px] bg-blue-100 text-blue-800 px-1 rounded">
          Indent: {indentLevel}
        </span>
      )}
    </div>
  );
};

export default PuzzlePiece;
