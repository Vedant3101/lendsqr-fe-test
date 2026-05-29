import type { UserStatus } from '../../types/user';
import './StatusBadge.scss';

export const StatusBadge = ({ status }: { status: UserStatus }) => (
  <span className={`status-badge status-badge--${status.toLowerCase()}`}>{status}</span>
);
