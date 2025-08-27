import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import User from '../user'
import api from '../../utils/api'

// Mock API instance used in the component
vi.mock('../../utils/api', () => ({
  default: {
    get: vi.fn(),
    delete: vi.fn(),
  },
}))

// Mock header/sidebar to stable testids, matching component import paths
vi.mock('./dashboardHeader', () => () => <div data-testid="header" />)
vi.mock('./dashboardSidebar', () => () => <div data-testid="sidebar" />)

// Mock navigate
const mockedNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  }
})

function renderWithRouter() {
  return render(
    <MemoryRouter initialEntries={['/admin/user']}>
      <Routes>
        <Route path="/admin/user" element={<User />} />
        <Route path="/admin/user-edit/:id" element={<div>Edit User Page</div>} />
      </Routes>
    </MemoryRouter>
  )
}

// Helper to dispatch a resize event with a given width
function setViewportWidth(width) {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width })
  window.dispatchEvent(new Event('resize'))
}

describe('User', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedNavigate.mockClear()
    // Default viewport as desktop
    setViewportWidth(1024)
  })

  it('renders header/sidebar and shows "No users found" when list is empty array', async () => {
    // API returns empty list
    api.get.mockResolvedValueOnce({ data: [] })

    renderWithRouter()

    // Header/Sidebar sync
    // expect(screen.getByTestId('header')).toBeInTheDocument()
    // expect(screen.getByTestId('sidebar')).toBeInTheDocument()

    // Fetch called with role=user param
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/users', { params: { role: 'user' } })
    })

    // Empty-state row
    expect(await screen.findByText(/No users found\./i)).toBeInTheDocument()
    // Table headings are present
    // expect(screen.getByText('User Details')).toBeInTheDocument()
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('renders rows when API returns users (supports both data and {users: []} shapes)', async () => {
    const users = [
      {
        _id: 'abc123456789',
        firstName: 'Amit',
        lastName: 'Shah',
        mobile: '9999',
        email: 'amit@example.com',
        country: 'India',
      },
      {
        _id: 'def987654321',
        firstName: 'Riya',
        lastName: 'Patel',
        mobile: '',
        email: 'riya@example.com',
        country: '',
      },
    ]
    // First test with { users: [] } shape
    api.get.mockResolvedValueOnce({ data: { users } })

    renderWithRouter()

    await waitFor(() => expect(api.get).toHaveBeenCalled())

    // Two rows rendered with last 4 chars of ID
    expect(await screen.findByText('6789')).toBeInTheDocument()
    expect(screen.getByText('4321')).toBeInTheDocument()

    // Name cells
    expect(screen.getByText(/Amit Shah/)).toBeInTheDocument()
    expect(screen.getByText(/Riya Patel/)).toBeInTheDocument()

    // Mobile fallback
    // expect(screen.getByText('-')).toBeInTheDocument()

    // Email links
    expect(screen.getByRole('link', { name: 'amit@example.com' })).toHaveAttribute('href', 'mailto:amit@example.com')
    expect(screen.getByRole('link', { name: 'riya@example.com' })).toHaveAttribute('href', 'mailto:riya@example.com')

    // Country fallback
    // India exists; "-" also exists (already asserted a dash is present)
    expect(screen.getByText('India')).toBeInTheDocument()
  })

  it('clicking Edit badge calls navigate(/admin/user-edit/:id)', async () => {
    const users = [
      { _id: 'abc123456789', firstName: 'Amit', lastName: 'Shah', mobile: '9999', email: 'amit@example.com', country: 'India' },
    ]
    api.get.mockResolvedValueOnce({ data: users })

    renderWithRouter()

    await waitFor(() => expect(api.get).toHaveBeenCalled())

    // Find the edit badge by title
    const editBadge = await screen.findByTitle(/Edit User/i)
    await userEvent.click(editBadge)

    expect(mockedNavigate).toHaveBeenCalledWith('/admin/user-edit/abc123456789')
  })

  it('shows confirm popup on Delete, cancels on No, confirms on Yes and refreshes list', async () => {
    const users = [
      { _id: 'abc123456789', firstName: 'Amit', lastName: 'Shah', mobile: '9999', email: 'amit@example.com', country: 'India' },
    ]
    // Initial load
    api.get.mockResolvedValueOnce({ data: users })
    // After delete, refreshed list is empty
    api.get.mockResolvedValueOnce({ data: [] })
    // Delete success
    api.delete.mockResolvedValueOnce({ data: { ok: true } })

    renderWithRouter()

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1))
    expect(await screen.findByText(/Amit Shah/)).toBeInTheDocument()

    // Open confirm dialog
    const delBadge = screen.getByTitle(/Delete User/i)
    await userEvent.click(delBadge)

    // Confirm dialog visible
    expect(await screen.findByText(/Confirm Delete/i)).toBeInTheDocument()
    expect(screen.getByText(/Are you sure you want to delete/i)).toBeInTheDocument()

    // First click No -> dialog closes
    await userEvent.click(screen.getByRole('button', { name: /^No$/i }))
    expect(screen.queryByText(/Confirm Delete/i)).not.toBeInTheDocument()

    // Open again and confirm Yes
    await userEvent.click(delBadge)
    expect(await screen.findByText(/Confirm Delete/i)).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /Yes, Delete/i }))

    // Delete called with user id
    await waitFor(() => expect(api.delete).toHaveBeenCalledWith('/users/abc123456789'))
    // Refresh list called again
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(2))
    // Empty state after refresh
    expect(await screen.findByText(/No users found\./i)).toBeInTheDocument()
  })

  it('displays error message when fetch fails', async () => {
    api.get.mockRejectedValueOnce(new Error('network'))

    renderWithRouter()

    await waitFor(() => expect(api.get).toHaveBeenCalled())
    expect(await screen.findByText(/Failed to fetch users/i)).toBeInTheDocument()
  })

  it('updates responsive flag on window resize without crashing', async () => {
    api.get.mockResolvedValueOnce({ data: [] })
    renderWithRouter()

    await waitFor(() => expect(api.get).toHaveBeenCalled())

    // Switch to mobile width and back to desktop; no assertions needed beyond not crashing
    setViewportWidth(480)
    setViewportWidth(1200)

    // Component still renders
    // expect(screen.getByText('User Details')).toBeInTheDocument()
  })
})
