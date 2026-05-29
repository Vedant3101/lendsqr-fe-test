import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, UserRound } from 'lucide-react';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { getUserById } from '../../services/userService';
import { getSelectedUser, saveSelectedUser } from '../../utils/storage';
import type { User } from '../../types/user';
import './UserDetails.scss';

const tabs = ['General Details', 'Documents', 'Bank Details', 'Loans', 'Savings', 'App and System'];

const DetailItem = ({ label, value }: { label: string; value?: string }) => (
  <div className="user-details__item">
    <p>{label}</p>
    <strong>{value || 'Not Provided'}</strong>
  </div>
);

const DetailSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="user-details__section">
    <h3>{title}</h3>
    <div className="user-details__grid">{children}</div>
  </section>
);

export const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [user, setUser] = useState<User | null>(() => {
    const selected = getSelectedUser();
    return selected?.id === id ? selected : null;
  });
  const [isLoading, setIsLoading] = useState(!user);

  useEffect(() => {
    if (!id || user?.id === id) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    getUserById(id)
      .then(foundUser => {
        if (isMounted && foundUser) {
          setUser(foundUser);
          saveSelectedUser(foundUser);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id, user?.id]);

  if (isLoading) {
    return <div className="card user-details__placeholder">Loading user details...</div>;
  }

  if (!user) {
    return <EmptyState title="User not found" description="The user details could not be loaded from the mock API or localStorage." />;
  }

  return (
    <section className="user-details">
      <button className="user-details__back" type="button" onClick={() => navigate('/users')}>
        <ArrowLeft size={18} /> Back to Users
      </button>

      <div className="user-details__title-row">
        <h1 className="page-title">User Details</h1>
        <div className="user-details__actions">
          <button className="danger-outline-button" type="button">
            Blacklist User
          </button>
          <button className="outline-button" type="button">
            Activate User
          </button>
        </div>
      </div>

      <article className="card user-details__summary">
        <div className="user-details__profile-row">
          <div className="user-details__avatar" style={{ backgroundColor: `${user.profile.avatarColor}22` }}>
            <UserRound size={42} />
          </div>
          <div className="user-details__name">
            <h2>{user.profile.fullName}</h2>
            <p>LSQF{user.profile.bvn}</p>
          </div>
          <div className="user-details__tier">
            <p>User's Tier</p>
            <div className="user-details__stars">{'★'.repeat(user.tier)}{'☆'.repeat(3 - user.tier)}</div>
          </div>
          <div className="user-details__balance">
            <h3>{user.accountBalance}</h3>
            <p>{user.profile.bvn}/{user.bank}</p>
          </div>
        </div>
        <nav className="user-details__tabs" aria-label="User detail tabs">
          {tabs.map(tab => (
            <button className={activeTab === tab ? 'active' : ''} key={tab} type="button" onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </nav>
      </article>

      {activeTab === 'General Details' ? (
        <article className="card user-details__info-card">
          <DetailSection title="Personal Information">
            <DetailItem label="Full Name" value={user.profile.fullName} />
            <DetailItem label="Phone Number" value={user.phoneNumber} />
            <DetailItem label="Email Address" value={user.email} />
            <DetailItem label="BVN" value={user.profile.bvn} />
            <DetailItem label="Gender" value={user.profile.gender} />
            <DetailItem label="Marital Status" value={user.profile.maritalStatus} />
            <DetailItem label="Children" value={user.profile.children} />
            <DetailItem label="Type of Residence" value={user.profile.typeOfResidence} />
          </DetailSection>

          <DetailSection title="Education and Employment">
            <DetailItem label="Level of Education" value={user.education.level} />
            <DetailItem label="Employment Status" value={user.education.employmentStatus} />
            <DetailItem label="Sector of Employment" value={user.education.sector} />
            <DetailItem label="Duration of Employment" value={user.education.durationOfEmployment} />
            <DetailItem label="Office Email" value={user.education.officeEmail} />
            <DetailItem label="Monthly Income" value={user.education.monthlyIncome.join(' - ')} />
            <DetailItem label="Loan Repayment" value={user.education.loanRepayment} />
          </DetailSection>

          <DetailSection title="Socials">
            <DetailItem label="Twitter" value={user.socials.twitter} />
            <DetailItem label="Facebook" value={user.socials.facebook} />
            <DetailItem label="Instagram" value={user.socials.instagram} />
          </DetailSection>

          <DetailSection title="Guarantor">
            <DetailItem label="Full Name" value={user.guarantor.fullName} />
            <DetailItem label="Phone Number" value={user.guarantor.phoneNumber} />
            <DetailItem label="Email Address" value={user.guarantor.email} />
            <DetailItem label="Relationship" value={user.guarantor.relationship} />
          </DetailSection>
        </article>
      ) : (
        <article className="card user-details__placeholder">
          <p>{activeTab} information is ready for extension.</p>
          <Link to="/users">Return to users list</Link>
        </article>
      )}
    </section>
  );
};
