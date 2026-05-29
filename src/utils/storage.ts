import type { User } from '../types/user';

const SELECTED_USER_KEY = 'lendsqr-selected-user';

export const saveSelectedUser = (user: User): void => {
  localStorage.setItem(SELECTED_USER_KEY, JSON.stringify(user));
};

export const getSelectedUser = (): User | null => {
  const item = localStorage.getItem(SELECTED_USER_KEY);
  if (!item) return null;

  try {
    return JSON.parse(item) as User;
  } catch {
    localStorage.removeItem(SELECTED_USER_KEY);
    return null;
  }
};

export const clearSelectedUser = (): void => {
  localStorage.removeItem(SELECTED_USER_KEY);
};
