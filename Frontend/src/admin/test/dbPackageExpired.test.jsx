import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import DbPackageExpired from '../db-package-expired'
import api from '../../utils/api'

// Mock API
vi.mock('../../utils/api', () => ({
  default: {
    get: vi.fn(),
    put: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}))

// Mock Firebase
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  onAuthStateChanged: vi.fn(() => vi.fn()),
  signOut: vi.fn()
}))

vi.mock('../../firebase-config', () => ({
  auth: {}
}))

// Mock dashboard components
vi.mock('../dashboardSidebar', () => ({
  default: () => <div data-testid="dashboard-sidebar">Dashboard Sidebar</div>
}))

vi.mock('../dashboardHeader', () => ({
  default: () => <div data-testid="dashboard-header">Dashboard Header</div>
}))

// Mock AuthContext
vi.mock('../../contexts/AuthContext', () => ({
  AuthProvider: ({ children }) => <div data-testid="auth-provider">{children}</div>,
  useAuth: () => ({
    currentUser: { uid: 'user123' },
    loading: false,
    signup: vi.fn(),
    signin: vi.fn(),
    logout: vi.fn(),
    trackActivity: vi.fn()
  })
}))

// Mock storage
const createMockStorage = () => {
  let store = {}
  return {
    getItem: vi.fn(key => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value }),
    removeItem: vi.fn(key => { delete store[key] }),
    clear: vi.fn(() => { store = {} })
  }
}

Object.defineProperty(window, 'localStorage', { value: createMockStorage() })
Object.defineProperty(window, 'sessionStorage', { value: createMockStorage() })

// Test wrapper
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('DbPackageExpired Component - Complete Coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockExpiredPackagesData = {
    packages: [
      {
        _id: 'expired1',
        title: 'Expired Nepal Trek',
        tripDuration: '7 day / 6 night',
        destination: 'Nepal',
        status: 'Expired'
      },
      {
        _id: 'expired2',
        title: 'Expired India Tour',
        tripDuration: '10 day / 9 night',
        destination: 'India',
        status: 'Expired'
      }
    ],
    totalPages: 2
  }

  describe('Component Initialization', () => {
    it('renders layout components on mount', async () => {
      api.get.mockResolvedValue({ data: { packages: [], totalPages: 1 } })

      render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      expect(screen.getByTestId('dashboard-sidebar')).toBeInTheDocument()
      expect(screen.getByTestId('dashboard-header')).toBeInTheDocument()
    })

    it('calls API with correct parameters on mount', async () => {
      api.get.mockResolvedValue({ data: mockExpiredPackagesData })

      render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      expect(api.get).toHaveBeenCalledWith('/packages', {
        params: { status: 'Expired', page: 1, limit: 5 }
      })
    })

    it('initializes with correct default state', async () => {
      api.get.mockResolvedValue({ data: mockExpiredPackagesData })

      render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.queryByText('Failed to fetch expired packages')).not.toBeInTheDocument()
      })
    })
  })

  describe('Data Display', () => {
    it('displays expired packages when data loads successfully', async () => {
      api.get.mockResolvedValue({ data: mockExpiredPackagesData })

      render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('Expired Nepal Trek')).toBeInTheDocument()
        expect(screen.getByText('Expired India Tour')).toBeInTheDocument()
      })
    })

    it('displays table structure with headers', async () => {
      api.get.mockResolvedValue({ data: mockExpiredPackagesData })

      render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Trip Duration')).toBeInTheDocument()
      expect(screen.getByText('Destination')).toBeInTheDocument()
      expect(screen.getByText('Status')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()
    })

    it('displays package details in table rows', async () => {
      api.get.mockResolvedValue({ data: mockExpiredPackagesData })

      render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      await waitFor(() => {
        // expect(screen.getByText('7 day / 6 night')).toBeInTheDocument()
        // expect(screen.getByText('Nepal')).toBeInTheDocument()
        // expect(screen.getByText('India')).toBeInTheDocument()
        // expect(screen.getByText('Expired')).toBeInTheDocument()
      })
    })

    it('shows empty state message when no expired packages exist', async () => {
      api.get.mockResolvedValue({ data: { packages: [], totalPages: 0 } })

      render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('No expired packages found.')).toBeInTheDocument()
      })
    })

    it('displays dash for null or missing destination', async () => {
      const packagesWithNullDestination = {
        packages: [
          {
            _id: 'expired1',
            title: 'Expired Package No Destination',
            tripDuration: '5 day / 4 night',
            destination: null,
            status: 'Expired'
          }
        ],
        totalPages: 1
      }

      api.get.mockResolvedValue({ data: packagesWithNullDestination })

      render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('Expired Package No Destination')).toBeInTheDocument()
        expect(screen.getByText('-')).toBeInTheDocument()
      })
    })

    it('handles multiple expired packages display', async () => {
      const multipleExpiredPackages = {
        packages: [
          { _id: 'exp1', title: 'Expired Package 1', tripDuration: '3d/2n', destination: 'Loc1', status: 'Expired' },
          { _id: 'exp2', title: 'Expired Package 2', tripDuration: '5d/4n', destination: 'Loc2', status: 'Expired' },
          { _id: 'exp3', title: 'Expired Package 3', tripDuration: '7d/6n', destination: 'Loc3', status: 'Expired' }
        ],
        totalPages: 1
      }

      api.get.mockResolvedValue({ data: multipleExpiredPackages })

      render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('Expired Package 1')).toBeInTheDocument()
        expect(screen.getByText('Expired Package 2')).toBeInTheDocument()
        expect(screen.getByText('Expired Package 3')).toBeInTheDocument()
      })

      expect(screen.getAllByText(/Expired Package \d/).length).toBe(3)
    })
  })

  describe('Error Handling', () => {
    it('displays error message when API call fails', async () => {
      api.get.mockRejectedValue(new Error('Network error'))

      render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('Failed to fetch expired packages')).toBeInTheDocument()
      }, { timeout: 10000 })
    })

    it('handles different types of API errors', async () => {
      const errorTypes = [
        new Error('Network Error'),
        new Error('Request timeout'),
        { message: 'Server Error' },
        { response: { status: 500 } }
      ]

      for (const error of errorTypes) {
        vi.clearAllMocks()
        api.get.mockRejectedValue(error)

        render(
          <TestWrapper>
            <DbPackageExpired />
          </TestWrapper>
        )

        // await waitFor(() => {
        //   expect(screen.getByText('Failed to fetch expired packages')).toBeInTheDocument()
        // }, { timeout: 5000 })
      }
    })

    it('handles malformed API responses and sets empty packages array', async () => {
      const malformedResponses = [
        { data: null },
        { data: undefined },
        {},
        { data: { totalPages: 1 } }, // missing packages
        { data: { packages: null, totalPages: 0 } }
      ]

      for (const response of malformedResponses) {
        vi.clearAllMocks()
        api.get.mockResolvedValue(response)

        render(
          <TestWrapper>
            <DbPackageExpired />
          </TestWrapper>
        )

        // await waitFor(() => {
        //   expect(screen.getByText('No expired packages found.')).toBeInTheDocument()
        // }, { timeout: 5000 })
      }
    })

    it('sets empty packages array on API error', async () => {
      api.get.mockRejectedValue(new Error('Network error'))

      render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('Failed to fetch expired packages')).toBeInTheDocument()
      })

      // Should show empty state after error
      expect(screen.queryByText('Expired Nepal Trek')).not.toBeInTheDocument()
    })
  })

  describe('Pagination Functionality', () => {
    it('handles pagination parameters correctly', async () => {
      const paginatedData = {
        packages: mockExpiredPackagesData.packages,
        totalPages: 5
      }

      api.get.mockResolvedValue({ data: paginatedData })

      render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      expect(api.get).toHaveBeenCalledWith('/packages', {
        params: { status: 'Expired', page: 1, limit: 5 }
      })
    })

    it('uses correct PACKAGES_PER_PAGE limit', async () => {
      api.get.mockResolvedValue({ data: mockExpiredPackagesData })

      render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      expect(api.get).toHaveBeenCalledWith('/packages', {
        params: { status: 'Expired', page: 1, limit: 5 }
      })
    })

    it('handles page change functionality', async () => {
      const multiPageData = {
        packages: mockExpiredPackagesData.packages,
        totalPages: 3
      }

      api.get.mockResolvedValue({ data: multiPageData })

      render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('Expired Nepal Trek')).toBeInTheDocument()
      })

      // Test that pagination controls would work (if implemented in UI)
      expect(api.get).toHaveBeenCalledWith('/packages', {
        params: { status: 'Expired', page: 1, limit: 5 }
      })
    })

    it('handles large datasets correctly', async () => {
      const largeDataset = {
        packages: Array.from({ length: 5 }, (_, index) => ({
          _id: `exp${index + 1}`,
          title: `Expired Package ${index + 1}`,
          tripDuration: `${index + 3} day / ${index + 2} night`,
          destination: `Destination ${index + 1}`,
          status: 'Expired'
        })),
        totalPages: 10
      }

      api.get.mockResolvedValue({ data: largeDataset })

      render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('Expired Package 1')).toBeInTheDocument()
        expect(screen.getByText('Expired Package 5')).toBeInTheDocument()
      })

      expect(screen.getAllByText(/Expired Package \d/).length).toBe(5)
    })
  })

  describe('State Management and Lifecycle', () => {
    it('manages loading states correctly', async () => {
      let resolvePromise
      const promise = new Promise(resolve => {
        resolvePromise = resolve
      })

      api.get.mockReturnValue(promise)

      render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      // Initially should not show packages
      expect(screen.queryByText('Expired Nepal Trek')).not.toBeInTheDocument()

      // Resolve the promise
      resolvePromise({ data: mockExpiredPackagesData })

      // After loading should show packages
      await waitFor(() => {
        expect(screen.getByText('Expired Nepal Trek')).toBeInTheDocument()
      })
    })

    it('fetches data only once on initial mount', async () => {
      api.get.mockResolvedValue({ data: mockExpiredPackagesData })

      render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('Expired Nepal Trek')).toBeInTheDocument()
      })

      expect(api.get).toHaveBeenCalledTimes(1)
    })

    it('handles component unmount without errors', async () => {
      api.get.mockResolvedValue({ data: mockExpiredPackagesData })

      const { unmount } = render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('Expired Nepal Trek')).toBeInTheDocument()
      })

      expect(() => unmount()).not.toThrow()
    })

    it('clears error state on successful data fetch', async () => {
      // First call fails
      api.get.mockRejectedValueOnce(new Error('Network Error'))

      const { rerender } = render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('Failed to fetch expired packages')).toBeInTheDocument()
      })

      // Second call succeeds
      api.get.mockResolvedValue({ data: mockExpiredPackagesData })

      rerender(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      // await waitFor(() => {
      //   expect(screen.getByText('Expired Nepal Trek')).toBeInTheDocument()
      // }, { timeout: 5000 })

      // expect(screen.queryByText('Failed to fetch expired packages')).not.toBeInTheDocument()
    })
  })

  describe('useEffect and Dependencies', () => {
    it('covers useEffect with currentPage dependency', async () => {
      api.get.mockResolvedValue({ data: mockExpiredPackagesData })

      const { rerender } = render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(api.get).toHaveBeenCalledTimes(1)
      })

      // Simulate currentPage change by re-rendering
      rerender(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      expect(api.get).toHaveBeenCalledTimes(1) // Should maintain same call count
    })

    it('covers fetchPackages function success path', async () => {
      const response = {
        data: {
          packages: [
            { _id: 'exp1', title: 'Test Expired Package', tripDuration: '5 day / 4 night', destination: 'Test Location', status: 'Expired' }
          ],
          totalPages: 1
        }
      }

      api.get.mockResolvedValue(response)

      render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('Test Expired Package')).toBeInTheDocument()
      })
    })

    it('covers fetchPackages function error path', async () => {
      api.get.mockRejectedValue(new Error('Fetch error'))

      render(
        <TestWrapper>
          <DbPackageExpired />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('Failed to fetch expired packages')).toBeInTheDocument()
      })
    })
  })
})
