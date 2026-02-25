import React from 'react';

const StatusBadge = ({ status }) => {
  const isCompleted = status === 'completed';
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
      }`}
    >
      {isCompleted ? 'Completed' : 'Pending'}
    </span>
  );
};

export default StatusBadge;
