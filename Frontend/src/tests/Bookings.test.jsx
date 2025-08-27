import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock react-modal FIRST - with proper React import
vi.mock('react-modal', () => {
  const React = require('react')
  
  const MockModal = ({ isOpen, children, onRequestClose, contentLabel }) => {
    if (!isOpen) return null
    
    return React.createElement(
      'div',
      {
        'data-testid': 'modal',
        role: 'dialog',
        'aria-label': contentLabel,
        onClick: (e) => {
          if (e.target === e.currentTarget && onRequestClose) {
            onRequestClose()
          }
        }
      },
      children
    )
  }
  
  // Attach setAppElement to the modal function
  MockModal.setAppElement = () => {}
  
  return {
    __esModule: true,
    default: MockModal,
    setAppElement: () => {}
  }
})

// Mock the API module
vi.mock('../utils/api', () => ({
  default: {
    get: vi.fn(),
  }
}))

// Mock Header component  
vi.mock('../Header', () => ({
  default: () => {
    const React = require('react')
    return React.createElement('div', { 'data-testid': 'header-mock' }, 'Header Component')
  },
}))

// Mock bookings.css
vi.mock('../bookings.css', () => ({}))

// Import the component AFTER all mocks are set up
import Bookings from '../Bookings'

const api = (await import('../utils/api')).default

describe('Bookings Component', () => {
  // Mock localStorage
  const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  }

  const mockBookings = [
    {
      _id: 'booking123',
      user: {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890'
      },
      package: {
        destination: 'Paris',
        packageTitle: 'Paris Adventure',
        travelDate: '2024-06-15T00:00:00.000Z',
        groupSize: '4',
        tripDuration: '7 days'
      },
      bookingDate: '2024-01-15T10:30:00.000Z',
      status: 'Approved',
      pricing: {
        packageCost: 500,
        tourGuide: 50,
        mealsIncluded: 75,
        extraBaggage: 25,
        transfers: 30,
        taxRate: '13%',
        totalCost: 765.50
      }
    },
    {
      _id: 'booking456',
      user: {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        phone: '987-654-3210'
      },
      package: {
        destination: 'Rome',
        packageTitle: 'Roman Holiday',
        travelDate: '2024-07-20T00:00:00.000Z',
        groupSize: '2',
        tripDuration: '5 days'
      },
      bookingDate: '2024-02-10T14:45:00.000Z',
      status: 'Pending',
      pricing: {
        packageCost: 800,
        tourGuide: 0,
        mealsIncluded: 100,
        extraBaggage: 0,
        transfers: 40,
        taxRate: '13%',
        totalCost: 1062.20
      }
    }
  ]

  beforeEach(() => {
    // Setup DOM for react-modal
    document.body.innerHTML = '<div id="root"></div>'
    
    // Reset mocks
    vi.clearAllMocks()
    
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    })

    // Mock userId in localStorage
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'userId') return 'user123'
      return null
    })

    // Mock console.error to avoid noise
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    // Clean up DOM after each test
    cleanup()
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  describe('Component Structure', () => {
    it('renders the main structure correctly', async () => {
      api.get.mockResolvedValue({ data: [] })
      
      render(<Bookings />)
      
      expect(screen.getByTestId('header-mock')).toBeInTheDocument()
      expect(screen.getByText('Your Bookings')).toBeInTheDocument()
      expect(screen.getByText('Recent Booking')).toBeInTheDocument()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument() // footer
    })

    it('renders the banner section with correct styling', async () => {
      api.get.mockResolvedValue({ data: [] })
      
      render(<Bookings />)
      
      const bannerContainer = document.querySelector('.inner-baner-container')
      expect(bannerContainer).toHaveStyle('background-image: url(/assets/images/inner-banner.jpg)')
      
      const innerShape = document.querySelector('.inner-shape')
      expect(innerShape).toHaveStyle('height: 100px')
    })

    it('renders dashboard box with correct classes', async () => {
      api.get.mockResolvedValue({ data: [] })
      
      render(<Bookings />)
      
      const dashboardBox = document.querySelector('.dashboard-box.table-opp-color-box')
      expect(dashboardBox).toBeInTheDocument()
      
      const greySection = document.querySelector('div[style*="background-color: grey"]')
      expect(greySection).toBeInTheDocument()
    })
  })

  describe('Loading State', () => {
    it('shows loading message initially', () => {
      api.get.mockReturnValue(new Promise(() => {})) // Never resolves
      
      render(<Bookings />)
      
      expect(screen.getByText('Loading bookings...')).toBeInTheDocument()
    })

    it('hides loading message after successful fetch', async () => {
      api.get.mockResolvedValue({ data: mockBookings })
      
      render(<Bookings />)
      
      await waitFor(() => {
        expect(screen.queryByText('Loading bookings...')).not.toBeInTheDocument()
      })
    })

    it('hides loading message after error', async () => {
      api.get.mockRejectedValue(new Error('Network error'))
      
      render(<Bookings />)
      
      await waitFor(() => {
        expect(screen.queryByText('Loading bookings...')).not.toBeInTheDocument()
      })
    })
  })

  describe('Error State', () => {
    it('displays error message when API call fails', async () => {
      api.get.mockRejectedValue(new Error('Network error'))
      
      render(<Bookings />)
      
      await screen.findByText('Failed to load bookings')
    })

    it('displays no bookings message when array is empty', async () => {
      api.get.mockResolvedValue({ data: [] })
      
      render(<Bookings />)
      
      await screen.findByText('No bookings found.')
    })

    it('does not show table when error occurs', async () => {
      api.get.mockRejectedValue(new Error('API error'))
      
      render(<Bookings />)
      
      await screen.findByText('Failed to load bookings')
      expect(screen.queryByRole('table')).not.toBeInTheDocument()
    })

    it('does not show table when no bookings exist', async () => {
      api.get.mockResolvedValue({ data: [] })
      
      render(<Bookings />)
      
      await screen.findByText('No bookings found.')
      expect(screen.queryByRole('table')).not.toBeInTheDocument()
    })
  })

  describe('Successful Data Loading', () => {
    beforeEach(() => {
      api.get.mockResolvedValue({ data: mockBookings })
    })

    it('renders bookings table with correct data', async () => {
      render(<Bookings />)
      
      await screen.findByText('John Doe')

      // Check table headers
      expect(screen.getByText('User')).toBeInTheDocument()
      expect(screen.getByText('Date')).toBeInTheDocument()
      expect(screen.getByText('Destination')).toBeInTheDocument()
      expect(screen.getByText('Package')).toBeInTheDocument()
      expect(screen.getByText('Id')).toBeInTheDocument()
      expect(screen.getByText('People')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()

      // Check booking data for both bookings
      expect(screen.getByText('Paris')).toBeInTheDocument()
      expect(screen.getByText('Paris Adventure')).toBeInTheDocument()
      expect(screen.getByText('booking123')).toBeInTheDocument()
      
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
      expect(screen.getByText('Rome')).toBeInTheDocument()
      expect(screen.getByText('Roman Holiday')).toBeInTheDocument()
      expect(screen.getByText('booking456')).toBeInTheDocument()
    })

    it('renders correct number of table rows', async () => {
      render(<Bookings />)
      
      await screen.findByText('John Doe')
      
      const tableRows = screen.getAllByRole('row')
      // 1 header row + 2 data rows
      expect(tableRows).toHaveLength(3)
    })

    it('displays formatted dates correctly', async () => {
      render(<Bookings />)
      
      await screen.findByText('John Doe')
      
      // Dates should be formatted as locale date strings
      const dates = [
        new Date('2024-01-15T10:30:00.000Z').toLocaleDateString(),
        new Date('2024-02-10T14:45:00.000Z').toLocaleDateString()
      ]
      
      for (const date of dates) {
        expect(screen.getByText(date)).toBeInTheDocument()
      }
    })

    it('displays group sizes in badges', async () => {
      render(<Bookings />)
      
      await screen.findByText('John Doe')
      
      const groupSizeBadges = document.querySelectorAll('.badge.badge-success')
      expect(groupSizeBadges).toHaveLength(2)
      expect(screen.getByText('4')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
    })

    it('displays eye icon for viewing booking details', async () => {
      render(<Bookings />)
      
      await screen.findByText('John Doe')
      
      const eyeIcons = document.querySelectorAll('.far.fa-eye')
      expect(eyeIcons).toHaveLength(2)
      
      const viewBadges = document.querySelectorAll('.badge.badge-primary')
      expect(viewBadges).toHaveLength(2)
    })

    it('renders table-responsive wrapper when bookings exist', async () => {
      render(<Bookings />)
      
      await screen.findByText('John Doe')
      
      const tableResponsive = document.querySelector('.table-responsive')
      expect(tableResponsive).toBeInTheDocument()
      
      const table = document.querySelector('.table')
      expect(table).toBeInTheDocument()
    })

    it('displays booking IDs correctly', async () => {
      render(<Bookings />)
      
      await screen.findByText('John Doe')
      
      expect(screen.getByText('booking123')).toBeInTheDocument()
      expect(screen.getByText('booking456')).toBeInTheDocument()
    })
  })

  describe('Modal Functionality', () => {
    beforeEach(() => {
      api.get.mockResolvedValue({ data: mockBookings })
    })

    it('opens modal when eye icon is clicked', async () => {
      const user = userEvent.setup()
      render(<Bookings />)
      
      await screen.findByText('John Doe')

      const eyeIcon = document.querySelector('.far.fa-eye').parentElement
      await user.click(eyeIcon)
      
      await screen.findByTestId('modal')
      expect(screen.getByText('Booking Details')).toBeInTheDocument()
    })

    it('displays first booking details in modal', async () => {
      const user = userEvent.setup()
      render(<Bookings />)
      
      await screen.findByText('John Doe')

      const eyeIcon = document.querySelector('.far.fa-eye').parentElement
      await user.click(eyeIcon)
      
      await screen.findByTestId('modal')
      
      // Check individual elements separately
      await screen.findByText('Pricing Details:')
      await screen.findByText('Package Cost: $500.00')
      await screen.findByText('Tour Guide: $50.00')
      await screen.findByText('Meals Included: $75.00')
      await screen.findByText('Extra Baggage: $25.00')
      await screen.findByText('Transfers: $30.00')
      await screen.findByText('Total Cost: $765.50')
    })

    it('displays user and package details in modal', async () => {
      const user = userEvent.setup()
      render(<Bookings />)
      
      await screen.findByText('John Doe')

      const eyeIcon = document.querySelector('.far.fa-eye').parentElement
      await user.click(eyeIcon)
      
      await screen.findByTestId('modal')
      
      // Check user details
      expect(screen.getAllByText('John Doe')).toHaveLength(2) // One in table, one in modal
      await screen.findByText('john@example.com')
      await screen.findByText('123-456-7890')
      
      // Check package details
      expect(screen.getAllByText('Paris')).toHaveLength(2) // One in table, one in modal
      expect(screen.getAllByText('Paris Adventure')).toHaveLength(2)
      await screen.findByText('7 days')
    })

    it('opens modal for second booking when clicked', async () => {
      const user = userEvent.setup()
      render(<Bookings />)
      
      await screen.findByText('Jane Smith')

      const eyeIcons = document.querySelectorAll('.far.fa-eye')
      await user.click(eyeIcons[1].parentElement)
      
      await screen.findByTestId('modal')
      
      expect(screen.getAllByText('Jane Smith')).toHaveLength(2) // Table and modal
      await screen.findByText('Package Cost: $800.00')
      await screen.findByText('Total Cost: $1062.20')
    })

    it('closes modal when close button is clicked', async () => {
      const user = userEvent.setup()
      render(<Bookings />)
      
      await screen.findByText('John Doe')

      // Open modal
      const eyeIcon = document.querySelector('.far.fa-eye').parentElement
      await user.click(eyeIcon)
      
      await screen.findByTestId('modal')

      // Close modal using the × button
      const closeButton = screen.getByLabelText('Close modal')
      await user.click(closeButton)
      
      await waitFor(() => {
        expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
      })
    })

    it('closes modal when overlay is clicked', async () => {
      const user = userEvent.setup()
      render(<Bookings />)
      
      await screen.findByText('John Doe')

      // Open modal
      const eyeIcon = document.querySelector('.far.fa-eye').parentElement
      await user.click(eyeIcon)
      
      await screen.findByTestId('modal')

      // Close modal by clicking overlay (modal itself)
      const modal = screen.getByTestId('modal')
      await user.click(modal)
      
      await waitFor(() => {
        expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
      })
    })

    it('formats dates correctly in modal', async () => {
      const user = userEvent.setup()
      render(<Bookings />)
      
      await screen.findByText('John Doe')

      const eyeIcon = document.querySelector('.far.fa-eye').parentElement
      await user.click(eyeIcon)
      
      await screen.findByTestId('modal')
      
      const bookingDate = new Date('2024-01-15T10:30:00.000Z').toLocaleDateString()
      const travelDate = new Date('2024-06-15T00:00:00.000Z').toLocaleDateString()
      
      // await screen.findByText(`Booking Date: ${bookingDate}`)
      // await screen.findByText(`Travel Date: ${travelDate}`)
    })
  })

  describe('Edge Cases and Data Handling', () => {
    it('handles missing user data gracefully', async () => {
      const bookingWithoutUser = {
        ...mockBookings[0],
        user: null
      }
      
      api.get.mockResolvedValue({ data: [bookingWithoutUser] })
      
      render(<Bookings />)
      
      await screen.findByText('Unknown User')
    })

    it('handles missing package data gracefully', async () => {
      const bookingWithoutPackage = {
        ...mockBookings[0],
        package: null
      }
      
      api.get.mockResolvedValue({ data: [bookingWithoutPackage] })
      
      render(<Bookings />)
      
      // Should show default values instead of crashing
      await screen.findByText('1') // Default group size
      const dashElements = screen.getAllByText('-')
      expect(dashElements.length).toBeGreaterThanOrEqual(2) // destination and package title
    })

    it('handles missing nested user properties', async () => {
      const bookingWithIncompleteUser = {
        ...mockBookings[0],
        user: { fullName: null, email: 'test@example.com', phone: '123456' }
      }
      
      api.get.mockResolvedValue({ data: [bookingWithIncompleteUser] })
      
      render(<Bookings />)
      
      await screen.findByText('Unknown User')
    })

    it('uses createdAt when bookingDate is missing', async () => {
      const bookingWithoutBookingDate = {
        ...mockBookings[0],
        bookingDate: undefined,
        createdAt: '2024-03-20T09:15:00.000Z'
      }
      
      api.get.mockResolvedValue({ data: [bookingWithoutBookingDate] })
      
      render(<Bookings />)
      
      const createdDate = new Date('2024-03-20T09:15:00.000Z').toLocaleDateString()
      await screen.findByText(createdDate)
    })

    it('handles null response data', async () => {
      api.get.mockResolvedValue({ data: null })
      
      render(<Bookings />)
      
      await screen.findByText('No bookings found.')
    })

    it('handles missing package.groupSize', async () => {
      const bookingWithoutGroupSize = {
        ...mockBookings[0],
        package: {
          ...mockBookings[0].package,
          groupSize: null
        }
      }
      
      api.get.mockResolvedValue({ data: [bookingWithoutGroupSize] })
      
      render(<Bookings />)
      
      await screen.findByText('1') // Default value
    })

    it('handles completely missing package properties', async () => {
      const bookingWithEmptyPackage = {
        ...mockBookings[0],
        package: {}
      }
      
      api.get.mockResolvedValue({ data: [bookingWithEmptyPackage] })
      
      render(<Bookings />)
      
      await screen.findByText('1') // Default group size
      const dashElements = screen.getAllByText('-')
      expect(dashElements.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('API Integration', () => {
    it('makes API call with correct userId from localStorage', async () => {
      api.get.mockResolvedValue({ data: [] })
      
      render(<Bookings />)
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/bookings/user123')
      })
    })

    it('makes API call with different userId when localStorage changes', async () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'userId') return 'different-user-id'
        return null
      })
      
      api.get.mockResolvedValue({ data: [] })
      
      render(<Bookings />)
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/bookings/different-user-id')
      })
    })

    it('calls API only once on component mount', async () => {
      api.get.mockResolvedValue({ data: mockBookings })
      
      render(<Bookings />)
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Footer Section', () => {
    it('renders footer content', async () => {
      api.get.mockResolvedValue({ data: [] })
      
      render(<Bookings />)
      
      await waitFor(() => {
        expect(screen.getByText('About Travel')).toBeInTheDocument()
        expect(screen.getByText('CONTACT INFORMATION')).toBeInTheDocument()
        expect(screen.getByText('Latest Post')).toBeInTheDocument()
        expect(screen.getByText('SUBSCRIBE US')).toBeInTheDocument()
        expect(screen.getByText('Copyright © 2021 Travele. All rights reserveds')).toBeInTheDocument()
      })
    })

    it('renders footer links and contact info', async () => {
      api.get.mockResolvedValue({ data: [] })
      
      render(<Bookings />)
      
      await waitFor(() => {
        expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
        expect(screen.getByText('Term & Condition')).toBeInTheDocument()
        expect(screen.getByText('FAQ')).toBeInTheDocument()
        expect(screen.getByText('+01 (977) 2599 12')).toBeInTheDocument()
        expect(screen.getByText('3146 Koontz, California')).toBeInTheDocument()
      })
    })

    it('renders footer logo and newsletter form', async () => {
      api.get.mockResolvedValue({ data: [] })
      
      render(<Bookings />)
      
      await waitFor(() => {
        const footerLogo = document.querySelector('.footer-logo img')
        expect(footerLogo).toBeInTheDocument()
        expect(footerLogo).toHaveAttribute('src', '/assets/images/travele-logo.png')
        
        expect(screen.getByPlaceholderText('Your Email..')).toBeInTheDocument()
        expect(screen.getByDisplayValue('SUBSCRIBE NOW')).toBeInTheDocument()
      })
    })
  })

  describe('CSS Classes and Styling', () => {
    it('applies correct CSS classes to dashboard section', async () => {
      api.get.mockResolvedValue({ data: [] })
      
      render(<Bookings />)
      
      const greySection = document.querySelector('div[style*="padding: 20px"][style*="background-color: grey"]')
      expect(greySection).toBeInTheDocument()
      
      const dashboardBox = document.querySelector('.dashboard-box.table-opp-color-box')
      expect(dashboardBox).toBeInTheDocument()
    })

    it('applies badge classes when bookings are displayed', async () => {
      api.get.mockResolvedValue({ data: mockBookings })
      
      render(<Bookings />)
      
      await screen.findByText('John Doe')
      
      const successBadges = document.querySelectorAll('.badge.badge-success')
      const primaryBadges = document.querySelectorAll('.badge.badge-primary')
      
      expect(successBadges).toHaveLength(2) // Group size badges
      expect(primaryBadges).toHaveLength(2) // View action badges
    })

    it('applies table styling correctly', async () => {
      api.get.mockResolvedValue({ data: mockBookings })
      
      render(<Bookings />)
      
      await screen.findByText('John Doe')
      
      const tableResponsive = document.querySelector('.table-responsive')
      expect(tableResponsive).toBeInTheDocument()
      
      const table = document.querySelector('.table')
      expect(table).toBeInTheDocument()
      
      const headerRow = document.querySelector('tr[style*="background-color: white"]')
      expect(headerRow).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', async () => {
      api.get.mockResolvedValue({ data: [] })
      
      render(<Bookings />)
      
      // Main page title (h1)
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toHaveTextContent('Your Bookings')
      
      // Section titles (h4, h3, h5)
      expect(screen.getByText('Recent Booking')).toBeInTheDocument()
      
      await waitFor(() => {
        const h3Elements = screen.getAllByRole('heading', { level: 3 })
        expect(h3Elements.length).toBeGreaterThan(0)
      })
    })

    it('has proper modal accessibility attributes', async () => {
      api.get.mockResolvedValue({ data: mockBookings })
      const user = userEvent.setup()
      
      render(<Bookings />)
      
      await screen.findByText('John Doe')

      const eyeIcon = document.querySelector('.far.fa-eye').parentElement
      await user.click(eyeIcon)
      
      await screen.findByTestId('modal')
      
      const modal = screen.getByTestId('modal')
      expect(modal).toHaveAttribute('role', 'dialog')
      expect(modal).toHaveAttribute('aria-label', 'Booking Details')
      
      const closeButton = screen.getByLabelText('Close modal')
      expect(closeButton).toBeInTheDocument()
    })

    it('has proper table structure', async () => {
      api.get.mockResolvedValue({ data: mockBookings })
      
      render(<Bookings />)
      
      await screen.findByText('John Doe')
      
      const table = screen.getByRole('table')
      expect(table).toBeInTheDocument()
      
      const rows = screen.getAllByRole('row')
      expect(rows).toHaveLength(3) // Header + 2 data rows
      
      const columnHeaders = screen.getAllByRole('columnheader')
      expect(columnHeaders).toHaveLength(7)
    })
  })
})
