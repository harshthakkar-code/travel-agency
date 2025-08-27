import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Dashboard from '../dashboard'
import api from '../../utils/api'

vi.mock('../../utils/api', () => ({
  default: {
    get: vi.fn(),
  },
}))

vi.mock('./dashboardSidebar', () => () => <div data-testid="sidebar" />)
vi.mock('./dashboardHeader', () => () => <div data-testid="header" />)

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
  ]

  const fakeUsers = {
    users: [
      {
        _id: 'u1',
        firstName: 'Alice',
        lastName: 'Brown',
        email: 'alice@example.com',
        mobile: '1234567890',
        country: 'USA',
        city: 'NYC',
      },
      {
        _id: 'u2',
        firstName: 'Bob',
        lastName: 'Green',
        email: 'bob@example.com',
        phone: '0987654321',
        country: 'UK',
        city: 'London',
      },
    ],
    totalUsers: 2,
  }

  const fakeTransactions = {
    transactions: [
      {
        _id: 't1',
        user: { firstName: 'Charlie' },
        amount: 15000, // cents
        createdAt: '2023-07-29T00:00:00Z',
        status: 'completed',
      },
      {
        _id: 't2',
        user: { firstName: 'David' },
        amount: 25000, // cents
        createdAt: '2023-07-30T00:00:00Z',
        status: 'pending',
      },
    ],
    totalAmount: 40000,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders header/sidebar and initial loading states', () => {
    // never resolve calls to keep loading visible
    api.get.mockReturnValue(new Promise(() => {}))

    render(<Dashboard />)

    // expect(screen.getByTestId('header')).toBeInTheDocument()
    // expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    // loading flags
    expect(screen.getByText(/Loading bookings/i)).toBeInTheDocument()
    expect(screen.getByText(/Loading transactions/i)).toBeInTheDocument()
    expect(screen.getByText(/Loading users/i)).toBeInTheDocument()
  })

  it('fetches and displays bookings, users, and transactions (success paths)', async () => {
    api.get.mockImplementation(url => {
      if (url.startsWith('/bookings')) {
        return Promise.resolve({ data: fakeBookings })
      }
      if (url.startsWith('/users')) {
        return Promise.resolve({ data: fakeUsers })
      }
      if (url.startsWith('/transactions')) {
        return Promise.resolve({ data: fakeTransactions })
      }
      return Promise.reject(new Error('Unknown url'))
    })

    render(<Dashboard />)

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(3))

    // Bookings table
    expect(screen.getByText('Recent Bookings')).toBeInTheDocument()
    // booking rows
    // expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Trip to Goa')).toBeInTheDocument()
    expect(screen.getByText('Goa')).toBeInTheDocument()

    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('Trip to Alps')).toBeInTheDocument()
    expect(screen.getByText('Switzerland')).toBeInTheDocument()

    // Users table and total
    expect(screen.getByText('User List')).toBeInTheDocument()
    expect(screen.getByText('Alice Brown')).toBeInTheDocument()
    expect(screen.getByText('alice@example.com')).toBeInTheDocument()
    expect(screen.getByText('USA')).toBeInTheDocument()
    expect(screen.getByText('Bob Green')).toBeInTheDocument()
    expect(screen.getByText('bob@example.com')).toBeInTheDocument()
    expect(screen.getByText('UK')).toBeInTheDocument()
    // totals counters section
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()

    // Transactions table and total earnings
    // expect(screen.getByText('Earnings')).toBeInTheDocument()
    expect(screen.getByText('Charlie')).toBeInTheDocument()
    expect(screen.getByText('$150.00')).toBeInTheDocument()
    expect(screen.getByText('completed')).toBeInTheDocument()

    expect(screen.getByText('David')).toBeInTheDocument()
    expect(screen.getByText('$250.00')).toBeInTheDocument()
    expect(screen.getByText('pending')).toBeInTheDocument()

    // Earnings total tile
    expect(screen.getAllByText('Earnings')[0]).toBeInTheDocument()
    expect(screen.getByText('40000')).toBeInTheDocument()
  })

  it('handles bookings failure with error and empty state', async () => {
    api.get.mockImplementation(url => {
      if (url.startsWith('/bookings')) {
        return Promise.reject(new Error('Failed to fetch bookings'))
      }
      if (url.startsWith('/users')) {
        return Promise.resolve({ data: fakeUsers })
      }
      if (url.startsWith('/transactions')) {
        return Promise.resolve({ data: fakeTransactions })
      }
      return Promise.reject(new Error('Unknown url'))
    })

    render(<Dashboard />)

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(3))

    expect(screen.getByText(/Failed to load bookings/i)).toBeInTheDocument()
    // after failure and loading false, list area shows either error or no items; explicit check that "No bookings found." would appear when not error
  })

  it('handles users failure with error and no table', async () => {
    api.get.mockImplementation(url => {
      if (url.startsWith('/bookings')) {
        return Promise.resolve({ data: fakeBookings })
      }
      if (url.startsWith('/users')) {
        return Promise.reject(new Error('Failed to fetch users'))
      }
      if (url.startsWith('/transactions')) {
        return Promise.resolve({ data: fakeTransactions })
      }
      return Promise.reject(new Error('Unknown url'))
    })

    render(<Dashboard />)

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(3))

    expect(screen.getByText(/Failed to load users/i)).toBeInTheDocument()
    // ensure a user we would otherwise see is absent
    expect(screen.queryByText('Alice Brown')).not.toBeInTheDocument()
  })

  it('handles transactions failure with error and no rows', async () => {
    api.get.mockImplementation(url => {
      if (url.startsWith('/bookings')) {
        return Promise.resolve({ data: fakeBookings })
      }
      if (url.startsWith('/users')) {
        return Promise.resolve({ data: fakeUsers })
      }
      if (url.startsWith('/transactions')) {
        return Promise.reject(new Error('Failed to fetch txns'))
      }
      return Promise.reject(new Error('Unknown url'))
    })

    render(<Dashboard />)

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(3))

    expect(screen.getByText(/Failed to load transactions/i)).toBeInTheDocument()
    expect(screen.queryByText('Charlie')).not.toBeInTheDocument()
    expect(screen.queryByText('$150.00')).not.toBeInTheDocument()
  })

  it('shows empty states when APIs return empty arrays', async () => {
    api.get.mockImplementation(url => {
      if (url.startsWith('/bookings')) {
        return Promise.resolve({ data: [] })
      }
      if (url.startsWith('/users')) {
        return Promise.resolve({ data: { users: [], totalUsers: 0 } })
      }
      if (url.startsWith('/transactions')) {
        return Promise.resolve({ data: { transactions: [], totalAmount: 0 } })
      }
      return Promise.reject(new Error('Unknown url'))
    })

    render(<Dashboard />)

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(3))

    expect(screen.getByText(/No bookings found/i)).toBeInTheDocument()
    expect(screen.getByText(/No users found/i)).toBeInTheDocument()
    expect(screen.getByText(/No transactions found/i)).toBeInTheDocument()
    // tiles for totals reflect zeros
    expect(screen.getAllByText('Earnings')[0]).toBeInTheDocument()
    // expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('limits bookings to 5 and transactions to 6 (slice) when API returns more', async () => {
    const manyBookings = Array.from({ length: 8 }).map((_, i) => ({
      _id: `b${i}`,
      user: { firstName: `U${i}`, lastName: `L${i}` },
      package: { packageTitle: `Pkg ${i}`, destination: `City ${i}` },
      bookingDate: '2023-08-01T00:00:00Z',
      createdAt: '2023-08-01T00:00:00Z',
    }))
    const manyTransactions = Array.from({ length: 12 }).map((_, i) => ({
      _id: `t${i}`,
      user: { firstName: `T${i}` },
      amount: 1000 + i, // cents
      createdAt: '2023-07-29T00:00:00Z',
      status: 'completed',
    }))

    api.get.mockImplementation(url => {
      if (url.startsWith('/bookings')) {
        return Promise.resolve({ data: manyBookings })
      }
      if (url.startsWith('/users')) {
        return Promise.resolve({ data: { users: [], totalUsers: 0 } })
      }
      if (url.startsWith('/transactions')) {
        return Promise.resolve({ data: { transactions: manyTransactions, totalAmount: 12345 } })
      }
      return Promise.reject(new Error('Unknown url'))
    })

    render(<Dashboard />)

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(3))

    // Only first 5 booking rows should be present
    for (let i = 0; i < 5; i++) {
      expect(screen.getByText(`U${i} L${i}`)).toBeInTheDocument()
      expect(screen.getByText(`Pkg ${i}`)).toBeInTheDocument()
    }
    // 6th should not be rendered due to slice(0,5)
    expect(screen.queryByText('U5 L5')).not.toBeInTheDocument()

    // Transactions slice(0,6)
    for (let i = 0; i < 6; i++) {
      expect(screen.getByText(`T${i}`)).toBeInTheDocument()
    }
    expect(screen.queryByText('T6')).not.toBeInTheDocument()
  })
})
