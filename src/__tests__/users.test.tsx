import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Users } from '../pages/Users/Users';
import { AppLayout } from '../components/Layout/AppLayout';

describe('Users page', () => {
  it('loads users from mock API data', async () => {
    render(
      <MemoryRouter>
        <AppLayout>
          <Users />
        </AppLayout>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading users/i)).toBeInTheDocument();
    expect(await screen.findByText('Adejej')).toBeInTheDocument();
    expect(screen.getByText('adeej@lendsqr.com')).toBeInTheDocument();
  });

  it('opens the filter panel and supports a negative filter result', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    await screen.findByText('Adejej');
    await user.click(screen.getByRole('button', { name: /Organization/i }));
    expect(screen.getByLabelText('Organization')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Username'), 'not-a-real-user-name');
    await waitFor(() => expect(screen.getByText(/No users match/i)).toBeInTheDocument());
  });
});
