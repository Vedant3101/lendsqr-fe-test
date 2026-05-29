import usersData from '../data/users.json';
import type { User } from '../types/user';

const users = usersData as User[];

const wait = (ms = 250): Promise<void> => new Promise(resolve => window.setTimeout(resolve, ms));

export const getUsers = async (): Promise<User[]> => {
  await wait(150);
  return users;
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  await wait(100);
  return users.find(user => user.id === id);
};

export const getUserStats = async () => {
  const list = await getUsers();
  return {
    users: list.length,
    activeUsers: list.filter(user => user.status === 'Active').length,
    usersWithLoans: 12453,
    usersWithSavings: 102453
  };
};
