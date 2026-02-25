import React from 'react';
import Button from './Button';

const Modal = ({ isOpen, title, onClose, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <span className="sr-only">Close</span>×
          </button>
        </div>
        <div className="px-4 py-4">{children}</div>
        <div className="flex justify-end space-x-2 border-t bg-gray-50 px-4 py-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          {footer}
        </div>
      </div>
    </div>
  );
};

export default Modal;
