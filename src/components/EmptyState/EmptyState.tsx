import { Link } from 'react-router-dom';
import './EmptyState.scss';

export const EmptyState = ({ title, description }: { title: string; description: string }) => (
  <section className="card empty-state">
    <h2>{title}</h2>
    <p>{description}</p>
    <Link to="/users">Back to users</Link>
  </section>
);
