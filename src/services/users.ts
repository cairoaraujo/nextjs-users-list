import { ENDPOINTS } from '@/lib/api';
import { User } from '@/types/user';

export async function createUser(userData: Partial<User>) {
  const res = await fetch(ENDPOINTS.USERS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error('Error on create user');
  return res.json();
}
export async function getUsers(): Promise<User[]> {
  const res = await fetch(ENDPOINTS.USERS);
  if (!res.ok) throw new Error('Error fetching users');
  return res.json();
}
export async function deleteUser(id: number) {
  const res = await fetch(`${ENDPOINTS.USERS}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error on delete user');
  return res.json();
}
export async function updateUser(id: number, userData: Partial<User>) {
  const res = await fetch(`${ENDPOINTS.USERS}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error('Error on update user');
  return res.json();
}
