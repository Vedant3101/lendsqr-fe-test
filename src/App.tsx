import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/Layout/AppLayout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Login } from './pages/Login/Login';
import { UserDetails } from './pages/UserDetails/UserDetails';
import { Users } from './pages/Users/Users';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => <AppLayout>{children}</AppLayout>;

export const App = () => (
  <Routes>
    <Route element={<Login />} path="/" />
    <Route
      element={
        <ProtectedLayout>
          <Dashboard />
        </ProtectedLayout>
      }
      path="/dashboard"
    />
    <Route
      element={
        <ProtectedLayout>
          <Users />
        </ProtectedLayout>
      }
      path="/users"
    />
    <Route
      element={
        <ProtectedLayout>
          <UserDetails />
        </ProtectedLayout>
      }
      path="/users/:id"
    />
    <Route element={<Navigate replace to="/dashboard" />} path="*" />
  </Routes>
);
