import React from 'react';

const Spinner = () => {
  return (
    <div className="inline-flex items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
    </div>
  );
};

export default Spinner;
