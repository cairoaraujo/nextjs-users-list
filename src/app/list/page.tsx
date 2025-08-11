/* eslint-disable @next/next/no-img-element */
'use client';

import Loading from '@/components/Loading';
import { ModalCreateUser } from '@/components/ModalCreateUser';
import { ModalDeleteUser } from '@/components/ModalDeleteUser';
import { ModalUpdateUser } from '@/components/ModalUpdateUser';
import { deleteUser, getUsers, updateUser, createUser } from '@/services/users';
import { User } from '@/types/user';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export default function Page() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const createMutation = useMutation<any, Error, Partial<User>>({
    mutationFn: (userData: Partial<User>) => createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsCreateModalOpen(false);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    },
  });
  const updateMutation = useMutation<
    any,
    Error,
    { id: number; data: Partial<User> }
  >({
    mutationFn: ({ id, data }: { id: number; data: Partial<User> }) =>
      updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsUpdateModalOpen(false);
      setSelectedUser(null);
    },
  });

  function handleCreateUser(data: Partial<User>) {
    createMutation.mutate(data);
  }

  function handleUpdateUser(data: Partial<User>) {
    if (selectedUser) {
      updateMutation.mutate({ id: selectedUser.id, data });
    }
  }

  const sortedUsers = (data ?? []).slice().sort((a, b) => {
    const updatedA = new Date(a.updatedAt).getTime();
    const updatedB = new Date(b.updatedAt).getTime();

    if (updatedB !== updatedA) return updatedB - updatedA;

    const createdA = new Date(a.createdAt).getTime();
    const createdB = new Date(b.createdAt).getTime();

    return createdB - createdA;
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-4xl">Users</h1>

        <button
          className="bg-blue-500 py-2 rounded-md text-white px-5"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add new
        </button>
      </div>

      <table className="min-w-full border-collapse border border-gray-300 text-left">
        <thead className="bg-blue-100">
          <tr className="text-gray-700 text-lg">
            <th className=" px-4 py-2">Name</th>
            <th className=" px-4 py-2">Email</th>
            <th className=" px-4 py-2">Created at</th>
            <th className=" px-4 py-2">Updated at</th>
            <th className=" px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user: User) => (
            <tr key={user.id} className="hover:bg-gray-50 text-lg">
              <td className=" px-4 py-2">{user.name}</td>
              <td className=" px-4 py-2">{user.email}</td>
              <td className=" px-4 py-2">
                {new Date(user.createdAt).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td className=" px-4 py-2">
                {new Date(user.updatedAt).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td className=" px-4 py-2 text-center">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setIsUpdateModalOpen(true);
                    }}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-green-400 hover:bg-green-500"
                  >
                    <img
                      src="/icons/editIcon.svg"
                      alt="Editar"
                      className="w-6 h-6"
                    />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setIsDeleteModalOpen(true);
                    }}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-red-400 hover:bg-red-500"
                  >
                    <img
                      src="/icons/deleteIcon.svg"
                      alt="Excluir"
                      className="w-7 h-7"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalCreateUser
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateUser}
      />
      <ModalDeleteUser
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => selectedUser && deleteMutation.mutate(selectedUser.id)}
        userName={selectedUser?.name}
      />
      <ModalUpdateUser
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdateUser}
        userName={selectedUser?.name}
        email={selectedUser?.email}
      />
    </div>
  );
}
