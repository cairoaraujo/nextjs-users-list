/* eslint-disable @next/next/no-img-element */
'use client';

import Loading from '@/components/Loading';
import { getUsers } from '@/services/users';
import { User } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

export default function Page() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isLoading) return <Loading/>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <h1 className="text-4xl mb-6">Users</h1>

      <table className="min-w-full border-collapse border border-gray-300 text-left">
        <thead className="bg-blue-100">
          <tr className='text-gray-700 text-lg'>
            <th className=" px-4 py-2">Name</th>
            <th className=" px-4 py-2">Email</th>
            <th className=" px-4 py-2">Created at</th>
            <th className=" px-4 py-2">Updated at</th>
            <th className=" px-4 py-2 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {(data ?? []).map((user: User) => (
            <tr key={user.id} className="hover:bg-gray-50 text-lg">
              <td className=" px-4 py-2">{user.name}</td>
              <td className=" px-4 py-2">{user.email}</td>
              <td className=" px-4 py-2">
                {new Date(user.createdAt).toLocaleDateString('pt-BR')}
              </td>
              <td className=" px-4 py-2">
                {new Date(user.createdAt).toLocaleDateString('pt-BR')}
              </td>
              <td className=" px-4 py-2 text-center">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => console.log('editar', user.id)}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600"
                  >
                    <img
                      src="/icons/editIcon.svg"
                      alt="Editar"
                      className="w-6 h-6"
                    />
                  </button>

                  <button
                    onClick={() => console.log('excluir', user.id)}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700"
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
    </div>
  );
}