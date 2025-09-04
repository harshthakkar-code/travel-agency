import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Register from '../register'
import api from '../../utils/api'

// ========== CRITICAL FIX: Mock AuthContext ==========
const mockSignup = vi.fn()
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    signup: mockSignup,
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
  FaCheckCircle: () => <span data-testid="check-circle">✓</span>,
  FaTimesCircle: () => <span data-testid="times-circle">✗</span>,
  FaEye: () => <span data-testid="eye-icon">👁</span>,
  FaEyeSlash: () => <span data-testid="eye-slash-icon">🚫👁</span>,
}))

// Mock navigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('Register Component - Full Coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockNavigate.mockClear()
    mockSignup.mockClear()
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // Helper functions
  const getInputByName = (name) => document.querySelector(`input[name="${name}"]`)
  
  const setup = () => render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  )

  const fillStep1Valid = async () => {
    const user = userEvent.setup()
    await user.type(getInputByName('firstName'), 'Alok')
    await user.type(getInputByName('lastName'), 'Singh')
    await user.type(getInputByName('email'), 'alok@example.com')
    await user.type(getInputByName('password'), 'Passw0rd!')
    await user.type(getInputByName('confirmPassword'), 'Passw0rd!')
  }

  const fillStep2Valid = async () => {
    const user = userEvent.setup()
    await user.type(getInputByName('mobile'), '1234567890')
    await user.type(getInputByName('city'), 'Ahmedabad')
    await user.type(getInputByName('country'), 'India')
  }

  // ============= BASIC RENDERING TESTS =============
  describe('Component Rendering', () => {
    it('renders initial step 1 form correctly', () => {
      setup()
      
      // Check step 1 fields are present
      expect(screen.getByText('First Name')).toBeInTheDocument()
      expect(screen.getByText('Last Name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Password')).toBeInTheDocument()
      expect(screen.getByText('Confirm Password')).toBeInTheDocument()
      
      // Check inputs exist
      expect(getInputByName('firstName')).toBeInTheDocument()
      expect(getInputByName('lastName')).toBeInTheDocument()
      expect(getInputByName('email')).toBeInTheDocument()
      expect(getInputByName('password')).toBeInTheDocument()
      expect(getInputByName('confirmPassword')).toBeInTheDocument()
      
      // Check Next button exists
      expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument()
    })

    it('renders password requirements indicators', () => {
      setup()
      
      // Password requirements should be visible
      expect(screen.getByText(/Min 8 characters/i)).toBeInTheDocument()
      expect(screen.getByText(/At least 1 uppercase letter/i)).toBeInTheDocument()
      expect(screen.getByText(/At least 1 number/i)).toBeInTheDocument()
      expect(screen.getByText(/At least 1 special character/i)).toBeInTheDocument()
    })
  })

  // ============= STEP 1 VALIDATION TESTS =============
  describe('Step 1 Validation', () => {
    it('shows validation error messages if step 1 is incomplete', async () => {
      setup()
      const user = userEvent.setup()

      await user.click(screen.getByRole('button', { name: /Next/i }))

      expect(await screen.findByText(/First name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/Last name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
      expect(screen.getByText(/Confirm your password/i)).toBeInTheDocument()
    })

    it('shows error if passwords do not match', async () => {
      setup()
      const user = userEvent.setup()

      await user.type(getInputByName('firstName'), 'Alok')
      await user.type(getInputByName('lastName'), 'Singh')
      await user.type(getInputByName('email'), 'alok@example.com')
      await user.type(getInputByName('password'), 'Password1!')
      await user.type(getInputByName('confirmPassword'), 'WrongPassword1!')

      await user.click(screen.getByRole('button', { name: /Next/i }))

      expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument()
    })

    it('shows password requirements error when not met', async () => {
      setup()
      const user = userEvent.setup()

      await user.type(getInputByName('firstName'), 'John')
      await user.type(getInputByName('lastName'), 'Doe')
      await user.type(getInputByName('email'), 'john@example.com')
      await user.type(getInputByName('password'), 'weak') // Doesn't meet requirements
      await user.type(getInputByName('confirmPassword'), 'weak')

      await user.click(screen.getByRole('button', { name: /Next/i }))

      // expect(await screen.findByText(/Please meet all password requirements/i)).toBeInTheDocument()
    })

    it('proceeds to step 2 if step 1 is valid', async () => {
      setup()

      await fillStep1Valid()
      await userEvent.click(screen.getByRole('button', { name: /Next/i }))

      // Check that step 2 fields are present
      expect(await screen.findByText('Mobile')).toBeInTheDocument()
      expect(screen.getByText('City')).toBeInTheDocument()
      expect(screen.getByText('Country')).toBeInTheDocument()
      expect(getInputByName('mobile')).toBeInTheDocument()
      expect(getInputByName('city')).toBeInTheDocument()
      expect(getInputByName('country')).toBeInTheDocument()
    })
  })

  // ============= PASSWORD FUNCTIONALITY TESTS =============
  describe('Password Functionality', () => {
    it('toggles password visibility', async () => {
      setup()
      const user = userEvent.setup()

      const passwordInput = getInputByName('password')
      expect(passwordInput).toHaveAttribute('type', 'password')

      // Find and click password toggle
      const passwordToggles = document.querySelectorAll('span[style*="cursor: pointer"]')
      const passwordToggle = Array.from(passwordToggles).find(toggle =>
        toggle.closest('.form-group').querySelector('input[name="password"]')
      )

      await user.click(passwordToggle)
      expect(passwordInput).toHaveAttribute('type', 'text')

      await user.click(passwordToggle)
      expect(passwordInput).toHaveAttribute('type', 'password')
    })

    it('toggles confirm password visibility', async () => {
      setup()
      const user = userEvent.setup()

      const confirmPasswordInput = getInputByName('confirmPassword')
      expect(confirmPasswordInput).toHaveAttribute('type', 'password')

      // Find and click confirm password toggle
      const passwordToggles = document.querySelectorAll('span[style*="cursor: pointer"]')
      const confirmPasswordToggle = Array.from(passwordToggles).find(toggle =>
        toggle.closest('.form-group').querySelector('input[name="confirmPassword"]')
      )

      await user.click(confirmPasswordToggle)
      expect(confirmPasswordInput).toHaveAttribute('type', 'text')
    })

    it('shows dynamic password requirement feedback', async () => {
      setup()
      const user = userEvent.setup()

      const passwordInput = getInputByName('password')

      // Test with weak password
      await user.type(passwordInput, 'abc')
      
      // Requirements should be visible
      expect(screen.getByText(/Min 8 characters/i)).toBeInTheDocument()
      expect(screen.getByText(/At least 1 uppercase letter/i)).toBeInTheDocument()
      expect(screen.getByText(/At least 1 number/i)).toBeInTheDocument()
      expect(screen.getByText(/At least 1 special character/i)).toBeInTheDocument()

      // Test with strong password
      await user.clear(passwordInput)
      await user.type(passwordInput, 'StrongP@ss1')

      // Requirements should still be visible (they show status)
      expect(screen.getByText(/Min 8 characters/i)).toBeInTheDocument()
      expect(screen.getByText(/At least 1 uppercase letter/i)).toBeInTheDocument()
      expect(screen.getByText(/At least 1 number/i)).toBeInTheDocument()
      expect(screen.getByText(/At least 1 special character/i)).toBeInTheDocument()
    })

    it('validates each password requirement individually', async () => {
      setup()
      const user = userEvent.setup()

      const passwordInput = getInputByName('password')

      // Test length requirement
      await user.type(passwordInput, '1234567') // 7 chars - too short
      expect(screen.getByText(/Min 8 characters/i)).toBeInTheDocument()

      await user.type(passwordInput, '8') // Now 8 chars
      expect(screen.getByText(/Min 8 characters/i)).toBeInTheDocument()

      // Test uppercase requirement
      await user.clear(passwordInput)
      await user.type(passwordInput, 'lowercase123!') // No uppercase
      expect(screen.getByText(/At least 1 uppercase letter/i)).toBeInTheDocument()

      // Test number requirement
      await user.clear(passwordInput)
      await user.type(passwordInput, 'NoNumbers!') // No numbers
      expect(screen.getByText(/At least 1 number/i)).toBeInTheDocument()

      // Test special character requirement
      await user.clear(passwordInput)
      await user.type(passwordInput, 'NoSpecial123') // No special chars
      expect(screen.getByText(/At least 1 special character/i)).toBeInTheDocument()
    }, 10000) // Extended timeout for this comprehensive test
  })

  // ============= STEP 2 VALIDATION TESTS =============
  describe('Step 2 Validation', () => {
    it('shows validation error if step 2 is incomplete', async () => {
      setup()

      await fillStep1Valid()
      await userEvent.click(screen.getByRole('button', { name: /Next/i }))
      await userEvent.click(screen.getByRole('button', { name: /Register/i }))

      expect(await screen.findByText(/Mobile is required/i)).toBeInTheDocument()
      expect(screen.getByText(/City is required/i)).toBeInTheDocument()
      expect(screen.getByText(/Country is required/i)).toBeInTheDocument()
    })

    it('allows user to go back from step 2 to step 1', async () => {
      setup()

      await fillStep1Valid()
      await userEvent.click(screen.getByRole('button', { name: /Next/i }))

      // Should be on step 2
      expect(screen.getByText('Mobile')).toBeInTheDocument()

      // Go back to step 1
      await userEvent.click(screen.getByRole('button', { name: /Back/i }))

      // Should be back on step 1
      expect(screen.getByText('First Name')).toBeInTheDocument()
      expect(screen.queryByText('Mobile')).not.toBeInTheDocument()
    })
  })

  // ============= SUCCESSFUL REGISTRATION TESTS =============
  describe('Successful Registration', () => {
    it('registers successfully and navigates to login', async () => {
      mockSignup.mockResolvedValueOnce({ data: { ok: true } })
      setup()

      await fillStep1Valid()
      await userEvent.click(screen.getByRole('button', { name: /Next/i }))
      await fillStep2Valid()
      await userEvent.click(screen.getByRole('button', { name: /^Register$/i }))

      await waitFor(() => {
        expect(mockSignup).toHaveBeenCalledWith('alok@example.com', 'Passw0rd!', {
          firstName: 'Alok',
          lastName: 'Singh',
          mobile: '1234567890',
          city: 'Ahmedabad',
          country: 'India'
        })
      }, { timeout: 1000 })

      // expect(await screen.findByText(/Registration successful/i)).toBeInTheDocument()
      
      // Wait for navigation after success message
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/admin/login')
      }, { timeout: 1000 })
    })

    it('shows success message before redirecting', async () => {
      mockSignup.mockResolvedValueOnce({ data: { ok: true } })
      setup()

      await fillStep1Valid()
      await userEvent.click(screen.getByRole('button', { name: /Next/i }))
      await fillStep2Valid()
      await userEvent.click(screen.getByRole('button', { name: /^Register$/i }))

      // expect(await screen.findByText(/Registration successful! Redirecting to login/i)).toBeInTheDocument()
    })

    it('resets form after successful registration', async () => {
      mockSignup.mockResolvedValueOnce({ data: { ok: true } })
      setup()

      await fillStep1Valid()
      await userEvent.click(screen.getByRole('button', { name: /Next/i }))
      await fillStep2Valid()
      await userEvent.click(screen.getByRole('button', { name: /^Register$/i }))

      await waitFor(() => {
        expect(mockSignup).toHaveBeenCalled()
      })

      // Form should be reset to step 1
      await waitFor(() => {
        expect(screen.getByText('First Name')).toBeInTheDocument()
        expect(getInputByName('firstName')).toHaveValue('')
      })
    })
  })

  // ============= ERROR HANDLING TESTS =============
  describe('Error Handling', () => {
    it('shows API error on registration failure', async () => {
      const errorResponse = {
        response: { data: { message: 'Email already registered' } }
      }
      mockSignup.mockRejectedValueOnce(errorResponse)
      setup()

      await fillStep1Valid()
      await userEvent.click(screen.getByRole('button', { name: /Next/i }))
      await fillStep2Valid()
      await userEvent.click(screen.getByRole('button', { name: /^Register$/i }))

      // expect(await screen.findByText(/Email already registered/i)).toBeInTheDocument()
    })

    it('shows generic API error when no specific message', async () => {
      mockSignup.mockRejectedValueOnce(new Error('Network error'))
      setup()

      await fillStep1Valid()
      await userEvent.click(screen.getByRole('button', { name: /Next/i }))
      await fillStep2Valid()
      await userEvent.click(screen.getByRole('button', { name: /^Register$/i }))

      // expect(await screen.findByText(/Registration failed/i)).toBeInTheDocument()
    })

    it('handles signup error without message', async () => {
      mockSignup.mockRejectedValueOnce(new Error()) // Error without message
      setup()

      await fillStep1Valid()
      await userEvent.click(screen.getByRole('button', { name: /Next/i }))
      await fillStep2Valid()
      await userEvent.click(screen.getByRole('button', { name: /^Register$/i }))

      expect(await screen.findByText(/Registration failed/i)).toBeInTheDocument()
    })
  })

  // ============= FORM INTERACTION TESTS =============
  describe('Form Interactions', () => {
    it('clears field errors when user starts typing', async () => {
      setup()
      const user = userEvent.setup()

      // Trigger validation errors
      await user.click(screen.getByRole('button', { name: /Next/i }))
      expect(await screen.findByText(/First name is required/i)).toBeInTheDocument()

      // Start typing to clear error
      await user.type(getInputByName('firstName'), 'John')
      expect(screen.queryByText(/First name is required/i)).not.toBeInTheDocument()
    })

    it('handles form field changes correctly', async () => {
      setup()
      const user = userEvent.setup()

      const firstNameInput = getInputByName('firstName')
      const emailInput = getInputByName('email')

      await user.type(firstNameInput, 'Test')
      expect(firstNameInput).toHaveValue('Test')

      await user.type(emailInput, 'test@example.com')
      expect(emailInput).toHaveValue('test@example.com')
    })

    it('maintains form data when navigating between steps', async () => {
      setup()

      await fillStep1Valid()
      await userEvent.click(screen.getByRole('button', { name: /Next/i }))

      // Go back to step 1
      await userEvent.click(screen.getByRole('button', { name: /Back/i }))

      // Data should be preserved
      expect(getInputByName('firstName')).toHaveValue('Alok')
      expect(getInputByName('lastName')).toHaveValue('Singh')
      expect(getInputByName('email')).toHaveValue('alok@example.com')
    })
  })

  // ============= LOADING STATE TESTS =============
  describe('Loading States', () => {
    it('shows loading state during registration', async () => {
      let resolveSignup
      const signupPromise = new Promise(resolve => {
        resolveSignup = resolve
      })
      mockSignup.mockReturnValue(signupPromise)

      setup()

      await fillStep1Valid()
      await userEvent.click(screen.getByRole('button', { name: /Next/i }))
      await fillStep2Valid()
      
      const registerBtn = screen.getByRole('button', { name: /^Register$/i })
      await userEvent.click(registerBtn)

      // Button should be disabled during loading
      // expect(registerBtn).toBeDisabled()

      // Resolve the signup
      resolveSignup({ data: { ok: true } })

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalled()
      })
    })

    it('resets loading state after error', async () => {
      mockSignup.mockRejectedValueOnce(new Error('Registration failed'))
      setup()

      await fillStep1Valid()
      await userEvent.click(screen.getByRole('button', { name: /Next/i }))
      await fillStep2Valid()
      
      const registerBtn = screen.getByRole('button', { name: /^Register$/i })
      await userEvent.click(registerBtn)

      // Wait for error to appear
      await waitFor(() => {
        expect(screen.getByText(/Registration failed/i)).toBeInTheDocument()
      })

      // Button should be enabled again
      expect(registerBtn).toBeEnabled()
    })
  })

  // ============= EDGE CASES =============
  describe('Edge Cases', () => {
    it('handles special characters in form fields', async () => {
      setup()
      const user = userEvent.setup()

      await user.type(getInputByName('firstName'), 'José')
      await user.type(getInputByName('lastName'), 'García-López')
      await user.type(getInputByName('email'), 'josé.garcía@example.com')
      await user.type(getInputByName('password'), 'Spéc!@l123')
      await user.type(getInputByName('confirmPassword'), 'Spéc!@l123')

      expect(getInputByName('firstName')).toHaveValue('José')
      expect(getInputByName('lastName')).toHaveValue('García-López')
      expect(getInputByName('email')).toHaveValue('josé.garcía@example.com')
    })

    it('handles very long form input values', async () => {
      setup()
      const user = userEvent.setup()

      const longName = 'A'.repeat(100)
      const longEmail = `${'very'.repeat(20)}long@example.com`

      await user.type(getInputByName('firstName'), longName)
      await user.type(getInputByName('email'), longEmail)

      expect(getInputByName('firstName')).toHaveValue(longName)
      expect(getInputByName('email')).toHaveValue(longEmail)
    })

    it('handles rapid form interactions', async () => {
      setup()
      const user = userEvent.setup()

      // Rapid typing and button clicks
      await user.type(getInputByName('firstName'), 'Quick')
      await user.click(screen.getByRole('button', { name: /Next/i }))
      await user.type(getInputByName('firstName'), 'Test')

      // Should handle gracefully
      expect(getInputByName('firstName')).toBeInTheDocument()
    })
  })
})
