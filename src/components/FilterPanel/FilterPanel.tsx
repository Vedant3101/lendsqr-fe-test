import type { UserStatus } from '../../types/user';
import './FilterPanel.scss';

export interface UserFilters {
  organization: string;
  username: string;
  email: string;
  status: UserStatus | '';
}

interface FilterPanelProps {
  filters: UserFilters;
  organizations: string[];
  onChange: (filters: UserFilters) => void;
  onReset: () => void;
  onClose: () => void;
}

export const defaultFilters: UserFilters = {
  organization: '',
  username: '',
  email: '',
  status: ''
};

export const FilterPanel = ({ filters, organizations, onChange, onReset, onClose }: FilterPanelProps) => {
  const updateFilter = (key: keyof UserFilters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <form
      className="filter-panel"
      onSubmit={event => {
        event.preventDefault();
        onClose();
      }}
    >
      <label htmlFor="organization">Organization</label>
      <select
        id="organization"
        value={filters.organization}
        onChange={event => updateFilter('organization', event.target.value)}
      >
        <option value="">Select</option>
        {organizations.map(org => (
          <option key={org} value={org}>
            {org}
          </option>
        ))}
      </select>

      <label htmlFor="username">Username</label>
      <input
        id="username"
        placeholder="User"
        value={filters.username}
        onChange={event => updateFilter('username', event.target.value)}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        placeholder="Email"
        type="email"
        value={filters.email}
        onChange={event => updateFilter('email', event.target.value)}
      />

      <label htmlFor="status">Status</label>
      <select id="status" value={filters.status} onChange={event => updateFilter('status', event.target.value)}>
        <option value="">Select</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Pending">Pending</option>
        <option value="Blacklisted">Blacklisted</option>
      </select>

      <div className="filter-panel__actions">
        <button className="filter-panel__reset" type="button" onClick={onReset}>
          Reset
        </button>
        <button className="filter-panel__filter" type="submit">
          Filter
        </button>
      </div>
    </form>
  );
};
