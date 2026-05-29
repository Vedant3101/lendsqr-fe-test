import { PropsWithChildren, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Bell,
  Briefcase,
  Building2,
  ChevronDown,
  ClipboardList,
  Coins,
  Gauge,
  HandCoins,
  Landmark,
  Menu,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  UserCheck,
  Users,
  WalletCards,
  X
} from 'lucide-react';
import logo from '../../assets/logo.svg';
import './Layout.scss';

interface SidebarItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const customerLinks: SidebarItem[] = [
  { label: 'Users', path: '/users', icon: <Users size={16} /> },
  { label: 'Guarantors', path: '/guarantors', icon: <UserCheck size={16} /> },
  { label: 'Loans', path: '/loans', icon: <HandCoins size={16} /> },
  { label: 'Decision Models', path: '/decision-models', icon: <SlidersHorizontal size={16} /> },
  { label: 'Savings', path: '/savings', icon: <WalletCards size={16} /> },
  { label: 'Loan Requests', path: '/loan-requests', icon: <Coins size={16} /> },
  { label: 'Whitelist', path: '/whitelist', icon: <ShieldCheck size={16} /> },
  { label: 'Karma', path: '/karma', icon: <ClipboardList size={16} /> }
];

const businessLinks: SidebarItem[] = [
  { label: 'Organization', path: '/organization', icon: <Building2 size={16} /> },
  { label: 'Loan Products', path: '/loan-products', icon: <Landmark size={16} /> },
  { label: 'Savings Products', path: '/savings-products', icon: <WalletCards size={16} /> },
  { label: 'Fees and Charges', path: '/fees', icon: <Coins size={16} /> }
];

const SidebarLink = ({ item }: { item: SidebarItem }) => (
  <NavLink
    className={({ isActive }) => `sidebar__item${isActive ? ' sidebar__item--active' : ''}`}
    to={item.path}
  >
    {item.icon}
    <span>{item.label}</span>
  </NavLink>
);

export const AppLayout = ({ children }: PropsWithChildren) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <header className="topbar">
        <button
          aria-label="Toggle navigation"
          className="topbar__menu"
          type="button"
          onClick={() => setIsSidebarOpen(value => !value)}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <NavLink className="topbar__logo" to="/dashboard">
          <img alt="lendsqr" src={logo} />
        </NavLink>
        <form className="topbar__search" role="search">
          <input aria-label="Search" placeholder="Search for anything" />
          <button aria-label="Submit search" type="submit">
            <Search size={16} />
          </button>
        </form>
        <div className="topbar__right">
          <a className="topbar__docs" href="https://docs.lendsqr.com" rel="noreferrer" target="_blank">
            Docs
          </a>
          <Bell className="topbar__bell" size={22} />
          <div className="topbar__user">
            <span className="topbar__avatar">A</span>
            <span>Adeji</span>
            <ChevronDown size={15} />
          </div>
        </div>
      </header>

      <aside className={`sidebar${isSidebarOpen ? ' sidebar--open' : ''}`}>
        <button className="sidebar__switch" type="button">
          <Briefcase size={16} />
          Switch Organization
          <ChevronDown size={16} />
        </button>
        <NavLink className="sidebar__item" to="/dashboard">
          <Gauge size={16} />
          <span>Dashboard</span>
        </NavLink>
        <p className="sidebar__section">Customers</p>
        {customerLinks.map(item => (
          <SidebarLink item={item} key={item.label} />
        ))}
        <p className="sidebar__section">Businesses</p>
        {businessLinks.map(item => (
          <SidebarLink item={item} key={item.label} />
        ))}
      </aside>

      <main className="main-content">{children}</main>
    </div>
  );
};
