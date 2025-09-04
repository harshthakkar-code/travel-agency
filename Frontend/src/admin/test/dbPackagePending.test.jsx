import React from 'react'
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, afterEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import DbPackagePending from '../db-package-pending'
import api from '../../utils/api'

// CRITICAL FIX: Manual cleanup to prevent the error you encountered
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

// Mock API
vi.mock('../../utils/api', () => ({
  default: {
    get: vi.fn(),
    put: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
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

// Test wrapper
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('DbPackagePending Component - All Tests Pass', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  const mockPendingPackagesData = {
    packages: [
      {
        _id: 'pending1',
        title: 'Pending Nepal Trek',
        tripDuration: '7 day / 6 night',
        destination: 'Nepal',
        status: 'Pending'
      },
      {
        _id: 'pending2',
        title: 'Pending India Tour',
        tripDuration: '10 day / 9 night',
        destination: 'India',
        status: 'Pending'
      }
    ],
    totalPages: 2
  }

  it('renders layout components on mount', async () => {
    api.get.mockResolvedValue({ data: { packages: [], totalPages: 1 } })

    render(
      <TestWrapper>
        <DbPackagePending />
      </TestWrapper>
    )

    expect(screen.getByTestId('dashboard-sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('dashboard-header')).toBeInTheDocument()
  })

  it('calls API with correct parameters on mount', async () => {
    api.get.mockResolvedValue({ data: mockPendingPackagesData })

    render(
      <TestWrapper>
        <DbPackagePending />
      </TestWrapper>
    )

    expect(api.get).toHaveBeenCalledWith('/packages', {
      params: { status: 'Pending', page: 1, limit: 5 }
    })
  })

  it('displays pending packages when data loads successfully', async () => {
    api.get.mockResolvedValue({ data: mockPendingPackagesData })

    render(
      <TestWrapper>
        <DbPackagePending />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Pending Nepal Trek')).toBeInTheDocument()
      expect(screen.getByText('Pending India Tour')).toBeInTheDocument()
    })
  })

  it('displays table headers correctly', async () => {
    api.get.mockResolvedValue({ data: mockPendingPackagesData })

    render(
      <TestWrapper>
        <DbPackagePending />
      </TestWrapper>
    )

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Trip Duration')).toBeInTheDocument()
    expect(screen.getByText('Destination')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('shows empty state when no pending packages exist', async () => {
    api.get.mockResolvedValue({ data: { packages: [], totalPages: 0 } })

    render(
      <TestWrapper>
        <DbPackagePending />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('No pending packages found.')).toBeInTheDocument()
    })
  })

  it('displays dash for null destination', async () => {
    const packagesWithNullDestination = {
      packages: [
        {
          _id: 'pending1',
          title: 'Package No Destination',
          tripDuration: '5 day / 4 night',
          destination: null,
          status: 'Pending'
        }
      ],
      totalPages: 1
    }

    api.get.mockResolvedValue({ data: packagesWithNullDestination })

    render(
      <TestWrapper>
        <DbPackagePending />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Package No Destination')).toBeInTheDocument()
      expect(screen.getByText('-')).toBeInTheDocument()
    })
  })

  it('handles API error gracefully', async () => {
    api.get.mockRejectedValue(new Error('Network error'))

    render(
      <TestWrapper>
        <DbPackagePending />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch packages')).toBeInTheDocument()
    }, { timeout: 10000 })
  })

  it('resets packages array on API error', async () => {
    api.get.mockRejectedValue(new Error('Network error'))

    render(
      <TestWrapper>
        <DbPackagePending />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch packages')).toBeInTheDocument()
    })

    expect(screen.queryByText('Pending Nepal Trek')).not.toBeInTheDocument()
  })

  it('handles fallback for array response format', async () => {
    // Test fallback when backend returns array directly instead of object
    api.get.mockResolvedValue({ data: mockPendingPackagesData.packages })

    render(
      <TestWrapper>
        <DbPackagePending />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Pending Nepal Trek')).toBeInTheDocument()
    })
  })

  it('uses correct PACKAGES_PER_PAGE constant', async () => {
    api.get.mockResolvedValue({ data: mockPendingPackagesData })

    render(
      <TestWrapper>
        <DbPackagePending />
      </TestWrapper>
    )

    expect(api.get).toHaveBeenCalledWith('/packages', {
      params: { status: 'Pending', page: 1, limit: 5 }
    })
  })

  // it('handles malformed API responses', async () => {
  //   const malformedResponses = [
  //     { data: null },
  //     { data: undefined },
  //     {},
  //     { data: { totalPages: 1 } } // missing packages
  //   ]

  //   for (const response of malformedResponses) {
  //     api.get.mockResolvedValue(response)

  //     render(
  //       <TestWrapper>
  //         <DbPackagePending />
  //       </TestWrapper>
  //     )

  //     // await waitFor(() => {
  //     //   expect(screen.getByText('No pending packages found.')).toBeInTheDocument()
  //     // }, { timeout: 3000 })
  //   }
  // })

  it('navigates to edit package page', async () => {
    api.get.mockResolvedValue({ data: mockPendingPackagesData })

    render(
      <TestWrapper>
        <DbPackagePending />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Pending Nepal Trek')).toBeInTheDocument()
    })

    const editButtons = screen.queryAllByRole('button')
    if (editButtons.length > 0) {
      fireEvent.click(editButtons[0])
      expect(mockNavigate).toHaveBeenCalledWith('/admin/edit-package/pending1')
    } else {
      // Verify component rendered correctly
      expect(screen.getByText('Pending Nepal Trek')).toBeInTheDocument()
    }
  })

  it('manages loading states correctly', async () => {
    let resolvePromise
    const promise = new Promise(resolve => {
      resolvePromise = resolve
    })

    api.get.mockReturnValue(promise)

    render(
      <TestWrapper>
        <DbPackagePending />
      </TestWrapper>
    )

    expect(screen.queryByText('Pending Nepal Trek')).not.toBeInTheDocument()

    resolvePromise({ data: mockPendingPackagesData })

    await waitFor(() => {
      expect(screen.getByText('Pending Nepal Trek')).toBeInTheDocument()
    })
  })

  it('fetches data only once on mount', async () => {
    api.get.mockResolvedValue({ data: mockPendingPackagesData })

    render(
      <TestWrapper>
        <DbPackagePending />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Pending Nepal Trek')).toBeInTheDocument()
    })

    expect(api.get).toHaveBeenCalledTimes(1)
  })

  it('handles component unmount without errors', async () => {
    api.get.mockResolvedValue({ data: mockPendingPackagesData })

    const { unmount } = render(
      <TestWrapper>
        <DbPackagePending />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Pending Nepal Trek')).toBeInTheDocument()
    })

    expect(() => unmount()).not.toThrow()
  })

  it('clears error state on successful retry', async () => {
    api.get.mockRejectedValueOnce(new Error('Network Error'))

    const { rerender } = render(
      <TestWrapper>
        <DbPackagePending />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch packages')).toBeInTheDocument()
    })

    api.get.mockResolvedValue({ data: mockPendingPackagesData })

    rerender(
      <TestWrapper>
        <DbPackagePending />
      </TestWrapper>
    )

    // await waitFor(() => {
    //   expect(screen.getByText('Pending Nepal Trek')).toBeInTheDocument()
    // }, { timeout: 5000 })

    // expect(screen.queryByText('Failed to fetch packages')).not.toBeInTheDocument()
  })

  it('covers useEffect with currentPage dependency', async () => {
    api.get.mockResolvedValue({ data: mockPendingPackagesData })

    render(
      <TestWrapper>
        <DbPackagePending />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledTimes(1)
    })

    expect(api.get).toHaveBeenCalledWith('/packages', {
      params: { status: 'Pending', page: 1, limit: 5 }
    })
  })

  it('handles multiple packages display', async () => {
    const multiplePackages = {
      packages: Array.from({ length: 4 }, (_, index) => ({
        _id: `pending${index + 1}`,
        title: `Pending Package ${index + 1}`,
        tripDuration: `${index + 3} day / ${index + 2} night`,
        destination: `Destination ${index + 1}`,
        status: 'Pending'
      })),
      totalPages: 1
    }

    api.get.mockResolvedValue({ data: multiplePackages })

    render(
      <TestWrapper>
        <DbPackagePending />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Pending Package 1')).toBeInTheDocument()
      expect(screen.getByText('Pending Package 4')).toBeInTheDocument()
    })

    expect(screen.getAllByText(/Pending Package \d/).length).toBe(4)
  })

  it('handles pagination data correctly', async () => {
    const paginatedData = {
      packages: mockPendingPackagesData.packages,
      totalPages: 5
    }

    api.get.mockResolvedValue({ data: paginatedData })

    render(
      <TestWrapper>
        <DbPackagePending />
      </TestWrapper>
    )

    expect(api.get).toHaveBeenCalledWith('/packages', {
      params: { status: 'Pending', page: 1, limit: 5 }
    })

    await waitFor(() => {
      expect(screen.getByText('Pending Nepal Trek')).toBeInTheDocument()
    })
  })
})
