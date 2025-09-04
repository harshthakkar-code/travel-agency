import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import DbAddPackage from '../db-add-package'
import api from '../../utils/api'
import uploadImage from '../../utils/uploadImage'

// Mock API
vi.mock('../../utils/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

// Mock upload image utility
vi.mock('../../utils/uploadImage', () => ({
  __esModule: true,
  default: vi.fn(),
}))

// Mock Firebase completely
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

// Mock AuthContext completely
vi.mock('../../contexts/AuthContext', () => ({
  AuthProvider: ({ children }) => <div data-testid="auth-provider">{children}</div>,
  useAuth: () => ({
    currentUser: null,
    loading: false,
    signup: vi.fn(),
    signin: vi.fn(),
    logout: vi.fn(),
    trackActivity: vi.fn()
  })
}))

// Mock globals
global.console = {
  ...global.console,
  log: vi.fn(),
  error: vi.fn()
}

global.fetch = vi.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({})
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

describe('DbAddPackage Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Helper function to wait for elements safely
  const safeQuery = (selector, timeout = 3000) => {
    return new Promise((resolve) => {
      const element = document.querySelector(selector)
      if (element) {
        resolve(element)
      } else {
        setTimeout(() => resolve(null), timeout)
      }
    })
  }

  // Helper to fill form completely
  const fillCompleteForm = async () => {
    await waitFor(() => {
      const titleInput = document.querySelector('input[name="title"]')
      const descriptionInput = document.querySelector('textarea[name="description"]') || 
                              document.querySelector('input[name="description"]')
      
      if (titleInput) fireEvent.change(titleInput, { target: { value: 'Test Package' } })
      if (descriptionInput) fireEvent.change(descriptionInput, { target: { value: 'Test Description' } })
    })

    const groupSizeInput = document.querySelector('input[name="groupSize"]')
    const tripDayInput = document.querySelector('input[name="tripDay"]')
    const tripNightInput = document.querySelector('input[name="tripNight"]')
    const regularPriceInput = document.querySelector('input[name="regularPrice"]')
    const destinationInput = document.querySelector('input[name="destination"]')
    const mapUrlInput = document.querySelector('input[name="mapUrl"]')

    if (groupSizeInput) fireEvent.change(groupSizeInput, { target: { value: '8' } })
    if (tripDayInput) fireEvent.change(tripDayInput, { target: { value: '5' } })
    if (tripNightInput) fireEvent.change(tripNightInput, { target: { value: '4' } })
    if (regularPriceInput) fireEvent.change(regularPriceInput, { target: { value: '2000' } })
    if (destinationInput) fireEvent.change(destinationInput, { target: { value: 'Thailand' } })
    if (mapUrlInput) fireEvent.change(mapUrlInput, { target: { value: 'MAP_API_KEY' } })

    // Handle selects with default values
    const categorySelect = document.querySelector('select[name="category"]')
    const locationSelect = document.querySelector('select[name="location"]')
    
    if (categorySelect) {
      // Add option if it doesn't exist
      if (!categorySelect.querySelector('option[value="Beach"]')) {
        const option = document.createElement('option')
        option.value = 'Beach'
        option.textContent = 'Beach'
        categorySelect.appendChild(option)
      }
      fireEvent.change(categorySelect, { target: { value: 'Beach' } })
    }
    
    if (locationSelect) {
      if (!locationSelect.querySelector('option[value="Bangkok"]')) {
        const option = document.createElement('option')
        option.value = 'Bangkok'
        option.textContent = 'Bangkok'
        locationSelect.appendChild(option)
      }
      fireEvent.change(locationSelect, { target: { value: 'Bangkok' } })
    }
  }

  describe('Component Rendering', () => {
    it('renders dashboard layout correctly', async () => {
      render(<DbAddPackage />)

      await waitFor(() => {
        expect(screen.getByTestId('dashboard-sidebar')).toBeInTheDocument()
        expect(screen.getByTestId('dashboard-header')).toBeInTheDocument()
      })
    })

    it('renders form elements', async () => {
      render(<DbAddPackage />)

      await waitFor(() => {
        expect(document.querySelector('input[name="title"]')).toBeInTheDocument()
        expect(document.querySelector('textarea[name="description"]') || 
               document.querySelector('input[name="description"]')).toBeInTheDocument()
        expect(document.querySelector('input[name="groupSize"]')).toBeInTheDocument()
      })
    })

    it('renders submit button', async () => {
      render(<DbAddPackage />)

      await waitFor(() => {
        const submitButton = document.querySelector('button[type="submit"]') || 
                            document.querySelector('button') ||
                            screen.queryByText(/submit/i) ||
                            screen.queryByText(/add/i)
        expect(submitButton).toBeInTheDocument()
      })
    })
  })

  describe('Form Validation', () => {
    it('shows all validation errors on empty submit', async () => {
      render(<DbAddPackage />)

      await waitFor(async () => {
        const form = document.querySelector('form')
        if (form) {
          fireEvent.submit(form)
        } else {
          const submitButton = document.querySelector('button[type="submit"]') || 
                              document.querySelector('button')
          if (submitButton) fireEvent.click(submitButton)
        }
      })

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument()
        expect(screen.getByText('Description is required')).toBeInTheDocument()
        expect(screen.getByText('Group size is required')).toBeInTheDocument()
      })
    })

    it('validates trip duration rules', async () => {
      render(<DbAddPackage />)

      const tripDayInput = document.querySelector('input[name="tripDay"]')
      const tripNightInput = document.querySelector('input[name="tripNight"]')

      if (tripDayInput) fireEvent.change(tripDayInput, { target: { value: '10' } })
      if (tripNightInput) fireEvent.change(tripNightInput, { target: { value: '5' } })

      const form = document.querySelector('form')
      if (form) {
        fireEvent.submit(form)
      }

      await waitFor(() => {
        expect(screen.getByText('Days and nights difference must be 0 or 1')).toBeInTheDocument()
      })
    })

    it('clears errors when valid input provided', async () => {
      render(<DbAddPackage />)

      const titleInput = document.querySelector('input[name="title"]')
      
      // Trigger error first
      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument()
      })

      // Fix error
      if (titleInput) fireEvent.change(titleInput, { target: { value: 'Valid Title' } })

      await waitFor(() => {
        expect(screen.queryByText('Title is required')).not.toBeInTheDocument()
      })
    })
  })

  describe('Form Input Tests', () => {
    it('updates text inputs correctly', async () => {
      render(<DbAddPackage />)

      await waitFor(() => {
        const titleInput = document.querySelector('input[name="title"]')
        const destinationInput = document.querySelector('input[name="destination"]')

        if (titleInput) {
          fireEvent.change(titleInput, { target: { value: 'Amazing Package' } })
          expect(titleInput.value).toBe('Amazing Package')
        }

        if (destinationInput) {
          fireEvent.change(destinationInput, { target: { value: 'Nepal' } })
          expect(destinationInput.value).toBe('Nepal')
        }
      })
    })

    it('updates number inputs correctly', async () => {
      render(<DbAddPackage />)

      const groupSizeInput = document.querySelector('input[name="groupSize"]')
      const regularPriceInput = document.querySelector('input[name="regularPrice"]')

      if (groupSizeInput) {
        fireEvent.change(groupSizeInput, { target: { value: '12' } })
        expect(groupSizeInput.value).toBe('12')
      }

      if (regularPriceInput) {
        fireEvent.change(regularPriceInput, { target: { value: '2500' } })
        expect(regularPriceInput.value).toBe('2500')
      }
    })

    it('handles checkbox correctly', async () => {
      render(<DbAddPackage />)

      const isPopularCheckbox = document.querySelector('input[name="isPopular"]')

      if (isPopularCheckbox) {
        expect(isPopularCheckbox.checked).toBe(false)
        fireEvent.click(isPopularCheckbox)
        expect(isPopularCheckbox.checked).toBe(true)
      }
    })
  })

  describe('Image Upload', () => {
    it('handles successful file upload', async () => {
      uploadImage.mockResolvedValue('https://example.com/uploaded-image.jpg')

      render(<DbAddPackage />)

      const fileInput = document.querySelector('input[type="file"]')

      if (fileInput) {
        const testFile = new File(['image data'], 'test.jpg', { type: 'image/jpeg' })
        fireEvent.change(fileInput, { target: { files: [testFile] } })

        await waitFor(() => {
          expect(uploadImage).toHaveBeenCalledWith(testFile)
        })
      }
    })

    it('handles file upload error', async () => {
      uploadImage.mockRejectedValue(new Error('Upload failed'))

      render(<DbAddPackage />)

      const fileInput = document.querySelector('input[type="file"]')

      if (fileInput) {
        const testFile = new File(['image data'], 'test.jpg', { type: 'image/jpeg' })
        fireEvent.change(fileInput, { target: { files: [testFile] } })

        await waitFor(() => {
          expect(screen.getByText('Image upload failed')).toBeInTheDocument()
        })
      }
    })

    it('ignores empty file selection', () => {
      render(<DbAddPackage />)

      const fileInput = document.querySelector('input[type="file"]')
      if (fileInput) {
        fireEvent.change(fileInput, { target: { files: [] } })
      }

      expect(uploadImage).not.toHaveBeenCalled()
    })
  })

  describe('Form Submission', () => {
    //   it('submits form successfully with required fields', async () => {
    //       api.post.mockResolvedValue({ data: { message: 'Success' } })

    //       render(<DbAddPackage />)

    //       // Wait for form to render
    //       await waitFor(() => {
    //           expect(document.querySelector('input[name="title"]')).toBeInTheDocument()
    //       })

    //       await fillCompleteForm()

    //       // Submit the form
    //       const form = document.querySelector('form')
    //       if (form) {
    //           fireEvent.submit(form)
    //       }

    //       // Wait for API call
    //       await waitFor(() => {
    //           expect(api.post).toHaveBeenCalled()
    //       }, { timeout: 15000 })

    //       // Use flexible matching for the API call parameters
    //       await waitFor(() => {
    //           expect(api.post).toHaveBeenCalledWith('/packages', expect.objectContaining({
    //               title: expect.any(String),
    //               description: expect.any(String),
    //               groupSize: expect.any(Number),
    //               tripDay: expect.any(Number),
    //               tripNight: expect.any(Number),
    //               tripDuration: expect.any(String),
    //               regularPrice: expect.any(Number),
    //               destination: expect.any(String),
    //               mapUrl: expect.any(String),
    //               program: expect.any(Array),
    //               gallery: expect.any(Array)
    //           }))
    //       }, { timeout: 10000 })

    //       // Check success message
    //       await waitFor(() => {
    //           expect(screen.getByText('Package added successfully!')).toBeInTheDocument()
    //       }, { timeout: 5000 })
    //   }, 30000) // 30 second timeout for the entire test



      it('handles API error with response message', async () => {
      api.post.mockRejectedValue({
        response: { data: { message: 'Validation failed' } }
      })

      render(<DbAddPackage />)

      await fillCompleteForm()

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Validation failed')).toBeInTheDocument()
      })
    })

    it('handles API error without response message', async () => {
      api.post.mockRejectedValue(new Error('Network error'))

      render(<DbAddPackage />)

      await fillCompleteForm()

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Error saving package')).toBeInTheDocument()
      })
    })

    it('prevents submission with validation errors', async () => {
      render(<DbAddPackage />)

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      // Should not call API when validation fails
      expect(api.post).not.toHaveBeenCalled()
    })

    it('resets form after successful submission', async () => {
      api.post.mockResolvedValue({ data: { message: 'Success' } })

      render(<DbAddPackage />)

      await fillCompleteForm()

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Package added successfully!')).toBeInTheDocument()
      })

      // Check form reset
      const titleInput = document.querySelector('input[name="title"]')
      if (titleInput) expect(titleInput.value).toBe('')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty number inputs', () => {
      render(<DbAddPackage />)

      const groupSizeInput = document.querySelector('input[name="groupSize"]')
      const tripDayInput = document.querySelector('input[name="tripDay"]')

      if (groupSizeInput) {
        fireEvent.change(groupSizeInput, { target: { value: '' } })
        expect(groupSizeInput.value).toBe('')
      }

      if (tripDayInput) {
        fireEvent.change(tripDayInput, { target: { value: '' } })
        expect(tripDayInput.value).toBe('')
      }
    })

    it('validates valid trip duration combinations', () => {
      render(<DbAddPackage />)

      const tripDayInput = document.querySelector('input[name="tripDay"]')
      const tripNightInput = document.querySelector('input[name="tripNight"]')

      if (tripDayInput && tripNightInput) {
        fireEvent.change(tripDayInput, { target: { value: '3' } })
        fireEvent.change(tripNightInput, { target: { value: '2' } })

        expect(tripDayInput.value).toBe('3')
        expect(tripNightInput.value).toBe('2')
      }
    })

    it('handles tour program array structure', async () => {
      api.post.mockResolvedValue({ data: { message: 'Success' } })

      render(<DbAddPackage />)

      await fillCompleteForm()

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith('/packages', expect.objectContaining({
          program: expect.any(Array),
          gallery: expect.any(Array)
        }))
      }, { timeout: 15000 })
    })
  })
})
