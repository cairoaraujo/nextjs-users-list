'use client';

import { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalDeleteUserProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
}

export function ModalDeleteUser({ isOpen, onClose, onConfirm, userName }: ModalDeleteUserProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isOpen]);

  if (!isOpen) return null;

  if (typeof window === 'undefined') return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Excluir Usuário</h2>
        <p className="mb-6">
          Tem certeza que deseja excluir <strong>{userName ?? 'este usuário'}</strong>?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal-root') as HTMLElement
  );
}
