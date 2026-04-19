import React from 'react';

const ExplainLineModal = ({ isOpen, onClose, explanation, lineContent }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Line Explanation</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <div className="bg-gray-100 p-3 rounded font-mono text-sm mb-4 border-l-4 border-blue-500">
          {lineContent}
        </div>
        <p className="text-gray-700 leading-relaxed">
          {explanation}
        </p>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-800 text-white py-2 rounded font-bold hover:bg-gray-900 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ExplainLineModal;
