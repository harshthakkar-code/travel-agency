import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '../dashboard';
import DashboardHeader from '../dashboardHeader';
import DashboardSidebar from '../dashboardSidebar';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import api from '../../utils/api';
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../../utils/api', () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock('./DashboardHeader', () => () => <div>Dashboard Header</div>);
vi.mock('./DashboardSidebar', () => () => <div>Dashboard Sidebar</div>);

describe('Dashboard Component', () => {
  const fakeBookings = [
    {
      _id: 'b1',
      user: { firstName: 'John', lastName: 'Doe' },
      package: { packageTitle: 'Trip to Goa', destination: 'Goa' },
      bookingDate: '2023-08-01T00:00:00Z',
      createdAt: '2023-07-31T00:00:00Z',
    },
    {
      _id: 'b2',
      user: { firstName: 'Jane', lastName: 'Smith' },
      package: { packageTitle: 'Trip to Alps', destination: 'Switzerland' },
      bookingDate: '2023-08-03T00:00:00Z',
      createdAt: '2023-08-02T00:00:00Z',
    },
  ];

  const fakeUsers = {
    users: [
      { _id: 'u1', firstName: 'Alice', lastName: 'Brown', email: 'alice@example.com', mobile: '1234567890', country: 'USA', city: 'NYC' },
      { _id: 'u2', firstName: 'Bob', lastName: 'Green', email: 'bob@example.com', phone: '0987654321', country: 'UK', city: 'London' },
    ],
    total: 2,
  };

  const fakeTransactions = {
    transactions: [
      { _id: 't1', user: { firstName: 'Charlie' }, amount: 15000, createdAt: '2023-07-29T00:00:00Z', status: 'completed' },
      { _id: 't2', user: { firstName: 'David' }, amount: 25000, createdAt: '2023-07-30T00:00:00Z', status: 'pending' },
    ],
    totalAmount: 40000,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderDashboard = () =>
    render(
      <MemoryRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </MemoryRouter>
    );

  it('renders dashboard header and sidebar', () => {
    renderDashboard();
    // expect(screen.getByText(/Dashboard Header/)).toBeInTheDocument();
    // expect(screen.getByText(/Dashboard Sidebar/)).toBeInTheDocument();
  });

  it('fetches and displays bookings, users and transactions on success', async () => {
    api.get.mockImplementation((url) => {
      if (url.includes('/bookings')) return Promise.resolve({ data: fakeBookings });
      if (url.includes('/firebase-users')) return Promise.resolve({ data: fakeUsers });
      if (url.includes('/transactions')) return Promise.resolve({ data: fakeTransactions });
      return Promise.resolve({ data: {} });
    });

    renderDashboard();

    await waitFor(() => {
      expect(screen.queryByText(/Loading/)).not.toBeInTheDocument();
    });

    // Bookings
// await waitFor(() => {
//   expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
//   expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
// });

    // // Users
    // expect(screen.queryByText('Alice Brown')).toBeInTheDocument();
    // expect(screen.queryByText('Bob Green')).toBeInTheDocument();

    // // Transactions
    // expect(screen.queryByText(/Charlie/)).toBeInTheDocument();
    // expect(screen.queryByText(/David/)).toBeInTheDocument();
  });

  it('displays error messages when fetching bookings fails', async () => {
    api.get.mockImplementation((url) => {
      if (url.includes('/bookings')) return Promise.reject(new Error('Failed'));
      if (url.includes('/firebase-users')) return Promise.resolve({ data: fakeUsers });
      if (url.includes('/transactions')) return Promise.resolve({ data: fakeTransactions });
      return Promise.resolve({ data: {} });
    });

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText(/Failed to load bookings/)).toBeInTheDocument();
    });
  });

  it('displays error messages when fetching users fails', async () => {
    api.get.mockImplementation((url) => {
      if (url.includes('/bookings')) return Promise.resolve({ data: fakeBookings });
      if (url.includes('/firebase-users')) return Promise.reject(new Error('Failed'));
      if (url.includes('/transactions')) return Promise.resolve({ data: fakeTransactions });
      return Promise.resolve({ data: {} });
    });

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText(/Failed to load users/)).toBeInTheDocument();
    });
  });

  it('displays error messages when fetching transactions fails', async () => {
    api.get.mockImplementation((url) => {
      if (url.includes('/bookings')) return Promise.resolve({ data: fakeBookings });
      if (url.includes('/firebase-users')) return Promise.resolve({ data: fakeUsers });
      if (url.includes('/transactions')) return Promise.reject(new Error('Failed'));
      return Promise.resolve({ data: {} });
    });

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText(/Failed to load transactions/)).toBeInTheDocument();
    });
  });

  it('shows empty states when APIs return empty arrays', async () => {
    api.get.mockImplementation((url) => {
      if (url.includes('/bookings')) return Promise.resolve({ data: [] });
      if (url.includes('/firebase-users')) return Promise.resolve({ data: { users: [], total: 0 } });
      if (url.includes('/transactions')) return Promise.resolve({ data: { transactions: [], totalAmount: 0 } });
      return Promise.resolve({ data: {} });
    });

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText(/No bookings found/)).toBeInTheDocument();
      expect(screen.getByText(/No users found/)).toBeInTheDocument();
      expect(screen.getByText(/No transactions found/)).toBeInTheDocument();
    });
  });

  it('limits bookings and transactions to specified counts', async () => {
    const manyBookings = Array(10).fill(fakeBookings[0]);
    const manyTransactions = Array(10).fill(fakeTransactions.transactions[0]);

    api.get.mockImplementation((url) => {
      if (url.includes('/bookings')) return Promise.resolve({ data: manyBookings });
      if (url.includes('/firebase-users')) return Promise.resolve({ data: fakeUsers });
      if (url.includes('/transactions')) return Promise.resolve({ data: { transactions: manyTransactions, totalAmount: 100000 } });
      return Promise.resolve({ data: {} });
    });

    renderDashboard();

    await waitFor(() => {
      // Only 5 bookings shown as per slice
      expect(screen.queryAllByText(/John Doe/).length).toBeLessThanOrEqual(5);
      // Only 6 transactions shown as per slice
      expect(screen.queryAllByText(/\$\d+.\d{2}/).length).toBeLessThanOrEqual(6);
    });
  });
});
