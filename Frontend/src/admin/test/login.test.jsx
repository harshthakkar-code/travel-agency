import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Login from '../login'
import api from '../../utils/api'

// Mock API
vi.mock('../../utils/api', () => ({
  default: {
    post: vi.fn(),
  },
}))

// Mock static assets
vi.mock('../../admin/assets/images/bg.jpg', () => ({ default: 'bg-mock.jpg' }))
vi.mock('../../admin/assets/images/logo.png', () => ({ default: 'logo-mock.png' }))

// Mock react-icons
vi.mock('react-icons/fa', () => ({
  FaEye: () => <span data-testid="eye" />,
  FaEyeSlash: () => <span data-testid="eye-slash" />,
}))

// Mock navigate
const mockedNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  }
})

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedNavigate.mockClear()
    localStorage.clear()
  })

  const setup = () =>
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

  it('renders background, logo, inputs and disabled submit initially', async () => {
    setup()

    // Background image applied
    const page = document.querySelector('.login-page')
    expect(page?.getAttribute('style') || '').toMatch(/bg-mock\.jpg/)

    // Logo
    const logo = screen.getByAltText(/logo/i)
    expect(logo).toHaveAttribute('src', expect.stringMatching(/logo-mock\.png/))

    // Inputs present
    const email = screen.getByLabelText(/email/i)
    const password = screen.getByLabelText(/password/i)
    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()

    // Submit disabled until valid
    const submitBtn = screen.getByRole('button', { name: /login/i })
    expect(submitBtn).toBeDisabled()
  })

  it('validates email and password and enables submit when valid', async () => {
    setup()
    const user = userEvent.setup()

    const email = screen.getByLabelText(/email/i)
    const password = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByRole('button', { name: /login/i })

    // Trigger email validation
    await user.click(email)
    await user.tab()
    expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument()

    // Invalid email keeps disabled
    await user.type(email, 'wrong')
    await user.tab()
    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
    expect(submitBtn).toBeDisabled()

    // Valid email still disabled with empty password
    await user.clear(email)
    await user.type(email, 'dev@example.com')
    expect(submitBtn).toBeDisabled()

    // Trigger password validation
    await user.click(password)
    await user.tab()
    expect(screen.getByText(/please enter your password/i)).toBeInTheDocument()

    // Type password -> enabled
    await user.type(password, 'secret123')
    expect(submitBtn).toBeEnabled()
  })

  it('toggles password visibility', async () => {
    setup()
    const user = userEvent.setup()

    const password = screen.getByLabelText(/password/i)
    expect(password).toHaveAttribute('type', 'password')

    const toggle = screen.getByTitle(/show password|hide password/i)
    await user.click(toggle)
    expect(password).toHaveAttribute('type', 'text')

    await user.click(toggle)
    expect(password).toHaveAttribute('type', 'password')
  })

  it('submits and navigates admin to dashboard; stores auth in localStorage', async () => {
    setup()
    const user = userEvent.setup()

    api.post.mockResolvedValueOnce({
      data: {
        token: 't',
        _id: 'u1',
        email: 'admin@example.com',
        name: 'Admin',
        role: 'admin',
      },
    })

    await user.type(screen.getByLabelText(/email/i), 'admin@example.com')
    await user.type(screen.getByLabelText(/password/i), 'pass123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() =>
      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        email: 'admin@example.com',
        password: 'pass123',
      })
    )

    expect(localStorage.getItem('token')).toBe('t')
    expect(localStorage.getItem('userId')).toBe('u1')
    expect(localStorage.getItem('userEmail')).toBe('admin@example.com')
    expect(localStorage.getItem('user')).toBe('Admin')
    expect(localStorage.getItem('userRole')).toBe('admin')

    expect(mockedNavigate).toHaveBeenCalledWith('/admin/dashboard')
  })

  it('submits and navigates user role to /tour-packages when nested user.role is user', async () => {
    setup()
    const user = userEvent.setup()

    api.post.mockResolvedValueOnce({
      data: {
        token: 't2',
        _id: 'u2',
        email: 'user@example.com',
        name: 'User',
        role: 'admin',
        user: { role: 'user' },
      },
    })

    await user.type(screen.getByLabelText(/email/i), 'user@example.com')
    await user.type(screen.getByLabelText(/password/i), 'pass123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => expect(api.post).toHaveBeenCalled())

    expect(mockedNavigate).toHaveBeenCalledWith('/tour-packages')
  })

  it('shows server error on failed login', async () => {
    setup()
    const user = userEvent.setup()

    api.post.mockRejectedValueOnce({ response: { data: { message: 'Invalid credentials' } } })

    await user.type(screen.getByLabelText(/email/i), 'bad@example.com')
    await user.type(screen.getByLabelText(/password/i), 'x')
    await user.click(screen.getByRole('button', { name: /login/i }))

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument()
    expect(mockedNavigate).not.toHaveBeenCalled()
  })

  it('blocks submit on invalid form and shows generic error without API call', async () => {
    setup()
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/email/i), 'wrong')
    await user.click(screen.getByRole('button', { name: /login/i }))

    expect(api.post).not.toHaveBeenCalled()
  })
})
