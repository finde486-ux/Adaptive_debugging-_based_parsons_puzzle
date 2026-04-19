import React from 'react';

const HintModal = ({ isOpen, onClose, hint }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <span className="mr-2 text-yellow-500">💡</span> AI Hint
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <p className="text-gray-700 leading-relaxed italic">
          "{hint}"
        </p>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default HintModal;
