import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export const usePuzzleSocket = (puzzleId) => {
  const socketRef = useRef(null);
  const [output, setOutput] = useState('');

  useEffect(() => {
    const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    socketRef.current = io(SOCKET_URL, {
      query: { puzzleId }
    });

    socketRef.current.on('output', (data) => {
      setOutput(data);
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [puzzleId]);

  const runCode = (code) => {
    socketRef.current?.emit('run', { code });
  };

  return { runCode, output };
};
