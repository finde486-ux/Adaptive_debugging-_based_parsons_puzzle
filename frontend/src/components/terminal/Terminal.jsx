import React, { useEffect, useRef } from 'react';
import { Terminal as Xterm } from 'xterm';
import 'xterm/css/xterm.css';

const Terminal = ({ onData }) => {
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    xtermRef.current = new Xterm({
      cursorBlink: true,
      theme: {
        background: '#1e1e1e',
        foreground: '#ffffff',
      },
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    });

    xtermRef.current.open(terminalRef.current);
    xtermRef.current.writeln('\x1b[1;32mDebugQuest Terminal v1.0\x1b[0m');
    xtermRef.current.writeln('Ready for Python 3.11 execution...');

    return () => {
      xtermRef.current?.dispose();
    };
  }, []);

  // Method to write to terminal from outside
  useEffect(() => {
    if (onData) {
      xtermRef.current?.write(onData);
    }
  }, [onData]);

  return (
    <div className="h-48 bg-[#1e1e1e] border rounded-lg overflow-hidden p-2">
      <div ref={terminalRef} className="h-full" />
    </div>
  );
};

export default Terminal;
