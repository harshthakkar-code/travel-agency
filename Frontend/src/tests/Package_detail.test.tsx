import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'
import Package_detail from '../Package-detail'
import api from '../utils/api'

// Mock API
vi.mock('../utils/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  }
}))

// Mock Header component
vi.mock('../Header', () => ({
  default: () => <div data-testid="header-mock">Header Component</div>
}))

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

// Mock localStorage with debug logging
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => { 
      console.log('localStorage.setItem called:', key)
      store[key] = value 
    }),
    removeItem: vi.fn((key) => { 
      delete store[key] 
    }),
    clear: vi.fn(() => { 
      store = {} 
    })
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
})

const renderWithRouter = (ui, route = '/package/123') => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/package/:id" element={ui} />
      </Routes>
    </MemoryRouter>
  )
}

const mockPackage = {
  _id: '123',
  title: 'Amazing Thailand Tour',
  description: 'Experience the beauty of Thailand.',
  tripDuration: '7D/6N',
  groupSize: 15,
  destination: 'Thailand',
  rating: 4.5,
  salePrice: 1200,
  gallery: ['/assets/images/thailand1.jpg'],
  program: [
    { _id: 'c1', city: 'Bangkok', activities: ['Visit Grand Palace'] }
  ],
  mapUrl: 'https://maps.example.com'
}

const mockReviews = [
  {
    _id: 'r1',
    rating: 5,
    comment: 'Amazing experience!',
    userName: 'John',
    createdAt: '2024-01-15T10:30:00.000Z',
    user: { _id: 'u1' }
  }
]

describe('Package_detail Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.clear()
    mockNavigate.mockClear()
  })

  it('shows loading state initially', () => {
    api.get.mockImplementation(() => new Promise(() => {}))
    
    renderWithRouter(<Package_detail />)
    
    expect(screen.getByTestId('header-mock')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('shows error when package not found', async () => {
    api.get.mockRejectedValue(new Error('Not found'))
    
    renderWithRouter(<Package_detail />)
    
    await waitFor(() => {
      expect(screen.getByText('Package not found.')).toBeInTheDocument()
    })
  })

  it('renders package details successfully', async () => {
    api.get.mockImplementation((url) => {
      if (url.includes('/packages/')) {
        return Promise.resolve({ data: mockPackage })
      }
      if (url === '/reviews') {
        return Promise.resolve({ data: mockReviews })
      }
      return Promise.reject(new Error('Not found'))
    })
    
    renderWithRouter(<Package_detail />)
    
    await waitFor(() => {
      expect(screen.getAllByText('Amazing Thailand Tour')[0]).toBeInTheDocument()
    })
    
    expect(screen.getByText('7D/6N')).toBeInTheDocument()
    expect(screen.getByText('People: 15')).toBeInTheDocument()
    expect(screen.getByText('Thailand')).toBeInTheDocument()
    expect(screen.getByText('$1200')).toBeInTheDocument()
  })

  it('validates booking form on submit', async () => {
    api.get.mockResolvedValue({ data: mockPackage })
    
    renderWithRouter(<Package_detail />)
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('Book Now')).toBeInTheDocument()
    })
    
    fireEvent.click(screen.getByDisplayValue('Book Now'))
    
    await waitFor(() => {
      expect(screen.getByText('Full Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Phone Number is required')).toBeInTheDocument()
      expect(screen.getByText('Date is required')).toBeInTheDocument()
    })
  })

  // Fixed test with direct form submission
  it('submits booking form with valid data', async () => {
    api.get.mockResolvedValue({ data: mockPackage })
    
    const { container } = renderWithRouter(<Package_detail />)
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Full Name *')).toBeInTheDocument()
    })
    
    // Fill all required fields
    fireEvent.change(screen.getByPlaceholderText('Full Name *'), { 
      target: { value: 'John Doe' } 
    })
    fireEvent.change(screen.getByPlaceholderText('Email *'), { 
      target: { value: 'john@example.com' } 
    })
    fireEvent.change(screen.getByPlaceholderText('Phone Number *'), { 
      target: { value: '1234567890' } 
    })
    
    // Use container.querySelector for date input
    const dateInput = container.querySelector('input[name="date"]')
    fireEvent.change(dateInput, { target: { value: '2025-01-01' } })
    
    // Submit form directly
    const form = container.querySelector('.booking-form')
    fireEvent.submit(form)
    
    // Wait for localStorage call
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'bookingData', 
        expect.any(String)
      )
    }, { timeout: 10000 })
    
    expect(mockNavigate).toHaveBeenCalledWith('/booking')
  }, 15000) // 15 second test timeout

  it('switches between tabs correctly', async () => {
    api.get.mockImplementation((url) => {
      if (url.includes('/packages/')) {
        return Promise.resolve({ data: mockPackage })
      }
      if (url === '/reviews') {
        return Promise.resolve({ data: mockReviews })
      }
      return Promise.reject(new Error('Not found'))
    })
    
    renderWithRouter(<Package_detail />)
    
    await waitFor(() => {
      expect(screen.getByText('DESCRIPTION')).toBeInTheDocument()
    })
    
    fireEvent.click(screen.getByText('REVIEW'))
    
    await waitFor(() => {
      expect(screen.getByText('Amazing experience!')).toBeInTheDocument()
    })
    
    fireEvent.click(screen.getByText('PROGRAM'))
    
    await waitFor(() => {
      expect(screen.getByText('Bangkok')).toBeInTheDocument()
    })
  })

it('submits review successfully with valid data', async () => {
  // Mock user authentication
  localStorageMock.getItem.mockImplementation((key) => {
    if (key === 'token') return 'mock-token'
    if (key === 'userId') return 'user123'
    return null
  })
  
  api.get.mockImplementation((url) => {
    if (url.includes('/packages/')) {
      return Promise.resolve({ data: mockPackage })
    }
    if (url === '/reviews') {
      return Promise.resolve({ data: [] }) // No existing reviews
    }
    return Promise.reject()
  })
  
  api.post.mockResolvedValue({ 
    data: { _id: 'new-review', rating: 5, comment: 'Great!' } 
  })
  
  renderWithRouter(<Package_detail />)
  
  // Navigate to review tab
  await waitFor(() => expect(screen.getByText('REVIEW')).toBeInTheDocument())
  fireEvent.click(screen.getByText('REVIEW'))
  
  // Wait for review form
  await waitFor(() => expect(screen.getByText('Add Your Review')).toBeInTheDocument())
  
  // Rate 5 stars - FIX: Click specific star element
  const stars = screen.getAllByText('★')
  fireEvent.click(stars[4]) // Click the 5th star
  
  // Add comment
  const textarea = screen.getByPlaceholderText('Write your review here')
  fireEvent.change(textarea, { target: { value: 'Amazing tour!' } })
  
  // Submit review
  fireEvent.click(screen.getByDisplayValue('Submit'))
  
  await waitFor(() => {
    expect(api.post).toHaveBeenCalledWith('/reviews', {
      package: '123',
      rating: 5,
      comment: 'Amazing tour!'
    }, {
      headers: { Authorization: 'Bearer mock-token' }
    })
  })
})

it('shows error when user not logged in for review', async () => {
  localStorageMock.getItem.mockImplementation(() => null)
  
  api.get.mockImplementation((url) => {
    if (url.includes('/packages/')) return Promise.resolve({ data: mockPackage })
    if (url === '/reviews') return Promise.resolve({ data: [] })
    return Promise.reject()
  })
  
  // Mock window.alert
  window.alert = vi.fn()
  
  renderWithRouter(<Package_detail />)
  
  await waitFor(() => expect(screen.getByText('REVIEW')).toBeInTheDocument())
  fireEvent.click(screen.getByText('REVIEW'))
  
  await waitFor(() => expect(screen.getByText('Add Your Review')).toBeInTheDocument())
  
  const stars = screen.getAllByText('★')
  fireEvent.click(stars[4]) // FIX: Click specific star element instead of array
  
  const textarea = screen.getByPlaceholderText('Write your review here')
  fireEvent.change(textarea, { target: { value: 'Great tour!' } })
  
  fireEvent.click(screen.getByDisplayValue('Submit'))
  
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('Please login to submit a review.')
  })
})



it('shows error when submitting review without rating', async () => {
  localStorageMock.getItem.mockImplementation((key) => {
    if (key === 'userId') return 'user123'
    return null
  })
  
  api.get.mockImplementation((url) => {
    if (url.includes('/packages/')) return Promise.resolve({ data: mockPackage })
    if (url === '/reviews') return Promise.resolve({ data: [] })
    return Promise.reject()
  })
  
  renderWithRouter(<Package_detail />)
  
  await waitFor(() => expect(screen.getByText('REVIEW')).toBeInTheDocument())
  fireEvent.click(screen.getByText('REVIEW'))
  
  await waitFor(() => expect(screen.getByText('Add Your Review')).toBeInTheDocument())
  
  // Submit without rating
  fireEvent.click(screen.getByDisplayValue('Submit'))
  
  await waitFor(() => {
    expect(screen.getByText('Please select a rating.')).toBeInTheDocument()
  })
})

it('shows error when user not logged in for review', async () => {
  localStorageMock.getItem.mockImplementation(() => null)
  
  api.get.mockImplementation((url) => {
    if (url.includes('/packages/')) return Promise.resolve({ data: mockPackage })
    if (url === '/reviews') return Promise.resolve({ data: [] })
    return Promise.reject()
  })
  
  // Mock window.alert
  window.alert = vi.fn()
  
  renderWithRouter(<Package_detail />)
  
  await waitFor(() => expect(screen.getByText('REVIEW')).toBeInTheDocument())
  fireEvent.click(screen.getByText('REVIEW'))
  
  await waitFor(() => expect(screen.getByText('Add Your Review')).toBeInTheDocument())
  
  const stars = screen.getAllByText('★')
  fireEvent.click(stars[4]) // FIX: Click specific star element instead of array
  
  const textarea = screen.getByPlaceholderText('Write your review here')
  fireEvent.change(textarea, { target: { value: 'Great tour!' } })
  
  fireEvent.click(screen.getByDisplayValue('Submit'))
  
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('Please login to submit a review.')
  })
})


it('clears validation errors when user types', async () => {
  api.get.mockResolvedValue({ data: mockPackage })
  
  renderWithRouter(<Package_detail />)
  
  await waitFor(() => {
    expect(screen.getByDisplayValue('Book Now')).toBeInTheDocument()
  })
  
  // Trigger validation errors
  fireEvent.click(screen.getByDisplayValue('Book Now'))
  
  await waitFor(() => {
    expect(screen.getByText('Email is required')).toBeInTheDocument()
  })
  
  // Type in email field to clear error
  const emailInput = screen.getByPlaceholderText('Email *')
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
  
  await waitFor(() => {
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument()
  })
})

it('handles checkbox changes in booking form', async () => {
  api.get.mockResolvedValue({ data: mockPackage })
  
  renderWithRouter(<Package_detail />)
  
  await waitFor(() => {
    expect(screen.getByText('Tour guide')).toBeInTheDocument()
  })
  
  const tourGuideCheckbox = screen.getByLabelText('Tour guide')
  fireEvent.click(tourGuideCheckbox)
  
  expect(tourGuideCheckbox).toBeChecked()
})


it('handles API errors gracefully', async () => {
  api.get.mockRejectedValue(new Error('Network error'))
  
  renderWithRouter(<Package_detail />)
  
  await waitFor(() => {
    expect(screen.getByText('Package not found.')).toBeInTheDocument()
  })
})


it('renders map with default URL when package mapUrl is missing', async () => {
  const packageWithoutMap = {
    ...mockPackage,
    mapUrl: undefined // Remove mapUrl
  }
  
  api.get.mockResolvedValue({ data: packageWithoutMap })
  
  renderWithRouter(<Package_detail />)
  
  await waitFor(() => {
    expect(screen.getByText('Map')).toBeInTheDocument()
  })
  
  fireEvent.click(screen.getByText('Map'))
  
  await waitFor(() => {
    const iframe = screen.getByTitle('map')
    expect(iframe).toHaveAttribute('src', 'https://www.google.com/maps/embed?pb=...')
  })
})


it('handles missing package data fields', async () => {
  const incompletePackage = {
    _id: '123',
    title: 'Test Package 00',
    // Missing tripDuration, groupSize, destination fields
  }
  
  api.get.mockResolvedValue({ data: incompletePackage })
  
  renderWithRouter(<Package_detail />)
  
  // Use getAllByText since the title appears in multiple places (h1 and h2)
  await waitFor(() => {
    const titles = screen.getAllByText('Test Package 00')
    expect(titles).toHaveLength(2) // Should be in both h1 and h2
    expect(titles[0]).toBeInTheDocument()
    expect(titles[1]).toBeInTheDocument()
  })
  
  // Test specific default values for missing data
  expect(screen.getByText('People: -')).toBeInTheDocument()
  expect(screen.getByText('No description provided.')).toBeInTheDocument()
})


  it('renders static content sections', async () => {
    api.get.mockResolvedValue({ data: mockPackage })
    
    renderWithRouter(<Package_detail />)
    
    await waitFor(() => {
      expect(screen.getByText('TRAVEL TIPS')).toBeInTheDocument()
      expect(screen.getByText('NEED TRAVEL RELATED TIPS & INFORMATION')).toBeInTheDocument()
      expect(screen.getByText('MORE PACKAGES')).toBeInTheDocument()
      expect(screen.getByText('OTHER TRAVEL PACKAGES')).toBeInTheDocument()
    })
  })
})
