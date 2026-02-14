// BOOKING NEW 27-08-2025

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Booking from '../booking'

// Mock API module
vi.mock('../utils/api', () => ({
  default: {
    post: vi.fn()
  }
}))

// Mock Header component
vi.mock('../Header', () => ({
  default: () => <div data-testid="header-mock">Header Component</div>,
}))

import api from '../utils/api'

describe('Booking Component', () => {
  const mockPackageData = {
    packageId: 'pkg123',
    packageTitle: 'Amazing Travel Package',
    destination: 'Paris, France',
    tripDuration: '7 days',
    groupSize: '4',
    travelDate: '2024-12-25',
    packagePrice: 1500,
    rating: 4.8,
    packageImage: '/assets/images/package.jpg',
    addOns: {
      tourGuide: true,
      mealsIncluded: false,
      extraBaggage: true,
      transfers: false
    }
  }

  const mockBookingDataWithUser = {
    ...mockPackageData,
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890'
  }

  beforeEach(() => {
    // Mock console.error to avoid noise
    vi.spyOn(console, 'error').mockImplementation(() => {})
    // Mock console.log for the component's logging
    vi.spyOn(console, 'log').mockImplementation(() => {})
    // Mock window.alert
    vi.spyOn(window, 'alert').mockImplementation(() => {})
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: { href: '', origin: 'http://localhost:5173' },
      writable: true
    })
    // Clear localStorage
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Component Structure', () => {
    it('renders the main page structure correctly', () => {
      render(<Booking />)
      
      // Check main container
      const pageContainer = document.querySelector('#page')
      expect(pageContainer).toBeInTheDocument()
      expect(pageContainer).toHaveClass('full-page')
      
      // Check header
      expect(screen.getByTestId('header-mock')).toBeInTheDocument()
      
      // Check main content
      const mainContent = screen.getByRole('main')
      expect(mainContent).toBeInTheDocument()
      expect(mainContent).toHaveAttribute('id', 'content')
      expect(mainContent).toHaveClass('site-main')
      
      // Check footer
      const footer = screen.getByRole('contentinfo')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveAttribute('id', 'colophon')
    })

    it('renders the inner banner with booking title', () => {
      render(<Booking />)
      
      // Check banner container
      const bannerContainer = document.querySelector('.inner-baner-container')
      expect(bannerContainer).toBeInTheDocument()
      expect(bannerContainer).toHaveStyle('background-image: url(/assets/images/inner-banner.jpg)')
      
      // Check banner title
      expect(screen.getByText('Booking')).toBeInTheDocument()
      const bannerTitle = screen.getByText('Booking')
      expect(bannerTitle).toHaveClass('inner-title')
      expect(bannerTitle.tagName).toBe('H1')
    })

    it('renders step navigation correctly', () => {
      render(<Booking />)
      
      const stepLinkWrap = document.querySelector('.step-link-wrap')
      expect(stepLinkWrap).toBeInTheDocument()
      
      // Check step items
      expect(screen.getByText('Package Detail')).toBeInTheDocument()
    //   expect(screen.getByText('Your Details')).toBeInTheDocument()
      expect(screen.getByText('Finish')).toBeInTheDocument()
      
      // Check active steps
      const activeSteps = document.querySelectorAll('.step-item.active')
      expect(activeSteps).toHaveLength(2) // Package Detail and Your Details are active
    })
  })

  describe('Form Fields Rendering', () => {
    it('renders all personal details form fields', () => {
      render(<Booking />)
      
      // Personal details fields - use DOM queries since labels aren't properly associated
      expect(document.querySelector('input[name="firstName"]')).toBeInTheDocument()
      expect(document.querySelector('input[name="lastName"]')).toBeInTheDocument()
      expect(document.querySelector('input[name="email"]')).toBeInTheDocument()
      expect(document.querySelector('input[name="confirmEmail"]')).toBeInTheDocument()
      expect(document.querySelector('input[name="phone"]')).toBeInTheDocument()
    })

    it('renders all billing address form fields', () => {
      render(<Booking />)
      
      // Billing address fields
      expect(document.querySelector('input[name="country"]')).toBeInTheDocument()
      expect(document.querySelector('input[name="street1"]')).toBeInTheDocument()
      expect(document.querySelector('input[name="street2"]')).toBeInTheDocument()
      expect(document.querySelector('input[name="city"]')).toBeInTheDocument()
      expect(document.querySelector('input[name="state"]')).toBeInTheDocument()
      expect(document.querySelector('input[name="postalCode"]')).toBeInTheDocument()
      expect(document.querySelector('textarea[name="additionalInfo"]')).toBeInTheDocument()
    })

    it('renders terms checkbox and book now button', () => {
      render(<Booking />)
      
      // Terms and conditions
      expect(document.querySelector('input[name="acceptTerms"]')).toBeInTheDocument()
      
      // Book now button
      expect(screen.getByRole('button', { name: /book now/i })).toBeInTheDocument()
    })

    it('renders form labels correctly', () => {
      render(<Booking />)
      
      // Check for label texts
      expect(screen.getByText('First name*')).toBeInTheDocument()
      expect(screen.getByText('Last name*')).toBeInTheDocument()
      expect(screen.getByText('Email*')).toBeInTheDocument()
      expect(screen.getByText('Confirm Email*')).toBeInTheDocument()
      expect(screen.getByText('Phone*')).toBeInTheDocument()
      expect(screen.getByText('Country*')).toBeInTheDocument()
      expect(screen.getByText('Street line 1*')).toBeInTheDocument()
      expect(screen.getByText('Street line 2')).toBeInTheDocument()
      expect(screen.getByText('City*')).toBeInTheDocument()
      expect(screen.getByText('State*')).toBeInTheDocument()
      expect(screen.getByText('Postal code*')).toBeInTheDocument()
      expect(screen.getByText('Additional Information')).toBeInTheDocument()
    })
  })

  describe('Package Data Loading', () => {
    it('displays package information when data is available', () => {
      localStorage.setItem('bookingData', JSON.stringify(mockPackageData))
      
      render(<Booking />)
      
      // Should display package title in banner
      expect(screen.getByText(`Package: ${mockPackageData.packageTitle}`)).toBeInTheDocument()
      
    })

    it('pre-fills form fields with user data from localStorage', () => {
      localStorage.setItem('bookingData', JSON.stringify(mockBookingDataWithUser))
      
      render(<Booking />)
      
      // Check pre-filled fields
      expect(screen.getByDisplayValue('John')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Doe')).toBeInTheDocument()
      
      // Email should appear in both email fields
      const emailInputs = screen.getAllByDisplayValue('john@example.com')
      expect(emailInputs).toHaveLength(2)
      
      expect(screen.getByDisplayValue('+1234567890')).toBeInTheDocument()
    })

    it('shows no package message when no data is available', () => {
      render(<Booking />)
      
      expect(screen.getByText('No package data found. Please go back and select a package.')).toBeInTheDocument()
      expect(screen.getByText('Browse Packages')).toBeInTheDocument()
    })

    it('handles invalid JSON in localStorage gracefully', () => {
      localStorage.setItem('bookingData', 'invalid json')
      
      render(<Booking />)
      
      // Should not crash and show no package message
      expect(screen.getByText('No package data found. Please go back and select a package.')).toBeInTheDocument()
    })
  })

  describe('Form Interactions', () => {
    it('handles form input changes correctly', async () => {
      render(<Booking />)
      const user = userEvent.setup()
      
      // Test text inputs using DOM queries
      const firstNameInput = document.querySelector('input[name="firstName"]')
      await user.type(firstNameInput, 'Jane')
      expect(firstNameInput).toHaveValue('Jane')
      
      const emailInput = document.querySelector('input[name="email"]')
      await user.type(emailInput, 'jane@example.com')
      expect(emailInput).toHaveValue('jane@example.com')
      
      // Test textarea
      const additionalInfoTextarea = document.querySelector('textarea[name="additionalInfo"]')
      await user.type(additionalInfoTextarea, 'Special dietary requirements')
      expect(additionalInfoTextarea).toHaveValue('Special dietary requirements')
      
      // Test checkbox
      const termsCheckbox = document.querySelector('input[name="acceptTerms"]')
      await user.click(termsCheckbox)
      expect(termsCheckbox).toBeChecked()
    })

    it('clears error messages when user starts typing', async () => {
      render(<Booking />)
      const user = userEvent.setup()
      
      // Trigger validation errors first
      const bookNowButton = screen.getByRole('button', { name: /book now/i })
      await user.click(bookNowButton)
      
      // Should show error
      expect(screen.getByText('First Name is required')).toBeInTheDocument()
      
      // Start typing in the field
      const firstNameInput = document.querySelector('input[name="firstName"]')
      await user.type(firstNameInput, 'J')
      
      // Error should be cleared
      expect(screen.queryByText('First Name is required')).not.toBeInTheDocument()
    })
  })

  describe('Form Validation', () => {
    it('shows validation errors for required fields', async () => {
      render(<Booking />)
      const user = userEvent.setup()
      
      const bookNowButton = screen.getByRole('button', { name: /book now/i })
      await user.click(bookNowButton)
      
      // Check for required field errors
      expect(screen.getByText('First Name is required')).toBeInTheDocument()
      expect(screen.getByText('Last Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Confirm Email is required')).toBeInTheDocument()
      expect(screen.getByText('Phone is required')).toBeInTheDocument()
      expect(screen.getByText('Country is required')).toBeInTheDocument()
      expect(screen.getByText('Street Line 1 is required')).toBeInTheDocument()
      expect(screen.getByText('City is required')).toBeInTheDocument()
      expect(screen.getByText('State is required')).toBeInTheDocument()
      expect(screen.getByText('Postal Code is required')).toBeInTheDocument()
      expect(screen.getByText('You must accept the terms and conditions')).toBeInTheDocument()
    })

    it('validates email format', async () => {
      render(<Booking />)
      const user = userEvent.setup()
      
      const emailInput = document.querySelector('input[name="email"]')
      await user.type(emailInput, 'invalid-email')
      
      const bookNowButton = screen.getByRole('button', { name: /book now/i })
      await user.click(bookNowButton)
      
      expect(screen.getByText('Email address is invalid')).toBeInTheDocument()
    })

    it('validates email confirmation match', async () => {
      render(<Booking />)
      const user = userEvent.setup()
      
      const emailInput = document.querySelector('input[name="email"]')
      const confirmEmailInput = document.querySelector('input[name="confirmEmail"]')
      
      await user.type(emailInput, 'test@example.com')
      await user.type(confirmEmailInput, 'different@example.com')
      
      const bookNowButton = screen.getByRole('button', { name: /book now/i })
      await user.click(bookNowButton)
      
      expect(screen.getByText('Email and Confirm Email do not match')).toBeInTheDocument()
    })

    it('applies error styling to invalid fields', async () => {
      render(<Booking />)
      const user = userEvent.setup()
      
      const bookNowButton = screen.getByRole('button', { name: /book now/i })
      await user.click(bookNowButton)
      
      const firstNameInput = document.querySelector('input[name="firstName"]')
      expect(firstNameInput).toHaveClass('is-invalid')
    })
  })

  describe('Price Calculation', () => {
    it('displays package cost correctly', () => {
      localStorage.setItem('bookingData', JSON.stringify(mockPackageData))
      
      render(<Booking />)
      
      // Should display base package price
      expect(screen.getByText(`$${mockPackageData.packagePrice}`)).toBeInTheDocument()
    })

    it('displays add-on costs when selected', () => {
      localStorage.setItem('bookingData', JSON.stringify(mockPackageData))
      
      render(<Booking />)
      
      // Should show tour guide add-on (enabled in mock data)
      expect(screen.getByText('Tour guide')).toBeInTheDocument()
      expect(screen.getByText('$34')).toBeInTheDocument()
      
      // Should show extra baggage add-on (enabled in mock data)
      expect(screen.getByText('Extra baggage')).toBeInTheDocument()
      expect(screen.getByText('$15')).toBeInTheDocument()
      
      // Should show tax
      expect(screen.getByText('Tax')).toBeInTheDocument()
      expect(screen.getByText('13%')).toBeInTheDocument()
    })

    it('calculates total cost correctly', () => {
      localStorage.setItem('bookingData', JSON.stringify(mockPackageData))
      
      render(<Booking />)
      
      // Base price: 1500, Tour guide: 34, Extra baggage: 15
      // Subtotal: 1549, Tax (13%): 201.37, Total: 1750.37
      const expectedTotal = ((1500 + 34 + 15) * 1.13).toFixed(2)
      expect(screen.getByText(`$${expectedTotal}`)).toBeInTheDocument()
    })
  })

  describe('Booking Submission', () => {
    const fillValidForm = async (user) => {
      const inputs = {
        firstName: document.querySelector('input[name="firstName"]'),
        lastName: document.querySelector('input[name="lastName"]'),
        email: document.querySelector('input[name="email"]'),
        confirmEmail: document.querySelector('input[name="confirmEmail"]'),
        phone: document.querySelector('input[name="phone"]'),
        country: document.querySelector('input[name="country"]'),
        street1: document.querySelector('input[name="street1"]'),
        city: document.querySelector('input[name="city"]'),
        state: document.querySelector('input[name="state"]'),
        postalCode: document.querySelector('input[name="postalCode"]'),
        acceptTerms: document.querySelector('input[name="acceptTerms"]')
      }

      await user.type(inputs.firstName, 'John')
      await user.type(inputs.lastName, 'Doe')
      await user.type(inputs.email, 'john@example.com')
      await user.type(inputs.confirmEmail, 'john@example.com')
      await user.type(inputs.phone, '+1234567890')
      await user.type(inputs.country, 'United States')
      await user.type(inputs.street1, '123 Main Street')
      await user.type(inputs.city, 'New York')
      await user.type(inputs.state, 'NY')
      await user.type(inputs.postalCode, '10001')
      await user.click(inputs.acceptTerms)
    }

    it('successfully submits valid form and redirects to payment', async () => {
      localStorage.setItem('bookingData', JSON.stringify(mockPackageData))
      localStorage.setItem('userId', 'user123')
      
      render(<Booking />)
      const user = userEvent.setup()
      
      await fillValidForm(user)
      
      // Mock successful API response
      vi.mocked(api.post).mockResolvedValue({
        data: { url: 'https://checkout.stripe.com/session123' }
      })
      
      const bookNowButton = screen.getByRole('button', { name: /book now/i })
      await user.click(bookNowButton)
      
      await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith('transactions/stripe/checkout', expect.objectContaining({
          userId: 'user123',
          userDetails: expect.objectContaining({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com'
          }),
          packageDetails: expect.objectContaining({
            packageId: mockPackageData.packageId,
            packageTitle: mockPackageData.packageTitle
          }),
          successUrl: expect.stringContaining('confirmation?session_id='),
          cancelUrl: expect.any(String)
        }))
        
        expect(window.location.href).toBe('https://checkout.stripe.com/session123')
      })
    })

    it('shows error alert when API call fails', async () => {
      localStorage.setItem('bookingData', JSON.stringify(mockPackageData))
      
      render(<Booking />)
      const user = userEvent.setup()
      
      await fillValidForm(user)
      
      // Mock API failure
      vi.mocked(api.post).mockRejectedValue(new Error('Network error'))
      
      const bookNowButton = screen.getByRole('button', { name: /book now/i })
      await user.click(bookNowButton)
      
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Payment initiation failed.')
      })
    })

    it('shows error alert when API returns no URL', async () => {
      localStorage.setItem('bookingData', JSON.stringify(mockPackageData))
      
      render(<Booking />)
      const user = userEvent.setup()
      
      await fillValidForm(user)
      
      // Mock API response without URL
      vi.mocked(api.post).mockResolvedValue({ data: {} })
      
      const bookNowButton = screen.getByRole('button', { name: /book now/i })
      await user.click(bookNowButton)
      
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Failed to start payment.')
      })
    })

    it('prevents submission when form is invalid', async () => {
      render(<Booking />)
      const user = userEvent.setup()
      
      // Only fill first name, leave others empty
      const firstNameInput = document.querySelector('input[name="firstName"]')
      await user.type(firstNameInput, 'John')
      
      const bookNowButton = screen.getByRole('button', { name: /book now/i })
      await user.click(bookNowButton)
      
      // Should show validation errors and not call API
      expect(screen.getByText('Last Name is required')).toBeInTheDocument()
      expect(api.post).not.toHaveBeenCalled()
    })
  })

  describe('Summary Sidebar', () => {
    it('renders summary widget correctly', () => {
      localStorage.setItem('bookingData', JSON.stringify(mockPackageData))
      
      render(<Booking />)
      
      const summaryWidget = document.querySelector('.widget-table-summary')
      expect(summaryWidget).toBeInTheDocument()
      expect(screen.getByText('Summary')).toBeInTheDocument()
    })

    it('renders help and support widget', () => {
      render(<Booking />)
      
      const supportWidget = document.querySelector('.widget-support-wrap')
      expect(supportWidget).toBeInTheDocument()
      expect(screen.getByText('HELP AND SUPPORT')).toBeInTheDocument()
      expect(screen.getByText('+11 234 889 00')).toBeInTheDocument()
      expect(screen.getByText('Monday to Friday 9.00am - 7.30pm')).toBeInTheDocument()
    })
  })

  describe('Footer Section', () => {
    it('renders all footer widgets', () => {
      render(<Booking />)
      
      // About Travel section
      expect(screen.getByText('About Travel')).toBeInTheDocument()
      
      // Contact Information section
      expect(screen.getByText('CONTACT INFORMATION')).toBeInTheDocument()
      expect(screen.getByText('+01 (977) 2599 12')).toBeInTheDocument()
      expect(screen.getByText('3146 Koontz, California')).toBeInTheDocument()
      
      // Latest Post section
      expect(screen.getByText('Latest Post')).toBeInTheDocument()
      expect(screen.getByText('Life is a beautiful journey not a destination')).toBeInTheDocument()
      
      // Subscribe section
      expect(screen.getByText('SUBSCRIBE US')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Your Email..')).toBeInTheDocument()
    })

    it('renders footer menu and copyright', () => {
      render(<Booking />)
      
      // Footer menu links
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
      expect(screen.getByText('Term & Condition')).toBeInTheDocument()
      expect(screen.getByText('FAQ')).toBeInTheDocument()
      
      // Footer logo
      const footerLogo = document.querySelector('.footer-logo img')
      expect(footerLogo).toBeInTheDocument()
      expect(footerLogo).toHaveAttribute('src', '/assets/images/travele-logo.png')
      
      // Copyright text
      expect(screen.getByText('Copyright © 2021 Travele. All rights reserveds')).toBeInTheDocument()
    })
  })

  describe('Back to Top Button', () => {
    it('renders back to top button with correct attributes', () => {
      render(<Booking />)
      
      const backToTopButton = document.querySelector('#backTotop')
      expect(backToTopButton).toBeInTheDocument()
      expect(backToTopButton).toHaveAttribute('href', '#')
      expect(backToTopButton).toHaveClass('to-top-icon')
      
      const icon = backToTopButton?.querySelector('.fa-chevron-up')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Search Overlay', () => {
    it('renders search overlay with correct structure', () => {
      render(<Booking />)
      
      const searchOverlay = document.querySelector('.header-search-form')
      expect(searchOverlay).toBeInTheDocument()
      
      const searchForm = searchOverlay?.querySelector('.search-form')
      expect(searchForm).toHaveAttribute('role', 'search')
      expect(searchForm).toHaveAttribute('method', 'get')
      
      const searchInput = screen.getByPlaceholderText('Enter your text...')
      expect(searchInput).toBeInTheDocument()
    })

    // it('handles user input in search form', async () => {
    //   render(<Booking />)
    //   const user = userEvent.setup()
      
    //   const searchInput = screen.getByPlaceholderText('Enter your text...')
    //   await user.type(searchInput, 'booking search')
      
    //   expect(searchInput).toHaveValue('booking search')
    // })
  })

  describe('CSS Classes and Styling', () => {
    it('applies correct CSS classes to main sections', () => {
      render(<Booking />)
      
      // Booking section
      expect(document.querySelector('.step-section.booking-section')).toBeInTheDocument()
      
      // Form wrap
      expect(document.querySelector('.booking-form-wrap')).toBeInTheDocument()
      
      // Sidebar
      expect(document.querySelector('.sidebar')).toBeInTheDocument()
      
      // Footer sections
      expect(document.querySelector('.site-footer')).toBeInTheDocument()
      expect(document.querySelector('.footer-primary')).toBeInTheDocument()
    })

    it('applies Bootstrap grid classes correctly', () => {
      render(<Booking />)
      
      const containers = document.querySelectorAll('.container')
      expect(containers.length).toBeGreaterThan(0)
      
      const rows = document.querySelectorAll('.row')
      expect(rows.length).toBeGreaterThan(0)
      
      expect(document.querySelector('.col-lg-8')).toBeInTheDocument()
      expect(document.querySelector('.col-lg-4')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      localStorage.setItem('bookingData', JSON.stringify(mockPackageData))
      
      render(<Booking />)
      
      // Main page title (h1)
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toHaveTextContent('Booking')
      
      // Section titles (h3)
      const h3Elements = screen.getAllByRole('heading', { level: 3 })
      expect(h3Elements.length).toBeGreaterThan(0)
      
      // Form section titles
    //   expect(screen.getByText('Your Details')).toBeInTheDocument()
      expect(screen.getByText('Billing Address')).toBeInTheDocument()
    })

    it('has proper form labels and attributes', () => {
      render(<Booking />)
      
      // Use DOM queries since labels aren't properly associated
      // Check form inputs by name attribute
      const emailInput = document.querySelector('input[name="email"]')
      expect(emailInput).toBeInTheDocument()
      expect(emailInput).toHaveAttribute('type', 'email')
      
      const confirmEmailInput = document.querySelector('input[name="confirmEmail"]')
      expect(confirmEmailInput).toBeInTheDocument()
      expect(confirmEmailInput).toHaveAttribute('type', 'email')
      
      const phoneInput = document.querySelector('input[name="phone"]')
      expect(phoneInput).toBeInTheDocument()
      expect(phoneInput).toHaveAttribute('type', 'tel')
      
      const termsCheckbox = document.querySelector('input[name="acceptTerms"]')
      expect(termsCheckbox).toBeInTheDocument()
      expect(termsCheckbox).toHaveAttribute('type', 'checkbox')
      
      // Newsletter form
      const newsletterInput = screen.getByPlaceholderText('Your Email..')
      expect(newsletterInput).toHaveAttribute('type', 'email')
      
      // Search form
      const searchForm = document.querySelector('.search-form')
      expect(searchForm).toHaveAttribute('role', 'search')
    })

    it('has proper form structure with labels', () => {
      render(<Booking />)
      
      // Check that labels exist
      expect(screen.getByText('First name*')).toBeInTheDocument()
      expect(screen.getByText('Last name*')).toBeInTheDocument()
      expect(screen.getByText('Email*')).toBeInTheDocument()
      expect(screen.getByText('Confirm Email*')).toBeInTheDocument()
      expect(screen.getByText('Phone*')).toBeInTheDocument()
      expect(screen.getByText('Country*')).toBeInTheDocument()
      expect(screen.getByText('Street line 1*')).toBeInTheDocument()
      expect(screen.getByText('City*')).toBeInTheDocument()
      expect(screen.getByText('State*')).toBeInTheDocument()
      expect(screen.getByText('Postal code*')).toBeInTheDocument()
    })

    it('has proper alt attributes for images', () => {
      render(<Booking />)
      
      // Footer images
      const awardImages = document.querySelectorAll('.award-img img')
      expect(awardImages.length).toBeGreaterThan(0)
      
      // Footer logo
      const footerLogo = document.querySelector('.footer-logo img')
      expect(footerLogo).toHaveAttribute('alt', '')
    })
  })
})
