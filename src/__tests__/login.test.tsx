import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Login } from '../pages/Login/Login';

const TestDashboard = () => <div>Dashboard loaded</div>;

describe('Login page', () => {
  it('renders the login form and toggles password visibility', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    const password = screen.getByPlaceholderText('Password');
    expect(password).toHaveAttribute('type', 'password');

    await user.click(screen.getByRole('button', { name: /show/i }));
    expect(password).toHaveAttribute('type', 'text');
  });

  it('navigates to dashboard after login', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<TestDashboard />} path="/dashboard" />
        </Routes>
      </MemoryRouter>
    );

    await user.type(screen.getByPlaceholderText('Email'), 'candidate@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: /log in/i }));

    expect(await screen.findByText('Dashboard loaded')).toBeInTheDocument();
  });
});
