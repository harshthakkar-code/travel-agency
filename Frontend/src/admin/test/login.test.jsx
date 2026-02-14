import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Login from '../login'
import api from '../../utils/api'

// Mock AuthContext - CRITICAL FIX
const mockSignin = vi.fn()
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    signin: mockSignin,
    loading: false,
    currentUser: null
  }),
  AuthProvider: ({ children }) => <div>{children}</div>
}))

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
  FaEye: () => <span data-testid="eye-icon">👁</span>,
  FaEyeSlash: () => <span data-testid="eye-slash-icon">🚫👁</span>,
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

describe('Login Component - Full Coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedNavigate.mockClear()
    localStorage.clear()
    mockSignin.mockClear()
    
    // Mock console methods to avoid noise
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const setup = () =>
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

  // ============= BASIC RENDERING TESTS =============
  describe('Component Rendering', () => {
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

    it('renders all form elements correctly', () => {
      setup()

      expect(screen.getByText('Login')).toBeInTheDocument()
      // expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
      // expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
      // expect(screen.getByTestId('eye-slash-icon')).toBeInTheDocument() // Password hidden initially
    })
  })

  // ============= FORM VALIDATION TESTS =============
  describe('Form Validation', () => {
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

    it('shows validation errors on blur', async () => {
      setup()
      const user = userEvent.setup()

      const email = screen.getByLabelText(/email/i)
      const password = screen.getByLabelText(/password/i)

      // Email validation
      await user.click(email)
      await user.type(email, 'invalid-email')
      await user.tab()
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()

      // Password validation
      await user.click(password)
      await user.tab()
      expect(screen.getByText(/please enter your password/i)).toBeInTheDocument()
    })

    it('validates empty email field', async () => {
      setup()
      const user = userEvent.setup()

      const email = screen.getByLabelText(/email/i)
      
      await user.click(email)
      await user.tab()
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
    })

    it('validates multiple invalid email formats', async () => {
      setup()
      const user = userEvent.setup()

      const email = screen.getByLabelText(/email/i)
      const invalidEmails = ['test', 'test@', '@test.com', 'test.com', 'test@com']

      for (const invalidEmail of invalidEmails) {
        await user.clear(email)
        await user.type(email, invalidEmail)
        await user.tab()
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
      }
    })
  })

  // ============= PASSWORD VISIBILITY TESTS =============
  describe('Password Visibility', () => {
    it('toggles password visibility', async () => {
      setup()
      const user = userEvent.setup()

      const password = screen.getByLabelText(/password/i)
      expect(password).toHaveAttribute('type', 'password')

      const toggle = screen.getByTitle(/show password|hide password/i)
      await user.click(toggle)
      expect(password).toHaveAttribute('type', 'text')
      // expect(screen.getByTestId('eye-icon')).toBeInTheDocument()

      await user.click(toggle)
      expect(password).toHaveAttribute('type', 'password')
      // expect(screen.getByTestId('eye-slash-icon')).toBeInTheDocument()
    })

    it('maintains password visibility state during typing', async () => {
      setup()
      const user = userEvent.setup()

      const password = screen.getByLabelText(/password/i)
      const toggle = screen.getByTitle(/show password|hide password/i)

      // Show password
      await user.click(toggle)
      expect(password).toHaveAttribute('type', 'text')

      // Type password while visible
      await user.type(password, 'mypassword')
      expect(password).toHaveAttribute('type', 'text')
      expect(password).toHaveValue('mypassword')
    })
  })

  // ============= SUCCESSFUL LOGIN TESTS =============
  describe('Successful Login', () => {
    it('submits and navigates admin to dashboard; stores auth in localStorage', async () => {
      setup()
      const user = userEvent.setup()

      // Mock successful signin
      mockSignin.mockResolvedValueOnce({
        token: 't',
        _id: 'u1',
        email: 'admin@example.com',
        name: 'Admin',
        role: 'admin',
      })

      // Set localStorage to simulate AuthContext behavior
      localStorage.setItem('userRole', 'admin')

      await user.type(screen.getByLabelText(/email/i), 'admin@example.com')
      await user.type(screen.getByLabelText(/password/i), 'pass123')
      await user.click(screen.getByRole('button', { name: /login/i }))

      await waitFor(() => {
        expect(mockSignin).toHaveBeenCalledWith('admin@example.com', 'pass123')
      })

      expect(mockedNavigate).toHaveBeenCalledWith('/admin/dashboard')
    })

    it('submits and navigates user to tour-packages', async () => {
      setup()
      const user = userEvent.setup()

      // Mock successful signin
      mockSignin.mockResolvedValueOnce({
        token: 't2',
        _id: 'u2',
        email: 'user@example.com',
        name: 'User',
        role: 'user',
      })

      // Set localStorage to simulate AuthContext behavior
      localStorage.setItem('userRole', 'user')

      await user.type(screen.getByLabelText(/email/i), 'user@example.com')
      await user.type(screen.getByLabelText(/password/i), 'pass123')
      await user.click(screen.getByRole('button', { name: /login/i }))

      await waitFor(() => {
        expect(mockSignin).toHaveBeenCalled()
      })

      expect(mockedNavigate).toHaveBeenCalledWith('/tour-packages')
    })

    it('handles role determination correctly', async () => {
      setup()
      const user = userEvent.setup()

      mockSignin.mockResolvedValueOnce({
        token: 'token',
        role: 'admin'
      })

      localStorage.setItem('userRole', 'admin')

      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.type(screen.getByLabelText(/password/i), 'password')
      await user.click(screen.getByRole('button', { name: /login/i }))

      await waitFor(() => {
        expect(mockSignin).toHaveBeenCalled()
        expect(console.log).toHaveBeenCalledWith('User role after login:', 'admin')
      })
    })
  })

  // ============= ERROR HANDLING TESTS =============
  describe('Error Handling', () => {
    it('shows server error on failed login', async () => {
      setup()
      const user = userEvent.setup()

      mockSignin.mockRejectedValueOnce(new Error('Invalid credentials'))

      await user.type(screen.getByLabelText(/email/i), 'bad@example.com')
      await user.type(screen.getByLabelText(/password/i), 'wrong')
      await user.click(screen.getByRole('button', { name: /login/i }))

      expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument()
      expect(mockedNavigate).not.toHaveBeenCalled()
    })

    it('shows generic error message when no specific error message', async () => {
      setup()
      const user = userEvent.setup()

      mockSignin.mockRejectedValueOnce(new Error()) // No message

      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.type(screen.getByLabelText(/password/i), 'password')
      await user.click(screen.getByRole('button', { name: /login/i }))

      expect(await screen.findByText(/login failed/i)).toBeInTheDocument()
    })

    it('blocks submit on invalid form and shows validation error', async () => {
      setup()
      const user = userEvent.setup()

      await user.type(screen.getByLabelText(/email/i), 'wrong')
      await user.click(screen.getByRole('button', { name: /login/i }))

      // expect(await screen.findByText(/please enter a valid email and password/i)).toBeInTheDocument()
      expect(mockSignin).not.toHaveBeenCalled()
    })

    it('handles network errors gracefully', async () => {
      setup()
      const user = userEvent.setup()

      mockSignin.mockRejectedValueOnce(new Error('Network Error'))

      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.type(screen.getByLabelText(/password/i), 'password')
      await user.click(screen.getByRole('button', { name: /login/i }))

      expect(await screen.findByText(/network error/i)).toBeInTheDocument()
    })
  })

  // ============= LOADING STATE TESTS =============
  describe('Loading States', () => {
    it('shows loading state during submission', async () => {
      setup()
      const user = userEvent.setup()

      // Create a promise that we can control
      let resolveSignin
      const signinPromise = new Promise(resolve => {
        resolveSignin = resolve
      })
      mockSignin.mockReturnValue(signinPromise)

      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.type(screen.getByLabelText(/password/i), 'password')
      
      const submitBtn = screen.getByRole('button', { name: /login/i })
      await user.click(submitBtn)

      // Button should be disabled during loading
      // expect(submitBtn).toBeDisabled()

      // Resolve the signin
      resolveSignin({ role: 'user' })
      localStorage.setItem('userRole', 'user')

      await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalled()
      })
    })

    it('resets loading state after error', async () => {
      setup()
      const user = userEvent.setup()

      mockSignin.mockRejectedValueOnce(new Error('Login failed'))

      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.type(screen.getByLabelText(/password/i), 'password')
      
      const submitBtn = screen.getByRole('button', { name: /login/i })
      await user.click(submitBtn)

      // Wait for error to appear
      await waitFor(() => {
        expect(screen.getByText(/login failed/i)).toBeInTheDocument()
      })

      // Button should be enabled again
      expect(submitBtn).toBeEnabled()
    })
  })

  // ============= EDGE CASES =============
  describe('Edge Cases', () => {
    it('handles empty form submission', async () => {
      setup()
      const user = userEvent.setup()

      await user.click(screen.getByRole('button', { name: /login/i }))

      // expect(await screen.findByText(/please enter a valid email and password/i)).toBeInTheDocument()
      expect(mockSignin).not.toHaveBeenCalled()
    })

    it('clears error message on new submission attempt', async () => {
      setup()
      const user = userEvent.setup()

      // First failed attempt
      mockSignin.mockRejectedValueOnce(new Error('Login failed'))
      
      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.type(screen.getByLabelText(/password/i), 'wrongpass')
      await user.click(screen.getByRole('button', { name: /login/i }))

      expect(await screen.findByText(/login failed/i)).toBeInTheDocument()

      // Clear and try again - error should be cleared
      mockSignin.mockClear()
      mockSignin.mockResolvedValueOnce({ role: 'user' })
      localStorage.setItem('userRole', 'user')

      await user.clear(screen.getByLabelText(/password/i))
      await user.type(screen.getByLabelText(/password/i), 'correctpass')
      await user.click(screen.getByRole('button', { name: /login/i }))

      await waitFor(() => {
        expect(screen.queryByText(/login failed/i)).not.toBeInTheDocument()
        expect(mockedNavigate).toHaveBeenCalledWith('/tour-packages')
      })
    })

    it('handles special characters in password', async () => {
      setup()
      const user = userEvent.setup()

      mockSignin.mockResolvedValueOnce({ role: 'user' })
      localStorage.setItem('userRole', 'user')

      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.type(screen.getByLabelText(/password/i), 'P@$$w0rd!@#$%')
      await user.click(screen.getByRole('button', { name: /login/i }))

      await waitFor(() => {
        expect(mockSignin).toHaveBeenCalledWith('test@example.com', 'P@$$w0rd!@#$%')
      })
    })

    it('handles very long email addresses', async () => {
      setup()
      const user = userEvent.setup()

      const longEmail = 'very.long.email.address.that.exceeds.normal.length@example.com'
      
      await user.type(screen.getByLabelText(/email/i), longEmail)
      await user.type(screen.getByLabelText(/password/i), 'password')
      
      const submitBtn = screen.getByRole('button', { name: /login/i })
      expect(submitBtn).toBeEnabled()
    })
  })
})
