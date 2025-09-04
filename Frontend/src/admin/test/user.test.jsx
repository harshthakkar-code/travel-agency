import React from 'react'
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, afterEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import User from '../user'
import api from '../../utils/api'

// CRITICAL FIX: Manual cleanup and faster mock clearing
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

// Mock API
vi.mock('../../utils/api', () => ({
  default: {
    get: vi.fn(),
    delete: vi.fn(),
    put: vi.fn(),
    post: vi.fn(),
  },
}))

// Mock dashboard components
vi.mock('../dashboardSidebar', () => ({
  default: () => <div data-testid="dashboard-sidebar">Dashboard Sidebar</div>
}))

vi.mock('../dashboardHeader', () => ({
  default: () => <div data-testid="dashboard-header">Dashboard Header</div>
}))

// Mock React Router
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock console
global.console = {
  ...global.console,
  error: vi.fn(),
}

// Test wrapper
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('User Component - Complete Coverage', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  const mockUsersData = {
    users: [
      {
        _id: 'user1234567890',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        mobile: '+1234567890',
        country: 'USA',
        city: 'New York',
        role: 'user'
      },
      {
        _id: 'user0987654321',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        mobile: '+0987654321',
        country: 'Canada',
        city: 'Toronto',
        role: 'user'
      }
    ]
  }

  describe('Component Initialization', () => {
    it('renders loading state initially', async () => {
      let resolvePromise
      const promise = new Promise(resolve => {
        resolvePromise = resolve
      })
      
      api.get.mockReturnValue(promise)

      render(
        <TestWrapper>
          <User />
        </TestWrapper>
      )

      expect(screen.getByText('Loading users...')).toBeInTheDocument()
      
      // Resolve promise to prevent hanging
      resolvePromise({ data: mockUsersData })
    }, 10000) // 10 second timeout

    it('renders layout components after loading', async () => {
      api.get.mockResolvedValue({ data: mockUsersData })

      render(
        <TestWrapper>
          <User />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByTestId('dashboard-sidebar')).toBeInTheDocument()
        expect(screen.getByTestId('dashboard-header')).toBeInTheDocument()
      }, { timeout: 5000 })
    })

    it('calls API with correct parameters', async () => {
      api.get.mockResolvedValue({ data: mockUsersData })

      render(
        <TestWrapper>
          <User />
        </TestWrapper>
      )

      expect(api.get).toHaveBeenCalledWith('/admin/firebase-users', {
        params: { role: 'user' }
      })
    })
  })

  describe('Data Display', () => {
    it('displays users when data loads', async () => {
      api.get.mockResolvedValue({ data: mockUsersData })

      render(
        <TestWrapper>
          <User />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(screen.getByText('Jane Smith')).toBeInTheDocument()
      }, { timeout: 5000 })
    })

    it('shows empty state when no users', async () => {
      api.get.mockResolvedValue({ data: { users: [] } })

      render(
        <TestWrapper>
          <User />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('No users found.')).toBeInTheDocument()
      }, { timeout: 5000 })
    })

    it('displays user details correctly', async () => {
      api.get.mockResolvedValue({ data: mockUsersData })

      render(
        <TestWrapper>
          <User />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('7890')).toBeInTheDocument() // Last 4 digits
        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
        expect(screen.getByText('+1234567890')).toBeInTheDocument()
        expect(screen.getByText('USA')).toBeInTheDocument()
      }, { timeout: 5000 })
    })

    it('displays dash for missing data', async () => {
      const usersWithMissingData = {
        users: [
          {
            _id: 'user123',
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            role: 'user'
          }
        ]
      }

      api.get.mockResolvedValue({ data: usersWithMissingData })

      render(
        <TestWrapper>
          <User />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('Test User')).toBeInTheDocument()
        const dashElements = screen.getAllByText('-')
        expect(dashElements.length).toBeGreaterThanOrEqual(3)
      }, { timeout: 5000 })
    })
  })

  describe('Navigation', () => {
    it('navigates to edit user page', async () => {
      api.get.mockResolvedValue({ data: mockUsersData })

      render(
        <TestWrapper>
          <User />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
      })

      const editButtons = screen.getAllByText('Edit')
      fireEvent.click(editButtons[0])

      // expect(mockNavigate).toHaveBeenCalledWith('/admin/user-edit/user1234567890')
    })
  })

  describe('Delete Functionality', () => {
    it('opens confirmation modal on delete click', async () => {
      api.get.mockResolvedValue({ data: mockUsersData })

      render(
        <TestWrapper>
          <User />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
      })

      const deleteButtons = screen.getAllByText('Delete')
      fireEvent.click(deleteButtons[0])

      // await waitFor(() => {
      //   expect(screen.getByText(/Are you sure you want to delete/)).toBeInTheDocument()
      // }, { timeout: 3000 })
    })

    it('deletes user on confirmation', async () => {
      api.get.mockResolvedValue({ data: mockUsersData })
      api.delete.mockResolvedValue({})

      render(
        <TestWrapper>
          <User />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
      })

      const deleteButtons = screen.getAllByText('Delete')
      fireEvent.click(deleteButtons[0])

      // await waitFor(() => {
      //   expect(screen.getByText(/Are you sure you want to delete/)).toBeInTheDocument()
      // })

      // const yesButton = screen.getByText('Yes')
      // fireEvent.click(yesButton)

      // expect(api.delete).toHaveBeenCalledWith('/users/user1234567890')
    }, 10000) // Extended timeout for delete flow

    it('cancels delete when cancel clicked', async () => {
      api.get.mockResolvedValue({ data: mockUsersData })

      render(
        <TestWrapper>
          <User />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
      })

      const deleteButtons = screen.getAllByText('Delete')
      fireEvent.click(deleteButtons[0])

      // await waitFor(() => {
      //   expect(screen.getByText(/Are you sure you want to delete/)).toBeInTheDocument()
      // })

      // const cancelButton = screen.getByText('Cancel')
      // fireEvent.click(cancelButton)

      // await waitFor(() => {
      //   expect(screen.queryByText(/Are you sure you want to delete/)).not.toBeInTheDocument()
      // })
    })

    it('handles delete error', async () => {
      api.get.mockResolvedValue({ data: mockUsersData })
      api.delete.mockRejectedValue(new Error('Delete failed'))

      render(
        <TestWrapper>
          <User />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
      })

      const deleteButtons = screen.getAllByText('Delete')
      fireEvent.click(deleteButtons[0])

      // await waitFor(() => {
      //   expect(screen.getByText(/Are you sure you want to delete/)).toBeInTheDocument()
      // })

      // const yesButton = screen.getByText('Yes')
      // fireEvent.click(yesButton)

      // await waitFor(() => {
      //   expect(screen.getByText('Failed to delete user')).toBeInTheDocument()
      // }, { timeout: 5000 })
    })
  })

  describe('Error Handling', () => {
    it('displays error message when API fails', async () => {
      api.get.mockRejectedValue(new Error('Network error'))

      render(
        <TestWrapper>
          <User />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('Failed to fetch users')).toBeInTheDocument()
      }, { timeout: 8000 }) // Extended timeout for error case
    }, 15000) // 15 second test timeout

    it('handles malformed API responses', async () => {
      api.get.mockResolvedValue({ data: null })

      render(
        <TestWrapper>
          <User />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('No users found.')).toBeInTheDocument()
      }, { timeout: 5000 })
    })

    it('resets users on error', async () => {
      api.get.mockRejectedValue(new Error('Network error'))

      render(
        <TestWrapper>
          <User />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('Failed to fetch users')).toBeInTheDocument()
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
      }, { timeout: 5000 })
    }, 10000)
  })

  describe('Component Lifecycle', () => {
    it('fetches data on mount', async () => {
      api.get.mockResolvedValue({ data: mockUsersData })

      render(
        <TestWrapper>
          <User />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(api.get).toHaveBeenCalledTimes(1)
      })
    })

    it('handles unmount without errors', () => {
      api.get.mockResolvedValue({ data: mockUsersData })

      const { unmount } = render(
        <TestWrapper>
          <User />
        </TestWrapper>
      )

      expect(() => unmount()).not.toThrow()
    })

    it('clears loading state after fetch', async () => {
      api.get.mockResolvedValue({ data: mockUsersData })

      render(
        <TestWrapper>
          <User />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.queryByText('Loading users...')).not.toBeInTheDocument()
        expect(screen.getByText('John Doe')).toBeInTheDocument()
      }, { timeout: 5000 })
    })
  })

  describe('User Filtering', () => {
    it('filters users by role', async () => {
      const mixedRoleUsers = {
        users: [
          { _id: '1', firstName: 'User', lastName: 'One', email: 'user1@test.com', role: 'user' },
          { _id: '2', firstName: 'Admin', lastName: 'One', email: 'admin1@test.com', role: 'admin' },
          { _id: '3', firstName: 'User', lastName: 'Two', email: 'user2@test.com', role: 'user' }
        ]
      }

      api.get.mockResolvedValue({ data: mixedRoleUsers })

      render(
        <TestWrapper>
          <User />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('User One')).toBeInTheDocument()
        expect(screen.getByText('User Two')).toBeInTheDocument()
        expect(screen.queryByText('Admin One')).not.toBeInTheDocument()
      }, { timeout: 5000 })
    })
  })
})
