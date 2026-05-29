import { useEffect, useMemo, useState } from 'react';
import { HandCoins, PiggyBank, UserRoundCheck, Users as UsersIcon } from 'lucide-react';
import { StatCard } from '../../components/StatCard/StatCard';
import { UserTable } from '../../components/UserTable/UserTable';
import { getUsers } from '../../services/userService';
import type { User } from '../../types/user';
import './Users.scss';

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getUsers()
      .then(result => {
        if (isMounted) setUsers(result);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const activeUsers = useMemo(() => users.filter(user => user.status === 'Active').length, [users]);

  return (
    <section className="users-page">
      <h1 className="page-title">Users</h1>
      <div className="users-page__stats">
        <StatCard icon={<UsersIcon size={20} />} label="Users" tone="purple" value={users.length.toLocaleString()} />
        <StatCard icon={<UserRoundCheck size={20} />} label="Active Users" tone="blue" value={activeUsers.toLocaleString()} />
        <StatCard icon={<HandCoins size={20} />} label="Users with Loans" tone="orange" value="12,453" />
        <StatCard icon={<PiggyBank size={20} />} label="Users with Savings" tone="pink" value="102,453" />
      </div>
      {isLoading ? <div className="card users-page__loading">Loading users...</div> : <UserTable users={users} />}
    </section>
  );
};
