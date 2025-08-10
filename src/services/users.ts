import { ENDPOINTS } from "@/lib/api";
import { User } from "@/types/user";

export async function getUsers(): Promise<User[]> {
  const res = await fetch(ENDPOINTS.USERS);
  if (!res.ok) throw new Error('Error fetching users');
  return res.json();
}