import React from 'react';

const MistakeReviewModal = ({ isOpen, mistakes, onContinue }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 border-t-8 border-orange-500">
        <h2 className="text-2xl font-black mb-4 text-gray-900">Review Your Progress</h2>
        <p className="text-gray-600 mb-6">Before you skip this puzzle, let's look at the concepts that were tricky:</p>

        <div className="space-y-4 mb-8">
          {mistakes.map((m, i) => (
            <div key={i} className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="font-bold text-orange-800">{m.concept}</div>
              <div className="text-sm text-orange-700 italic">"{m.note}"</div>
            </div>
          ))}
        </div>

        <button
          onClick={onContinue}
          className="w-full bg-orange-600 text-white py-4 rounded-xl font-black text-lg hover:bg-orange-700 transition transform hover:scale-[1.02]"
        >
          I UNDERSTAND, CONTINUE
        </button>
      </div>
    </div>
  );
};

export default MistakeReviewModal;
