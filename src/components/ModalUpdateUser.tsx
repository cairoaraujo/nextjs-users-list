'use client';

import { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalUpdateUserProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
}

export function ModalUpdateUser({
  isOpen,
  onClose,
  onConfirm,
  userName,
}: ModalUpdateUserProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isOpen]);

  if (!isOpen) return null;

  if (typeof window === 'undefined') return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Update user</h2>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-green-400 text-white hover:bg-red-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal-root') as HTMLElement,
  );
}
