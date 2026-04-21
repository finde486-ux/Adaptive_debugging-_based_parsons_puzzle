import { useCallback } from 'react';
import { usePuzzleStore } from '../stores/puzzleStore';

export const useIndent = () => {
  const { indentMap, setIndent } = usePuzzleStore();

  const increaseIndent = useCallback((lineId) => {
    const current = indentMap[lineId] || 0;
    setIndent(lineId, current + 1);
  }, [indentMap, setIndent]);

  const decreaseIndent = useCallback((lineId) => {
    const current = indentMap[lineId] || 0;
    if (current > 0) {
      setIndent(lineId, current - 1);
    }
  }, [indentMap, setIndent]);

  return { increaseIndent, decreaseIndent, indentMap };
};
