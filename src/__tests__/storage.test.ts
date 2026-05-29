import { describe, expect, it } from 'vitest';
import users from '../data/users.json';
import { clearSelectedUser, getSelectedUser, saveSelectedUser } from '../utils/storage';
import type { User } from '../types/user';

describe('selected user storage', () => {
  it('stores, reads, and clears selected user details in localStorage', () => {
    const user = (users as User[])[0];

    saveSelectedUser(user);
    expect(getSelectedUser()?.id).toBe(user.id);

    clearSelectedUser();
    expect(getSelectedUser()).toBeNull();
  });
});
