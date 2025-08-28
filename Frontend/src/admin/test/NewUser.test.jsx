import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import NewUser from '../new-user'
import api from '../../utils/api'

// Mock API
vi.mock('../../utils/api', () => ({
  default: {
    post: vi.fn(),
  },
}))

// Mock navigation
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock header/sidebar components
vi.mock('./dashboardHeader', () => () => <div data-testid="header" />)
vi.mock('./dashboardSidebar', () => () => <div data-testid="sidebar" />)

function renderWithRouter(ui) {
  return render(
    <MemoryRouter>
      {ui}
    </MemoryRouter>
  )
}

// Helper functions for DOM queries
const getInputByName = (name) => document.querySelector(`input[name="${name}"]`)

describe('NewUser', () => {
  const validFormData = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john@example.com',
    confirmEmail: 'john@example.com',
    password: 'Password123!',
    confirmPassword: 'Password123!',
    mobile: '9876543210',
    phone: '9876543210',
    city: 'Mumbai',
    country: 'India'
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockNavigate.mockClear()
  })

  it('renders form with all required fields', () => {
    renderWithRouter(<NewUser />)

    // expect(screen.getByTestId('header')).toBeInTheDocument()
    // expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByText('Add New User')).toBeInTheDocument()
    
    // Check all form fields are present
    expect(getInputByName('firstname')).toBeInTheDocument()
    expect(getInputByName('lastname')).toBeInTheDocument()
    expect(getInputByName('mobile')).toBeInTheDocument()
    expect(getInputByName('phone')).toBeInTheDocument()
    expect(getInputByName('city')).toBeInTheDocument()
    expect(getInputByName('country')).toBeInTheDocument()
    expect(getInputByName('password')).toBeInTheDocument()
    expect(getInputByName('confirmPassword')).toBeInTheDocument()
    expect(getInputByName('email')).toBeInTheDocument()
    expect(getInputByName('confirmEmail')).toBeInTheDocument()
    
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument()
  })

  it('shows validation errors for all required fields when submitted empty', async () => {
    renderWithRouter(<NewUser />)

    await userEvent.click(screen.getByRole('button', { name: /Submit/i }))

    expect(await screen.findByText(/First name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Last name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Please confirm your email/i)).toBeInTheDocument()
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Please confirm your password/i)).toBeInTheDocument()
    expect(screen.getByText(/Mobile is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Country is required/i)).toBeInTheDocument()
    expect(screen.getByText(/City is required/i)).toBeInTheDocument()
  })

  it('validates password requirements', async () => {
    renderWithRouter(<NewUser />)

    // Test weak password
    await userEvent.type(getInputByName('password'), 'weak')
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }))

    expect(await screen.findByText(/Password must be at least 8 characters, include one uppercase letter, one number, and one special character/i)).toBeInTheDocument()
  })

  it('validates email matching', async () => {
    renderWithRouter(<NewUser />)

    await userEvent.type(getInputByName('email'), 'john@example.com')
    await userEvent.type(getInputByName('confirmEmail'), 'different@example.com')
    
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }))

    expect(await screen.findByText(/Emails do not match/i)).toBeInTheDocument()
  })

  it('validates password matching', async () => {
    renderWithRouter(<NewUser />)

    await userEvent.type(getInputByName('password'), 'Password123!')
    await userEvent.type(getInputByName('confirmPassword'), 'DifferentPass123!')
    
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }))

    expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument()
  })

  it('clears validation errors when user starts typing', async () => {
    renderWithRouter(<NewUser />)

    // Trigger validation errors
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }))
    expect(await screen.findByText(/First name is required/i)).toBeInTheDocument()

    // Start typing to clear error
    await userEvent.type(getInputByName('firstname'), 'John')
    expect(screen.queryByText(/First name is required/i)).not.toBeInTheDocument()
  })

  it('clears email mismatch error when emails match', async () => {
    renderWithRouter(<NewUser />)

    // Create email mismatch
    await userEvent.type(getInputByName('email'), 'john@example.com')
    await userEvent.type(getInputByName('confirmEmail'), 'wrong@example.com')
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }))
    
    expect(await screen.findByText(/Emails do not match/i)).toBeInTheDocument()

    // Fix the mismatch
    await userEvent.clear(getInputByName('confirmEmail'))
    await userEvent.type(getInputByName('confirmEmail'), 'john@example.com')
    
    expect(screen.queryByText(/Emails do not match/i)).not.toBeInTheDocument()
  })

  it('clears password validation errors when requirements are met', async () => {
    renderWithRouter(<NewUser />)

    // Enter weak password
    await userEvent.type(getInputByName('password'), 'weak')
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }))
    
    expect(await screen.findByText(/Password must be at least 8 characters/i)).toBeInTheDocument()

    // Enter strong password
    await userEvent.clear(getInputByName('password'))
    await userEvent.type(getInputByName('password'), 'StrongPass123!')
    
    expect(screen.queryByText(/Password must be at least 8 characters/i)).not.toBeInTheDocument()
  })

  it('clears password mismatch error when passwords match', async () => {
    renderWithRouter(<NewUser />)

    // Create password mismatch
    await userEvent.type(getInputByName('password'), 'Password123!')
    await userEvent.type(getInputByName('confirmPassword'), 'Different123!')
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }))
    
    expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument()

    // Fix the mismatch
    await userEvent.clear(getInputByName('confirmPassword'))
    await userEvent.type(getInputByName('confirmPassword'), 'Password123!')
    
    expect(screen.queryByText(/Passwords do not match/i)).not.toBeInTheDocument()
  })

  it('toggles password visibility', async () => {
    renderWithRouter(<NewUser />)

    const passwordInput = getInputByName('password')
    expect(passwordInput).toHaveAttribute('type', 'password')

    // Find password visibility toggle
    const passwordToggles = document.querySelectorAll('i.far.fa-eye-slash')
    const passwordToggle = Array.from(passwordToggles).find(toggle => 
      toggle.closest('.form-group').querySelector('input[name="password"]')
    )

    await userEvent.click(passwordToggle)
    expect(passwordInput).toHaveAttribute('type', 'text')

    await userEvent.click(passwordToggle)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('toggles confirm password visibility', async () => {
    renderWithRouter(<NewUser />)

    const confirmPasswordInput = getInputByName('confirmPassword')
    expect(confirmPasswordInput).toHaveAttribute('type', 'password')

    // Find confirm password visibility toggle
    const passwordToggles = document.querySelectorAll('i.far.fa-eye-slash')
    const confirmPasswordToggle = Array.from(passwordToggles).find(toggle => 
      toggle.closest('.form-group').querySelector('input[name="confirmPassword"]')
    )

    await userEvent.click(confirmPasswordToggle)
    expect(confirmPasswordInput).toHaveAttribute('type', 'text')
  })

  it('handles form input changes correctly', async () => {
    renderWithRouter(<NewUser />)

    await userEvent.type(getInputByName('firstname'), 'John')
    await userEvent.type(getInputByName('lastname'), 'Doe')
    await userEvent.type(getInputByName('email'), 'john@example.com')
    await userEvent.type(getInputByName('mobile'), '9876543210')

    expect(getInputByName('firstname').value).toBe('John')
    expect(getInputByName('lastname').value).toBe('Doe')
    expect(getInputByName('email').value).toBe('john@example.com')
    expect(getInputByName('mobile').value).toBe('9876543210')
  })

  it('submits form successfully with valid data', async () => {
    api.post.mockResolvedValueOnce({ data: { success: true } })

    renderWithRouter(<NewUser />)

    // Fill all required fields
    await userEvent.type(getInputByName('firstname'), validFormData.firstname)
    await userEvent.type(getInputByName('lastname'), validFormData.lastname)
    await userEvent.type(getInputByName('email'), validFormData.email)
    await userEvent.type(getInputByName('confirmEmail'), validFormData.confirmEmail)
    await userEvent.type(getInputByName('password'), validFormData.password)
    await userEvent.type(getInputByName('confirmPassword'), validFormData.confirmPassword)
    await userEvent.type(getInputByName('mobile'), validFormData.mobile)
    await userEvent.type(getInputByName('phone'), validFormData.phone)
    await userEvent.type(getInputByName('city'), validFormData.city)
    await userEvent.type(getInputByName('country'), validFormData.country)

    await userEvent.click(screen.getByRole('button', { name: /Submit/i }))

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/register', {
        firstName: validFormData.firstname,
        lastName: validFormData.lastname,
        email: validFormData.email,
        password: validFormData.password,
        mobile: validFormData.mobile,
        phone: validFormData.phone,
        country: validFormData.country,
        city: validFormData.city,
      })
    })

    expect(await screen.findByText(/User registered successfully!/i)).toBeInTheDocument()
    
    // Check form is reset
    expect(getInputByName('firstname').value).toBe('')
    expect(getInputByName('lastname').value).toBe('')
    expect(getInputByName('email').value).toBe('')
  })

  it('navigates to user list after successful registration', async () => {
    api.post.mockResolvedValueOnce({ data: { success: true } })

    renderWithRouter(<NewUser />)

    // Fill and submit valid form
    await userEvent.type(getInputByName('firstname'), validFormData.firstname)
    await userEvent.type(getInputByName('lastname'), validFormData.lastname)
    await userEvent.type(getInputByName('email'), validFormData.email)
    await userEvent.type(getInputByName('confirmEmail'), validFormData.confirmEmail)
    await userEvent.type(getInputByName('password'), validFormData.password)
    await userEvent.type(getInputByName('confirmPassword'), validFormData.confirmPassword)
    await userEvent.type(getInputByName('mobile'), validFormData.mobile)
    await userEvent.type(getInputByName('city'), validFormData.city)
    await userEvent.type(getInputByName('country'), validFormData.country)

    await userEvent.click(screen.getByRole('button', { name: /Submit/i }))

    await waitFor(() => {
      expect(screen.getByText(/User registered successfully!/i)).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/admin/user')
    }, { timeout: 1000 })
  })

  it('shows API error when registration fails', async () => {
    api.post.mockRejectedValueOnce({
      response: { data: { message: 'Email already exists' } }
    })

    renderWithRouter(<NewUser />)

    // Fill and submit form
    await userEvent.type(getInputByName('firstname'), validFormData.firstname)
    await userEvent.type(getInputByName('lastname'), validFormData.lastname)
    await userEvent.type(getInputByName('email'), validFormData.email)
    await userEvent.type(getInputByName('confirmEmail'), validFormData.confirmEmail)
    await userEvent.type(getInputByName('password'), validFormData.password)
    await userEvent.type(getInputByName('confirmPassword'), validFormData.confirmPassword)
    await userEvent.type(getInputByName('mobile'), validFormData.mobile)
    await userEvent.type(getInputByName('city'), validFormData.city)
    await userEvent.type(getInputByName('country'), validFormData.country)

    await userEvent.click(screen.getByRole('button', { name: /Submit/i }))

    expect(await screen.findByText(/Email already exists/i)).toBeInTheDocument()
  })

  it('shows generic error when API fails without specific message', async () => {
    api.post.mockRejectedValueOnce(new Error('Network error'))

    renderWithRouter(<NewUser />)

    // Fill and submit form
    await userEvent.type(getInputByName('firstname'), validFormData.firstname)
    await userEvent.type(getInputByName('lastname'), validFormData.lastname)
    await userEvent.type(getInputByName('email'), validFormData.email)
    await userEvent.type(getInputByName('confirmEmail'), validFormData.confirmEmail)
    await userEvent.type(getInputByName('password'), validFormData.password)
    await userEvent.type(getInputByName('confirmPassword'), validFormData.confirmPassword)
    await userEvent.type(getInputByName('mobile'), validFormData.mobile)
    await userEvent.type(getInputByName('city'), validFormData.city)
    await userEvent.type(getInputByName('country'), validFormData.country)

    await userEvent.click(screen.getByRole('button', { name: /Submit/i }))

    expect(await screen.findByText(/Registration failed/i)).toBeInTheDocument()
  })

  it('validates password with regex correctly', async () => {
    renderWithRouter(<NewUser />)

    // Test password without uppercase
    await userEvent.type(getInputByName('password'), 'password123!')
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }))
    
    expect(await screen.findByText(/Password must be at least 8 characters, include one uppercase letter, one number, and one special character/i)).toBeInTheDocument()

    // Test password without number
    await userEvent.clear(getInputByName('password'))
    await userEvent.type(getInputByName('password'), 'Password!')
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }))
    
    expect(await screen.findByText(/Password must be at least 8 characters, include one uppercase letter, one number, and one special character/i)).toBeInTheDocument()

    // Test password without special character
    await userEvent.clear(getInputByName('password'))
    await userEvent.type(getInputByName('password'), 'Password123')
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }))
    
    expect(await screen.findByText(/Password must be at least 8 characters, include one uppercase letter, one number, and one special character/i)).toBeInTheDocument()

    // Test too short password
    await userEvent.clear(getInputByName('password'))
    await userEvent.type(getInputByName('password'), 'Pass1!')
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }))
    
    expect(await screen.findByText(/Password must be at least 8 characters, include one uppercase letter, one number, and one special character/i)).toBeInTheDocument()
  })

  it('phone field is optional and does not show validation errors', async () => {
    renderWithRouter(<NewUser />)

    // Submit form without phone (but with other required fields missing)
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }))

    // Phone field should not have any error message
    expect(screen.queryByText(/Phone is required/i)).not.toBeInTheDocument()
    
    // But other required fields should show errors
    expect(await screen.findByText(/First name is required/i)).toBeInTheDocument()
  })
})
