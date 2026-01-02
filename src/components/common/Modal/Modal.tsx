import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-3xl shadow-elegant-lg max-w-lg w-full max-h-[90vh] overflow-hidden animate-slide-up border-2 border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="px-6 py-5 bg-gray-900 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-display font-bold tracking-tight text-white">{title}</h2>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-700 hover:text-white transition-all duration-200"
            >
              <span className="text-2xl leading-none">×</span>
            </button>
          </div>
        )}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] bg-gray-800">
          {children}
        </div>
      </div>
    </div>
  );
};
