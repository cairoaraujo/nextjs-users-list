export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export const ENDPOINTS = {
  USERS: `${API_BASE_URL}/users`,
  POSTS: `${API_BASE_URL}/posts`,
};