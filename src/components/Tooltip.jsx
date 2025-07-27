
import React from 'react';

const Tooltip = ({ visible, onNext, onSkip, title, description, step, totalSteps }) => {
  if (!visible) return null;
  return (
    <div className="absolute z-50 right-full top-1/2 -translate-y-1/2 mr-4 w-[340px] bg-gray-900 text-white rounded-lg shadow-lg p-5 animate-fade-in">
      <div className="font-semibold text-base mb-1">{title}</div>
      <div className="text-sm mb-3 text-gray-200">{description}</div>
      <div className="text-xs text-gray-400 mb-4">Step {step} of {totalSteps}</div>
      <div className="flex justify-end items-center gap-4">
        <button onClick={onSkip} className="text-gray-300 text-sm hover:underline">Skip</button>
        <button onClick={onNext} className="bg-emerald-400 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-md text-sm font-semibold">Next</button>
      </div>
      {/* Arrow */}
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none">
        <div className="bg-gray-900 w-4 h-4 rotate-45 mx-auto shadow-lg"></div>
      </div>
    </div>
  );
};

export default Tooltip;
