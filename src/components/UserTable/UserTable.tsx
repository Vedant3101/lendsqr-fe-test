import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Filter, MoreVertical, UserCheck, UserX } from 'lucide-react';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import { FilterPanel, UserFilters, defaultFilters } from '../FilterPanel/FilterPanel';
import { formatDate } from '../../utils/format';
import { saveSelectedUser } from '../../utils/storage';
import type { User } from '../../types/user';
import './UserTable.scss';

interface UserTableProps {
  users: User[];
}

const pageSizeOptions = [10, 20, 50, 100];

const matchesFilters = (user: User, filters: UserFilters) => {
  const username = user.username.toLowerCase();
  const email = user.email.toLowerCase();
  return (
    (!filters.organization || user.organization === filters.organization) &&
    (!filters.username || username.includes(filters.username.toLowerCase())) &&
    (!filters.email || email.includes(filters.email.toLowerCase())) &&
    (!filters.status || user.status === filters.status)
  );
};

export const UserTable = ({ users }: UserTableProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<UserFilters>(defaultFilters);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const organizations = useMemo(() => Array.from(new Set(users.map(user => user.organization))).sort(), [users]);
  const filteredUsers = useMemo(() => users.filter(user => matchesFilters(user, filters)), [users, filters]);
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginatedUsers = filteredUsers.slice((safePage - 1) * pageSize, safePage * pageSize);

  const resetFilters = () => {
    setFilters(defaultFilters);
    setPage(1);
    setIsFilterOpen(false);
  };

  return (
    <section className="card users-table-card" aria-label="Users table">
      {isFilterOpen && (
        <FilterPanel
          filters={filters}
          organizations={organizations}
          onChange={nextFilters => {
            setFilters(nextFilters);
            setPage(1);
          }}
          onClose={() => setIsFilterOpen(false)}
          onReset={resetFilters}
        />
      )}
      <div className="users-table-wrap">
        <table className="users-table">
          <thead>
            <tr>
              <th>
                <button type="button" onClick={() => setIsFilterOpen(value => !value)}>
                  Organization <Filter size={14} />
                </button>
              </th>
              <th>
                <button type="button" onClick={() => setIsFilterOpen(value => !value)}>
                  Username <Filter size={14} />
                </button>
              </th>
              <th>
                <button type="button" onClick={() => setIsFilterOpen(value => !value)}>
                  Email <Filter size={14} />
                </button>
              </th>
              <th>Phone Number</th>
              <th>Date Joined</th>
              <th>Status</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map(user => (
              <tr key={user.id}>
                <td>{user.organization}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{formatDate(user.dateJoined)}</td>
                <td>
                  <StatusBadge status={user.status} />
                </td>
                <td className="users-table__actions-cell">
                  <button
                    aria-label={`Open actions for ${user.username}`}
                    className="users-table__menu-button"
                    type="button"
                    onClick={() => setActiveMenu(activeMenu === user.id ? null : user.id)}
                  >
                    <MoreVertical size={18} />
                  </button>
                  {activeMenu === user.id && (
                    <div className="users-table__menu">
                      <Link to={`/users/${user.id}`} onClick={() => saveSelectedUser(user)}>
                        <Eye size={16} /> View Details
                      </Link>
                      <button type="button">
                        <UserX size={16} /> Blacklist User
                      </button>
                      <button type="button">
                        <UserCheck size={16} /> Activate User
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {paginatedUsers.length === 0 && (
              <tr>
                <td colSpan={7}>No users match your filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="users-pagination">
        <label className="users-pagination__select">
          Showing
          <select
            value={pageSize}
            onChange={event => {
              setPageSize(Number(event.target.value));
              setPage(1);
            }}
          >
            {pageSizeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          out of {filteredUsers.length}
        </label>
        <div className="users-pagination__buttons" aria-label="Pagination">
          <button className="users-pagination__arrow" disabled={safePage === 1} type="button" onClick={() => setPage(safePage - 1)}>
            ‹
          </button>
          {[1, 2, 3].filter(item => item <= totalPages).map(item => (
            <button key={item} type="button" onClick={() => setPage(item)}>
              {item}
            </button>
          ))}
          {totalPages > 4 && <span>...</span>}
          {totalPages > 3 && (
            <button type="button" onClick={() => setPage(totalPages)}>
              {totalPages}
            </button>
          )}
          <button
            className="users-pagination__arrow"
            disabled={safePage === totalPages}
            type="button"
            onClick={() => setPage(safePage + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};
