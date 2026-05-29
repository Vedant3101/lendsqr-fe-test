import './StatCard.scss';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  tone: 'purple' | 'blue' | 'orange' | 'pink';
}

const toneMap = {
  purple: { background: 'rgba(223, 24, 255, 0.1)', color: '#df18ff' },
  blue: { background: 'rgba(87, 24, 255, 0.1)', color: '#5718ff' },
  orange: { background: 'rgba(245, 95, 68, 0.1)', color: '#f55f44' },
  pink: { background: 'rgba(255, 51, 102, 0.1)', color: '#ff3366' }
};

export const StatCard = ({ icon, label, value, tone }: StatCardProps) => (
  <article className="card stat-card">
    <div className="stat-card__icon" style={toneMap[tone]}>
      {icon}
    </div>
    <p className="stat-card__label">{label}</p>
    <p className="stat-card__value">{value}</p>
  </article>
);
