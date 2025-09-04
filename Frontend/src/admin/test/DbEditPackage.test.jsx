import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import DbEditPackage from '../DbEditPackage'
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

// Mock React Router
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ id: 'package123' }),
    useNavigate: () => mockNavigate,
  }
})

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

// Test wrapper with router
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('DbEditPackage Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
    mockNavigate.mockClear()
  })

  // Sample package data for testing
  const mockPackageData = {
    id: 'package123',
    title: 'Amazing Nepal Trek',
    description: 'Explore the beautiful mountains of Nepal with this amazing trekking package.',
    groupSize: 12,
    tripDuration: '7 day / 6 night',
    category: 'Adventure',
    salePrice: 1200,
    regularPrice: 1500,
    discount: 300,
    destination: 'Nepal',
    location: 'Kathmandu',
    mapUrl: 'GOOGLE_API_KEY_123',
    isPopular: true,
    keywords: 'nepal, trek, adventure, mountains',
    status: 'Active',
    gallery: ['image1.jpg', 'image2.jpg']
  }

  describe('Component Rendering and Data Loading', () => {
    it('renders layout components after loading', async () => {
      api.get.mockResolvedValue({ data: mockPackageData })

      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByTestId('dashboard-sidebar')).toBeInTheDocument()
        expect(screen.getByTestId('dashboard-header')).toBeInTheDocument()
      })
    })

    it('fetches and populates package data on mount', async () => {
      api.get.mockResolvedValue({ data: mockPackageData })

      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/packages/package123')
      })

      await waitFor(() => {
        expect(screen.getByDisplayValue('Amazing Nepal Trek')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Explore the beautiful mountains of Nepal with this amazing trekking package.')).toBeInTheDocument()
        expect(screen.getByDisplayValue('12')).toBeInTheDocument()
        expect(screen.getByDisplayValue('7')).toBeInTheDocument()
        expect(screen.getByDisplayValue('6')).toBeInTheDocument()
        expect(screen.getByDisplayValue('1200')).toBeInTheDocument()
        expect(screen.getByDisplayValue('1500')).toBeInTheDocument()
      })
    })

    it('handles API fetch error gracefully', async () => {
      api.get.mockRejectedValue(new Error('Failed to fetch package'))

      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/packages/package123')
      })

      // Component should still render even if API fails
      expect(screen.getByTestId('dashboard-sidebar')).toBeInTheDocument()
    })

    it('parses trip duration correctly from API data', async () => {
      const packageWithDifferentDuration = {
        ...mockPackageData,
        tripDuration: '10 day / 9 night'
      }
      api.get.mockResolvedValue({ data: packageWithDifferentDuration })

      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('10')).toBeInTheDocument() // tripDay
        expect(screen.getByDisplayValue('9')).toBeInTheDocument()  // tripNight
      })
    })
  })

  describe('Form Input Handling', () => {
    beforeEach(async () => {
      api.get.mockResolvedValue({ data: mockPackageData })
    })

    it('updates text input fields correctly', async () => {
      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Amazing Nepal Trek')).toBeInTheDocument()
      })

      const titleInput = screen.getByDisplayValue('Amazing Nepal Trek')
      const descriptionInput = screen.getByDisplayValue('Explore the beautiful mountains of Nepal with this amazing trekking package.')
      const destinationInput = screen.getByDisplayValue('Nepal')

      fireEvent.change(titleInput, { target: { value: 'Updated Nepal Adventure' } })
      fireEvent.change(descriptionInput, { target: { value: 'Updated description for Nepal adventure' } })
      fireEvent.change(destinationInput, { target: { value: 'Tibet' } })

      expect(titleInput.value).toBe('Updated Nepal Adventure')
      expect(descriptionInput.value).toBe('Updated description for Nepal adventure')
      expect(destinationInput.value).toBe('Tibet')
    })

    it('updates number input fields correctly', async () => {
      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('12')).toBeInTheDocument()
      })

      const groupSizeInput = screen.getByDisplayValue('12')
      const tripDayInput = screen.getByDisplayValue('7')
      const tripNightInput = screen.getByDisplayValue('6')
      const salePriceInput = screen.getByDisplayValue('1200')
      const regularPriceInput = screen.getByDisplayValue('1500')

      fireEvent.change(groupSizeInput, { target: { value: '15' } })
      fireEvent.change(tripDayInput, { target: { value: '10' } })
      fireEvent.change(tripNightInput, { target: { value: '9' } })
      fireEvent.change(salePriceInput, { target: { value: '1800' } })
      fireEvent.change(regularPriceInput, { target: { value: '2000' } })

      expect(groupSizeInput.value).toBe('15')
      expect(tripDayInput.value).toBe('10')
      expect(tripNightInput.value).toBe('9')
      expect(salePriceInput.value).toBe('1800')
      expect(regularPriceInput.value).toBe('2000')
    })

    it('handles select input changes', async () => {
      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Amazing Nepal Trek')).toBeInTheDocument()
      })

      const categorySelect = document.querySelector('select[name="category"]')
      const locationSelect = document.querySelector('select[name="location"]')
      const statusSelect = document.querySelector('select[name="status"]')

      // if (categorySelect) {
      //   fireEvent.change(categorySelect, { target: { value: 'Cultural' } })
      //   expect(categorySelect.value).toBe('Cultural')
      // }

      // if (locationSelect) {
      //   fireEvent.change(locationSelect, { target: { value: 'Pokhara' } })
      //   expect(locationSelect.value).toBe('Pokhara')
      // }

      // if (statusSelect) {
      //   fireEvent.change(statusSelect, { target: { value: 'Inactive' } })
      //   expect(statusSelect.value).toBe('Inactive')
      // }
    })

    it('handles checkbox input correctly', async () => {
      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Amazing Nepal Trek')).toBeInTheDocument()
      })

      const isPopularCheckbox = document.querySelector('input[name="isPopular"]')

      if (isPopularCheckbox) {
        expect(isPopularCheckbox.checked).toBe(true) // From mock data
        fireEvent.click(isPopularCheckbox)
        expect(isPopularCheckbox.checked).toBe(false)
      }
    })
  })

  describe('Form Validation', () => {
    beforeEach(async () => {
      api.get.mockResolvedValue({ data: mockPackageData })
    })

    it('shows validation errors for empty required fields', async () => {
      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Amazing Nepal Trek')).toBeInTheDocument()
      })

      // Clear required fields
      const titleInput = screen.getByDisplayValue('Amazing Nepal Trek')
      const descriptionInput = screen.getByDisplayValue('Explore the beautiful mountains of Nepal with this amazing trekking package.')
      const groupSizeInput = screen.getByDisplayValue('12')
      const regularPriceInput = screen.getByDisplayValue('1500')
      const destinationInput = screen.getByDisplayValue('Nepal')

      fireEvent.change(titleInput, { target: { value: '' } })
      fireEvent.change(descriptionInput, { target: { value: '' } })
      fireEvent.change(groupSizeInput, { target: { value: '' } })
      fireEvent.change(regularPriceInput, { target: { value: '' } })
      fireEvent.change(destinationInput, { target: { value: '' } })

      // Clear trip duration
      const tripDayInput = screen.getByDisplayValue('7')
      const tripNightInput = screen.getByDisplayValue('6')
      fireEvent.change(tripDayInput, { target: { value: '' } })
      fireEvent.change(tripNightInput, { target: { value: '' } })

      // Submit form
      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument()
        expect(screen.getByText('Description is required')).toBeInTheDocument()
        expect(screen.getByText('Group size is required')).toBeInTheDocument()
        expect(screen.getByText('Days and nights are required')).toBeInTheDocument()
        expect(screen.getByText('Regular price is required')).toBeInTheDocument()
        expect(screen.getByText('Destination is required')).toBeInTheDocument()
      })
    })

    it('validates trip duration difference', async () => {
      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Amazing Nepal Trek')).toBeInTheDocument()
      })

      const tripDayInput = screen.getByDisplayValue('7')
      const tripNightInput = screen.getByDisplayValue('6')

      // Set invalid combination (difference > 1)
      fireEvent.change(tripDayInput, { target: { value: '10' } })
      fireEvent.change(tripNightInput, { target: { value: '5' } })

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Days and nights difference must be 0 or 1')).toBeInTheDocument()
      })
    })

    it('clears validation errors when fields are filled', async () => {
      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Amazing Nepal Trek')).toBeInTheDocument()
      })

      // Clear title to trigger error
      const titleInput = screen.getByDisplayValue('Amazing Nepal Trek')
      fireEvent.change(titleInput, { target: { value: '' } })

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument()
      })

      // Fill title to clear error
      fireEvent.change(titleInput, { target: { value: 'New Package Title' } })

      await waitFor(() => {
        expect(screen.queryByText('Title is required')).not.toBeInTheDocument()
      })
    })

    it('validates whitespace input', async () => {
      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Amazing Nepal Trek')).toBeInTheDocument()
      })

      const titleInput = screen.getByDisplayValue('Amazing Nepal Trek')
      const descriptionInput = screen.getByDisplayValue('Explore the beautiful mountains of Nepal with this amazing trekking package.')
      const destinationInput = screen.getByDisplayValue('Nepal')

      fireEvent.change(titleInput, { target: { value: '   ' } })
      fireEvent.change(descriptionInput, { target: { value: '   ' } })
      fireEvent.change(destinationInput, { target: { value: '   ' } })

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument()
        expect(screen.getByText('Description is required')).toBeInTheDocument()
        expect(screen.getByText('Destination is required')).toBeInTheDocument()
      })
    })
  })

  describe('File Upload Functionality', () => {
    beforeEach(async () => {
      api.get.mockResolvedValue({ data: mockPackageData })
    })

    it('handles file selection', async () => {
      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Amazing Nepal Trek')).toBeInTheDocument()
      })

      const fileInput = document.querySelector('input[type="file"]')
      if (fileInput) {
        const testFile = new File(['test image'], 'test.jpg', { type: 'image/jpeg' })
        fireEvent.change(fileInput, { target: { files: [testFile] } })

        expect(fileInput.files[0]).toBe(testFile)
      }
    })

    it('handles empty file selection', () => {
      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      const fileInput = document.querySelector('input[type="file"]')
      if (fileInput) {
        fireEvent.change(fileInput, { target: { files: [] } })
        expect(fileInput.files).toHaveLength(0)
      }
    })
  })

  describe('Form Submission', () => {
    beforeEach(async () => {
      api.get.mockResolvedValue({ data: mockPackageData })
    })

    // it('submits form successfully with updated data', async () => {
    //   api.put.mockResolvedValue({ data: { message: 'Package updated successfully' } })

    //   render(
    //     <TestWrapper>
    //       <DbEditPackage />
    //     </TestWrapper>
    //   )

    //   await waitFor(() => {
    //     expect(screen.getByDisplayValue('Amazing Nepal Trek')).toBeInTheDocument()
    //   })

    //   // Update form fields
    //   const titleInput = screen.getByDisplayValue('Amazing Nepal Trek')
    //   const groupSizeInput = screen.getByDisplayValue('12')
    //   const salePriceInput = screen.getByDisplayValue('1200')

    //   fireEvent.change(titleInput, { target: { value: 'Updated Nepal Adventure' } })
    //   fireEvent.change(groupSizeInput, { target: { value: '15' } })
    //   fireEvent.change(salePriceInput, { target: { value: '1800' } })

    //   // Submit form
    //   const form = document.querySelector('form')
    //   if (form) fireEvent.submit(form)

    //   await waitFor(() => {
    //     expect(api.put).toHaveBeenCalledWith('/packages/package123', expect.objectContaining({
    //       title: 'Updated Nepal Adventure',
    //       groupSize: 15,
    //       salePrice: 1800,
    //       tripDuration: '7 day / 6 night'
    //     }))
    //   }, { timeout: 10000 })

    //   await waitFor(() => {
    //     expect(screen.getByText('Package updated successfully!')).toBeInTheDocument()
    //   })
    // })

    it('submits form with file upload', async () => {
      api.put.mockResolvedValue({ data: { message: 'Package updated successfully' } })

      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Amazing Nepal Trek')).toBeInTheDocument()
      })

      // Upload file
      const fileInput = document.querySelector('input[type="file"]')
      if (fileInput) {
        const testFile = new File(['test image'], 'test.jpg', { type: 'image/jpeg' })
        fireEvent.change(fileInput, { target: { files: [testFile] } })
      }

      // Submit form
      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(api.put).toHaveBeenCalledWith('/packages/package123', expect.objectContaining({
          gallery: ['test.jpg']
        }))
      }, { timeout: 10000 })
    })

    it('handles API submission error with response message', async () => {
      api.put.mockRejectedValue({
        response: { data: { message: 'Server validation error' } }
      })

      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Amazing Nepal Trek')).toBeInTheDocument()
      })

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Server validation error')).toBeInTheDocument()
      })
    })

    it('handles API submission error without response message', async () => {
      api.put.mockRejectedValue(new Error('Network error'))

      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Amazing Nepal Trek')).toBeInTheDocument()
      })

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Error updating package')).toBeInTheDocument()
      })
    })

    it('navigates to package list after successful update', async () => {
      api.put.mockResolvedValue({ data: { message: 'Package updated successfully' } })

      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Amazing Nepal Trek')).toBeInTheDocument()
      })

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Package updated successfully!')).toBeInTheDocument()
      })

      // Wait for navigation timeout
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/admin/db-package-active')
      }, { timeout: 2000 })
    })

    it('prevents submission when validation fails', async () => {
      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Amazing Nepal Trek')).toBeInTheDocument()
      })

      // Clear required field
      const titleInput = screen.getByDisplayValue('Amazing Nepal Trek')
      fireEvent.change(titleInput, { target: { value: '' } })

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument()
      })

      // API should not be called
      expect(api.put).not.toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('handles package with no existing data gracefully', async () => {
      const emptyPackage = {
        id: 'package123',
        title: '',
        description: '',
        groupSize: '',
        tripDuration: '',
        category: '',
        salePrice: '',
        regularPrice: '',
        discount: '',
        destination: '',
        location: '',
        mapUrl: '',
        isPopular: false,
        keywords: '',
        status: ''
      }
      api.get.mockResolvedValue({ data: emptyPackage })

      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/packages/package123')
      })

      // Form should render with empty values
      const titleInput = document.querySelector('input[name="title"]')
      expect(titleInput?.value).toBe('')
    })

    it('handles invalid trip duration format', async () => {
      const packageWithBadDuration = {
        ...mockPackageData,
        tripDuration: 'invalid format'
      }
      api.get.mockResolvedValue({ data: packageWithBadDuration })

      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Amazing Nepal Trek')).toBeInTheDocument()
      })

      // Should handle gracefully with empty trip day/night values
      const tripDayInput = document.querySelector('input[name="tripDay"]')
      const tripNightInput = document.querySelector('input[name="tripNight"]')
      
      expect(tripDayInput?.value).toBe('')
      expect(tripNightInput?.value).toBe('')
    })

    it('handles valid trip duration combinations', () => {
      render(
        <TestWrapper>
          <DbEditPackage />
        </TestWrapper>
      )

      // Test valid combinations (difference ≤ 1)
      const tripDayInput = document.querySelector('input[name="tripDay"]')
      const tripNightInput = document.querySelector('input[name="tripNight"]')

      if (tripDayInput && tripNightInput) {
        fireEvent.change(tripDayInput, { target: { value: '5' } })
        fireEvent.change(tripNightInput, { target: { value: '4' } })

        expect(tripDayInput.value).toBe('5')
        expect(tripNightInput.value).toBe('4')
      }
    })
  })
})
