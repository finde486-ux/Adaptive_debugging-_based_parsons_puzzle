import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import DropZone from '../../components/puzzle/DropZone';
import PieceList from '../../components/puzzle/PieceList';
import WorkspaceEditor from '../../components/puzzle/WorkspaceEditor';
import Terminal from '../../components/terminal/Terminal';
import { usePuzzleStore } from '../../stores/puzzleStore';
import { useIndent } from '../../hooks/useIndent';
import { formatPythonCode } from '../../lib/indentUtils';
import { usePuzzleSocket } from '../../hooks/usePuzzleSocket';

const PracticePage = () => {
  const { workspaceOrder, setWorkspaceOrder, pieceListOrder, setPieceListOrder, indentMap } = usePuzzleStore();
  const { increaseIndent, decreaseIndent } = useIndent();
  const { runCode, output } = usePuzzleSocket('mock-puzzle-id');

  const [puzzleData, setPuzzleData] = useState({
    title: 'Hello World Bug',
    goal: { description: 'Print "Hello World" to the terminal.' },
    pieces: [
      { id: 1, content: 'print("Hello World")', isFixed: false },
      { id: 2, content: 'print("Hello Bug")', isBuggy: true },
    ]
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (overId === 'workspace' && !workspaceOrder.includes(activeId)) {
      // Moving from list to workspace
      setWorkspaceOrder([...workspaceOrder, activeId]);
    } else if (workspaceOrder.includes(activeId)) {
      // Reordering within workspace
      const oldIndex = workspaceOrder.indexOf(activeId);
      const newIndex = workspaceOrder.indexOf(overId);
      if (newIndex !== -1) {
        setWorkspaceOrder(arrayMove(workspaceOrder, oldIndex, newIndex));
      }
    }
  };

  const currentCode = formatPythonCode(
    workspaceOrder.map(id => puzzleData.pieces.find(p => p.id === id)).filter(Boolean),
    indentMap
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar - Piece List */}
      <div className="w-1/4 p-4 border-r bg-white overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Code Pieces</h2>
        <PieceList items={puzzleData.pieces.filter(p => !workspaceOrder.includes(p.id))} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4 space-y-4">
        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <h1 className="text-2xl font-bold">{puzzleData.title}</h1>
          <button
            onClick={() => runCode(currentCode)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition"
          >
            Run Code
          </button>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
          <div className="flex flex-col">
            <h3 className="font-bold mb-2">Workspace (Drag pieces here)</h3>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <DropZone
                id="workspace"
                items={workspaceOrder.map(id => puzzleData.pieces.find(p => p.id === id)).filter(Boolean)}
                indentMap={indentMap}
                onIndentIncrease={increaseIndent}
                onIndentDecrease={decreaseIndent}
              />
            </DndContext>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold mb-2">Code Preview</h3>
            <WorkspaceEditor code={currentCode} />
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-2">Terminal</h3>
          <Terminal onData={output} />
        </div>
      </div>
    </div>
  );
};

export default PracticePage;
