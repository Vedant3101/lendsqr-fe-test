import { Link } from 'react-router-dom';
import { Users } from '../Users/Users';
import './Dashboard.scss';

export const Dashboard = () => (
  <section className="dashboard-page">
    <div className="card dashboard-page__hero">
      <h2>Dashboard</h2>
      <p>
        This admin view shows lender customers, account status, and user details. The users table below pulls from the mock API data and keeps selected user details in localStorage.
      </p>
      <Link className="dashboard-page__link" to="/users">
        Open Users
      </Link>
    </div>
    <Users />
  </section>
);
