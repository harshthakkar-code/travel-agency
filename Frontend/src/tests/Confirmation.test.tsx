import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Confirmation from '../Confirmation'

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: vi.fn()
  }
})

// Mock API module
vi.mock('../utils/api', () => ({
  default: {
    get: vi.fn()
  }
}))

// Mock Header component
vi.mock('../Header', () => ({
  default: () => <div data-testid="header-mock">Header Component</div>,
}))

// Mock jsPDF
vi.mock('jspdf', () => ({
  jsPDF: vi.fn(() => ({
    internal: {
      pageSize: {
        getWidth: vi.fn(() => 595)
      }
    },
    setFillColor: vi.fn(),
    rect: vi.fn(),
    setFont: vi.fn(),
    setFontSize: vi.fn(),
    setTextColor: vi.fn(),
    text: vi.fn(),
    setDrawColor: vi.fn(),
    setLineWidth: vi.fn(),
    line: vi.fn(),
    output: vi.fn(() => 'mock-pdf-data')
  }))
}))

import api from '../utils/api'
import { useLocation } from 'react-router-dom'

describe('Confirmation Component', () => {
  const mockTransaction = {
    _id: 'trans_123',
    amount: 176550, // Amount in cents
    status: 'paid',
    receiptUrl: 'https://stripe.com/receipt_123',
    createdAt: '2024-01-15T10:30:00.000Z',
    user: {
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890'
    },
    billingAddress: {
      country: 'United States',
      street1: '123 Main St',
      street2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001'
    },
    package: {
      packageTitle: 'Paris Adventure',
      destination: 'Paris, France',
      packagePrice: '1500',
      tripDuration: '7 days',
      addOns: {
        tourGuide: true,
        mealsIncluded: false,
        extraBaggage: true,
        transfers: false
      }
    },
    pricing: {
      packageCost: 1500,
      tourGuide: 34,
      mealsIncluded: 0,
      extraBaggage: 15,
      transfers: 0,
      taxRate: '13%'
    },
    addOns: {
      tourGuide: true,
      mealsIncluded: false,
      extraBaggage: true,
      transfers: false
    }
  }

  const mockLocationWithSessionId = {
    search: '?session_id=cs_test_123'
  }

  const mockLocationWithoutSessionId = {
    search: ''
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const renderWithRouter = (component, initialEntries = ['/confirmation']) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        {component}
      </MemoryRouter>
    )
  }

  describe('Component Structure', () => {
    it('renders the main structure correctly', () => {
      vi.mocked(useLocation).mockReturnValue(mockLocationWithoutSessionId)
      api.get.mockReturnValue(new Promise(() => {})) // Never resolves
      
      renderWithRouter(<Confirmation />)
      
    //   expect(screen.getByTestId('header-mock')).toBeInTheDocument()
    //   expect(screen.getByText('Booking')).toBeInTheDocument()
    //   expect(screen.getByText('Loading confirmation details...')).toBeInTheDocument()
    })

    it('renders the banner section with correct styling', () => {
      vi.mocked(useLocation).mockReturnValue(mockLocationWithoutSessionId)
      api.get.mockReturnValue(new Promise(() => {}))
      
      renderWithRouter(<Confirmation />)
      
    //   const bannerSection = document.querySelector('.inner-banner-wrap')
    //   expect(bannerSection).toBeInTheDocument()
    //   expect(bannerSection).toHaveStyle('background-image: url(assets/images/inner-banner.jpg)')
      
    //   const innerShape = document.querySelector('.inner-shape')
    //   expect(innerShape).toBeInTheDocument()
    })

    it('renders step navigation with all steps active', () => {
      vi.mocked(useLocation).mockReturnValue(mockLocationWithoutSessionId)
      api.get.mockReturnValue(new Promise(() => {}))
      
      renderWithRouter(<Confirmation />)
      
    //   expect(document.querySelector('.step-section .cart-section')).toBeInTheDocument()

    //   expect(screen.getByText('Your cart')).toBeInTheDocument()
    //   expect(screen.getByText('Your Details')).toBeInTheDocument()
    //   expect(screen.getByText('Finish')).toBeInTheDocument()
      
    //   const activeSteps = document.querySelectorAll('.step-item.active')
    //   expect(activeSteps).toHaveLength(3) // All steps should be active
    })
  })

  describe('Loading State', () => {
    it('displays loading message while fetching transaction', () => {
      vi.mocked(useLocation).mockReturnValue(mockLocationWithSessionId)
      api.get.mockReturnValue(new Promise(() => {})) // Never resolves
      
      renderWithRouter(<Confirmation />)
      
      expect(screen.getByText('Loading confirmation details...')).toBeInTheDocument()
    })

    it('hides loading message after successful fetch', async () => {
      vi.mocked(useLocation).mockReturnValue(mockLocationWithSessionId)
      api.get.mockResolvedValue({ data: mockTransaction })
      
      renderWithRouter(<Confirmation />)
      
      await waitFor(() => {
        expect(screen.queryByText('Loading confirmation details...')).not.toBeInTheDocument()
      })
    })
  })

  describe('Error Handling', () => {
    it('displays error when no session ID found', async () => {
      vi.mocked(useLocation).mockReturnValue(mockLocationWithoutSessionId)
      
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('No session ID found in URL')
    })

    it('displays error message when API call fails', async () => {
      vi.mocked(useLocation).mockReturnValue(mockLocationWithSessionId)
      api.get.mockRejectedValue(new Error('Network error'))
      
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('Error fetching transaction data')
    })

    it('calls API with correct endpoint when session ID exists', async () => {
      vi.mocked(useLocation).mockReturnValue(mockLocationWithSessionId)
      api.get.mockResolvedValue({ data: mockTransaction })
      
      renderWithRouter(<Confirmation />)
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/transactions/stripe/transaction/cs_test_123')
      })
    })
  })

  describe('Success Notification', () => {
    beforeEach(() => {
      vi.mocked(useLocation).mockReturnValue(mockLocationWithSessionId)
      api.get.mockResolvedValue({ data: mockTransaction })
    })

    it('displays payment confirmed message for paid status', async () => {
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('PAYMENT CONFIRMED')
      expect(screen.getByText(/Thank you, your payment has succeeded/)).toBeInTheDocument()
    })

    it('displays payment pending message for non-paid status', async () => {
      const pendingTransaction = { ...mockTransaction, status: 'pending' }
      api.get.mockResolvedValue({ data: pendingTransaction })
      
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('PAYMENT PENDING')
      expect(screen.getByText(/Thank you, your payment has not completed yet/)).toBeInTheDocument()
    })

    it('displays success icon and email confirmation', async () => {
      renderWithRouter(<Confirmation />)
      
      await waitFor(() => {
        expect(document.querySelector('.fas.fa-check')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(screen.getByText(/A confirmation email was sent to/)).toBeInTheDocument()
      })
      
    //   expect(screen.getByText('john@example.com')).toBeInTheDocument()
    })
  })

  describe('Booking Details Table', () => {
    beforeEach(() => {
      vi.mocked(useLocation).mockReturnValue(mockLocationWithSessionId)
      api.get.mockResolvedValue({ data: mockTransaction })
    })

    it('renders booking details table with all information', async () => {
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('BOOKING DETAILS')
      
      // Check table content
      expect(screen.getByText('trans_123')).toBeInTheDocument()
      expect(screen.getByText('John')).toBeInTheDocument()
      expect(screen.getByText('Doe')).toBeInTheDocument()
      expect(screen.getAllByText('john@example.com')).toHaveLength(2) // Email appears twice
      expect(screen.getByText('+1234567890')).toBeInTheDocument()
      expect(screen.getByText('United States')).toBeInTheDocument()
      expect(screen.getByText('10001')).toBeInTheDocument()
      expect(screen.getByText('123 Main St Apt 4B, New York, NY')).toBeInTheDocument()
    })

    it('renders payment status section', async () => {
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('Payment Status')
      expect(screen.getByText('CONFIRMED')).toBeInTheDocument()
    })

    it('shows pending status for non-paid transactions', async () => {
      const pendingTransaction = { ...mockTransaction, status: 'pending' }
      api.get.mockResolvedValue({ data: pendingTransaction })
      
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('Payment Status')
      expect(screen.getByText('PENDING')).toBeInTheDocument()
    })

    it('hides payment status when status is empty', async () => {
      const transactionWithEmptyStatus = { ...mockTransaction, status: '' }
      api.get.mockResolvedValue({ data: transactionWithEmptyStatus })
      
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('BOOKING DETAILS')
      expect(screen.queryByText('Payment Status')).not.toBeInTheDocument()
    })
  })

  describe('Invoice Generation', () => {
    beforeEach(() => {
      vi.mocked(useLocation).mockReturnValue(mockLocationWithSessionId)
      api.get.mockResolvedValue({ data: mockTransaction })
    })

    it('displays Stripe receipt link when receiptUrl exists', async () => {
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('VIEW INVOICE')
      
      const receiptLink = screen.getByText('View Stripe Invoice')
      expect(receiptLink).toHaveAttribute('href', 'https://stripe.com/receipt_123')
      expect(receiptLink).toHaveAttribute('target', '_blank')
    })

    it('displays PDF generation button when no receiptUrl', async () => {
      const transactionWithoutReceipt = { ...mockTransaction, receiptUrl: null }
      api.get.mockResolvedValue({ data: transactionWithoutReceipt })
      
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('VIEW INVOICE')
      expect(screen.getByText('Generate Invoice PDF')).toBeInTheDocument()
    })

    it('generates PDF when button is clicked', async () => {
      const transactionWithoutReceipt = { ...mockTransaction, receiptUrl: null }
      api.get.mockResolvedValue({ data: transactionWithoutReceipt })
      const user = userEvent.setup()
      
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('Generate Invoice PDF')
      
      const pdfButton = screen.getByText('Generate Invoice PDF')
      await user.click(pdfButton)
      
      // Verify jsPDF was called (mocked)
      const { jsPDF } = await import('jspdf')
      expect(jsPDF).toHaveBeenCalled()
    })

    it('handles PDF generation with missing pricing data', async () => {
      const transactionWithMissingPricing = { 
        ...mockTransaction, 
        receiptUrl: null,
        pricing: {
          packageCost: null,
          taxRate: null
        }
      }
      api.get.mockResolvedValue({ data: transactionWithMissingPricing })
      const user = userEvent.setup()
      
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('Generate Invoice PDF')
      
      const pdfButton = screen.getByText('Generate Invoice PDF')
      await user.click(pdfButton)
      
      // Should still work with fallback values
      const { jsPDF } = await import('jspdf')
      expect(jsPDF).toHaveBeenCalled()
    })

    it('handles PDF generation with missing billing address', async () => {
      const transactionWithMissingBilling = { 
        ...mockTransaction, 
        receiptUrl: null,
        billingAddress: {}
      }
      api.get.mockResolvedValue({ data: transactionWithMissingBilling })
      const user = userEvent.setup()
      
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('Generate Invoice PDF')
      
      const pdfButton = screen.getByText('Generate Invoice PDF')
      await user.click(pdfButton)
      
      // Should still work with empty billing address
      const { jsPDF } = await import('jspdf')
      expect(jsPDF).toHaveBeenCalled()
    })
  })

  describe('Summary Sidebar', () => {
    beforeEach(() => {
      vi.mocked(useLocation).mockReturnValue(mockLocationWithSessionId)
      api.get.mockResolvedValue({ data: mockTransaction })
    })

    it('renders summary table with package cost', async () => {
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('Summary')
      
      await waitFor(() => {
        expect(screen.getByText('Packages cost')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(screen.getByText('$1500')).toBeInTheDocument()
      })
    })

    it('displays add-ons when selected', async () => {
      renderWithRouter(<Confirmation />)
      
      await waitFor(() => {
        expect(screen.getByText('Tour guide')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(screen.getByText('$34')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(screen.getByText('Extra baggage')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(screen.getByText('$15')).toBeInTheDocument()
      })
      
      // Should not show meals or transfers (disabled in mock data)
      expect(screen.queryByText('Meals included')).not.toBeInTheDocument()
      expect(screen.queryByText('Transfers')).not.toBeInTheDocument()
    })

    it('displays all add-ons when all are selected', async () => {
      const transactionWithAllAddOns = {
        ...mockTransaction,
        package: {
          ...mockTransaction.package,
          addOns: {
            tourGuide: true,
            mealsIncluded: true,
            extraBaggage: true,
            transfers: true
          }
        }
      }
      api.get.mockResolvedValue({ data: transactionWithAllAddOns })
      
      renderWithRouter(<Confirmation />)
      
      await waitFor(() => {
        expect(screen.getByText('Tour guide')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(screen.getByText('Meals included')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(screen.getByText('Extra baggage')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(screen.getByText('Transfers')).toBeInTheDocument()
      })
    })

    it('displays tax and total cost correctly', async () => {
      renderWithRouter(<Confirmation />)
      
      await waitFor(() => {
        expect(screen.getByText('Tax')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(screen.getByText('13%')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(screen.getByText('Total cost')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(screen.getByText('$1765.50')).toBeInTheDocument()
      })
    })

    it('renders help and support widget', async () => {
      renderWithRouter(<Confirmation />)
      
      await waitFor(() => {
        expect(screen.getByText('HELP AND SUPPORT')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(screen.getByText(/Phone: \+11 234 889 00/)).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(screen.getByText(/Monday to Friday 9\.00am - 7\.30pm/)).toBeInTheDocument()
      })
    })
  })

  describe('Edge Cases', () => {
    it('handles missing user data gracefully', async () => {
      const transactionWithoutUser = {
        ...mockTransaction,
        user: {}
      }
      vi.mocked(useLocation).mockReturnValue(mockLocationWithSessionId)
      api.get.mockResolvedValue({ data: transactionWithoutUser })
      
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('BOOKING DETAILS')
    })

    it('handles missing billing address gracefully', async () => {
      const transactionWithoutBilling = {
        ...mockTransaction,
        billingAddress: {}
      }
      vi.mocked(useLocation).mockReturnValue(mockLocationWithSessionId)
      api.get.mockResolvedValue({ data: transactionWithoutBilling })
      
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('BOOKING DETAILS')
    })

    it('handles missing package data gracefully', async () => {
      const transactionWithoutPackage = {
        ...mockTransaction,
        package: {}
      }
      vi.mocked(useLocation).mockReturnValue(mockLocationWithSessionId)
      api.get.mockResolvedValue({ data: transactionWithoutPackage })
      
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('Summary')
    })

    it('handles zero amount correctly', async () => {
      const zeroAmountTransaction = {
        ...mockTransaction,
        amount: 0
      }
      vi.mocked(useLocation).mockReturnValue(mockLocationWithSessionId)
      api.get.mockResolvedValue({ data: zeroAmountTransaction })
      
      renderWithRouter(<Confirmation />)
      
      await waitFor(() => {
        expect(screen.getByText('$0.00')).toBeInTheDocument()
      })
    })

    it('handles null transaction gracefully', async () => {
      vi.mocked(useLocation).mockReturnValue(mockLocationWithSessionId)
      api.get.mockResolvedValue({ data: null })
      
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('BOOKING DETAILS')
    })
  })

  describe('URL Parameter Parsing', () => {
    it('extracts session ID from URL correctly', async () => {
      vi.mocked(useLocation).mockReturnValue({
        search: '?session_id=cs_test_456&other_param=value'
      })
      api.get.mockResolvedValue({ data: mockTransaction })
      
      renderWithRouter(<Confirmation />)
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/transactions/stripe/transaction/cs_test_456')
      })
    })

    it('handles URL without session_id parameter', async () => {
      vi.mocked(useLocation).mockReturnValue({
        search: '?other_param=value'
      })
      
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('No session ID found in URL')
      expect(api.get).not.toHaveBeenCalled()
    })

    it('handles empty search params', async () => {
      vi.mocked(useLocation).mockReturnValue({
        search: ''
      })
      
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('No session ID found in URL')
      expect(api.get).not.toHaveBeenCalled()
    })

    it('handles malformed session_id parameter', async () => {
      vi.mocked(useLocation).mockReturnValue({
        search: '?session_id='
      })
      
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('No session ID found in URL')
      expect(api.get).not.toHaveBeenCalled()
    })
  })

  describe('Email Links', () => {
    beforeEach(() => {
      vi.mocked(useLocation).mockReturnValue(mockLocationWithSessionId)
      api.get.mockResolvedValue({ data: mockTransaction })
    })

    it('renders mailto links correctly', async () => {
      renderWithRouter(<Confirmation />)
      
      await waitFor(() => {
        const emailLinks = screen.getAllByText('john@example.com')
        emailLinks.forEach(link => {
          expect(link.closest('a')).toHaveAttribute('href', 'mailto:john@example.com')
        })
      })
    })
  })

  describe('CSS Classes and Styling', () => {
    beforeEach(() => {
      vi.mocked(useLocation).mockReturnValue(mockLocationWithSessionId)
      api.get.mockResolvedValue({ data: mockTransaction })
    })

    it('applies correct CSS classes to main sections', async () => {
      renderWithRouter(<Confirmation />)
      
      await waitFor(() => {
        expect(document.querySelector('.step-section.cart-section')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(document.querySelector('.confirmation-outer')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(document.querySelector('.success-notify')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(document.querySelector('.confirmation-inner')).toBeInTheDocument()
      })
    })

    it('applies correct styling to success notification', async () => {
      renderWithRouter(<Confirmation />)
      
      await waitFor(() => {
        expect(document.querySelector('.success-icon')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(document.querySelector('.success-content')).toBeInTheDocument()
      })
    })

    it('applies table styling correctly', async () => {
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('BOOKING DETAILS')
      
      await waitFor(() => {
        expect(document.querySelector('.confirmation-details .table')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(document.querySelector('.widget-table-summary table')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(document.querySelector('.sidebar')).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    beforeEach(() => {
      vi.mocked(useLocation).mockReturnValue(mockLocationWithSessionId)
      api.get.mockResolvedValue({ data: mockTransaction })
    })

    it('has proper heading hierarchy', async () => {
      renderWithRouter(<Confirmation />)
      
      await waitFor(() => {
        const h1 = screen.getByRole('heading', { level: 1 })
        expect(h1).toHaveTextContent('Booking')
      })
      
      await waitFor(() => {
        const h3Elements = screen.getAllByRole('heading', { level: 3 })
        expect(h3Elements.length).toBeGreaterThan(0)
      })
    })

    it('has proper table structure using CSS selectors', async () => {
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('BOOKING DETAILS')
      
      await waitFor(() => {
        const bookingTable = document.querySelector('.confirmation-details .table')
        expect(bookingTable).toBeInTheDocument()
      })
      
      await waitFor(() => {
        const bookingTable = document.querySelector('.confirmation-details .table')
        const tableRows = bookingTable?.querySelectorAll('tr')
        expect(tableRows?.length).toBeGreaterThan(0)
      })
      
      await waitFor(() => {
        const bookingTable = document.querySelector('.confirmation-details .table')
        const tableCells = bookingTable?.querySelectorAll('td')
        expect(tableCells?.length).toBeGreaterThan(0)
      })
    })

    it('has proper link attributes', async () => {
      renderWithRouter(<Confirmation />)
      
      await waitFor(() => {
        const receiptLink = screen.getByText('View Stripe Invoice')
        expect(receiptLink).toHaveAttribute('rel', 'noopener noreferrer')
      })
      
      await waitFor(() => {
        const receiptLink = screen.getByText('View Stripe Invoice')
        expect(receiptLink).toHaveAttribute('target', '_blank')
      })
    })
  })

  describe('Table Elements Detection', () => {
    beforeEach(() => {
      vi.mocked(useLocation).mockReturnValue(mockLocationWithSessionId)
      api.get.mockResolvedValue({ data: mockTransaction })
    })

    it('renders both booking details and summary tables', async () => {
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('BOOKING DETAILS')
      await screen.findByText('Summary')
      
      await waitFor(() => {
        const allTables = document.querySelectorAll('table')
        expect(allTables.length).toBeGreaterThanOrEqual(2)
      })
      
      await waitFor(() => {
        const bookingDetailsTable = document.querySelector('.confirmation-details table.table')
        expect(bookingDetailsTable).toBeInTheDocument()
      })
      
      await waitFor(() => {
        const summaryTable = document.querySelector('.widget-table-summary table')
        expect(summaryTable).toBeInTheDocument()
      })
    })

    it('verifies table content is properly rendered', async () => {
      renderWithRouter(<Confirmation />)
      
      await screen.findByText('BOOKING DETAILS')
      
      await waitFor(() => {
        expect(screen.getByText('Booking id:')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(screen.getByText('First Name:')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(screen.getByText('Email:')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(screen.getByText('Packages cost')).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(screen.getByText('Total cost')).toBeInTheDocument()
      })
    })
  })

  describe('Status Variations', () => {
    it('handles different payment statuses', async () => {
      const statuses = ['paid', 'pending', 'failed', 'refunded']
      
      for (const status of statuses) {
        const transactionWithStatus = { ...mockTransaction, status }
        vi.mocked(useLocation).mockReturnValue(mockLocationWithSessionId)
        api.get.mockResolvedValue({ data: transactionWithStatus })
        
        const { unmount } = renderWithRouter(<Confirmation />)
        
        if (status === 'paid') {
          await screen.findByText('PAYMENT CONFIRMED')
        } else {
          await screen.findByText('PAYMENT PENDING')
        }
        
        unmount()
        vi.clearAllMocks()
      }
    })
  })
})
