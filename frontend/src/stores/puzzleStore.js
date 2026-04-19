import { create } from 'zustand';

export const usePuzzleStore = create((set) => ({
  workspaceOrder: [],
  pieceListOrder: [],
  indentMap: {}, // { lineId: level }
  selectedPieceId: null,
  attemptCount: 0,
  hintsUnlocked: false,

  setWorkspaceOrder: (order) => set({ workspaceOrder: order }),
  setPieceListOrder: (order) => set({ pieceListOrder: order }),
  setIndent: (lineId, level) => set((state) => ({
    indentMap: { ...state.indentMap, [lineId]: level }
  })),
  incrementAttempt: () => set((state) => ({ attemptCount: state.attemptCount + 1 })),
  unlockHints: () => set({ hintsUnlocked: true }),
}));
