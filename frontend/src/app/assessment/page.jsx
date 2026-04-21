import React, { useState, useEffect } from 'react';
import api from '../../lib/api';

const AssessmentPage = () => {
  const [currentQ, setCurrentQ] = useState(null);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState(null);

  const fetchNext = async (currentStep) => {
    try {
      const res = await api.get(`/assessment/python/next?step=${currentStep}`);
      if (res.data.completed) {
        setCompleted(true);
      } else {
        setCurrentQ(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNext(0);
  }, []);

  const handleSubmit = async (answer) => {
    try {
      const res = await api.post('/assessment/python/submit', {
        questionId: currentQ.id,
        answer,
        step
      });

      if (res.data.completed) {
        setCompleted(true);
        setResult(res.data.finalLevel);
      } else {
        setStep(res.data.nextStep);
        fetchNext(res.data.nextStep);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (completed) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Assessment Completed!</h1>
        <p className="text-xl">Your initial level is: <span className="font-bold text-blue-600">Level {result}</span></p>
        <button
          onClick={() => window.location.href = '/home'}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded shadow"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  if (!currentQ) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-4 text-sm text-gray-500">Question {step + 1}</div>
      <h1 className="text-2xl font-bold mb-6">{currentQ.question}</h1>
      <div className="space-y-3">
        {currentQ.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSubmit(opt)}
            className="w-full text-left p-4 border rounded hover:bg-blue-50 transition border-gray-300"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AssessmentPage;
