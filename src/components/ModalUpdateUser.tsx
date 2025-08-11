import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { User } from '@/types/user';

interface ModalUpdateUserProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<User>) => void;
  userName?: string;
  email?: string;
}

export function ModalUpdateUser({
  isOpen,
  onClose,
  onSubmit,
  userName,
  email,
}: ModalUpdateUserProps) {
  const { handleSubmit, register, reset } = useForm<Partial<User>>({
    defaultValues: {
      name: userName || '',
      email: email || '',
    },
  });

  // Reset form values quando abrir modal (ou quando userName/email mudam)
  useEffect(() => {
    if (isOpen) {
      reset({
        name: userName || '',
        email: email || '',
      });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen, userName, email, reset]);

  if (!isOpen) return null;
  if (typeof window === 'undefined') return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">Update user</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <div className="w-full">
            <label className="block mb-1 text-lg text-gray-800 w-full font-semibold">
              Name
            </label>
            <input
              className="w-full block p-2 border rounded-md border-blue-200 focus:border-blue-400 outline-none text-lg text-gray-700"
              {...register('name', { required: true })}
              placeholder={userName}
            />
          </div>

          <div>
            <label className="block mb-1 text-lg text-gray-800 font-semibold">
              Email
            </label>
            <input
              className="w-full p-2 border rounded-md border-blue-200 focus:border-blue-400 outline-none text-lg text-gray-700"
              {...register('email', {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
              placeholder={email}
              type="email"
            />
          </div>

          <div className="text-xl mt-10 flex justify-end gap-3 font-semibold">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[#72cb72] text-white hover:bg-[#60af60]"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('portal-root') as HTMLElement,
  );
}
