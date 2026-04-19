import React from 'react';
import Editor from '@monaco-editor/react';

const WorkspaceEditor = ({ code }) => {
  return (
    <div className="border rounded-lg overflow-hidden h-full min-h-[400px]">
      <Editor
        height="100%"
        defaultLanguage="python"
        theme="vs-dark"
        value={code}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          renderWhitespace: 'all',
        }}
      />
    </div>
  );
};

export default WorkspaceEditor;
