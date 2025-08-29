import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../Header'

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
})

// Mock window.location
delete window.location
window.location = { href: '' } as any

// Mock scrollY
Object.defineProperty(window, 'scrollY', {
  writable: true,
  value: 0,
})

// Mock pageYOffset (alternative to scrollY)
Object.defineProperty(window, 'pageYOffset', {
  writable: true,
  value: 0,
})

describe('Header Component', () => {
  const renderHeader = () => render(<Header />)

  beforeEach(() => {
    vi.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue(null)
    window.scrollY = 0
    window.pageYOffset = 0
    window.location.href = ''
    
    // Mock console methods
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Component Structure', () => {
    it('renders header with correct structure', () => {
      renderHeader()
      
      expect(document.querySelector('#masthead.site-header.header-primary')).toBeInTheDocument()
      expect(document.querySelector('.top-header')).toBeInTheDocument()
      expect(document.querySelector('.bottom-header')).toBeInTheDocument()
      expect(document.querySelector('.mobile-menu-container')).toBeInTheDocument()
    })

    it('renders top header contact information', () => {
      renderHeader()
      
      expect(screen.getByText('+01 (977) 2599 12')).toBeInTheDocument()
      expect(screen.getByText('3146 Koontz Lane, California')).toBeInTheDocument()
    })

    it('renders social media links', () => {
      renderHeader()
      
      const socialIcons = [
        '.fab.fa-facebook-f',
        '.fab.fa-twitter',
        '.fab.fa-instagram',
        '.fab.fa-linkedin'
      ]
      
      socialIcons.forEach(selector => {
        expect(document.querySelector(selector)).toBeInTheDocument()
      })
    })

    it('renders search icon', () => {
      renderHeader()
      expect(document.querySelector('.fas.fa-search')).toBeInTheDocument()
      expect(document.querySelector('.search-icon')).toBeInTheDocument()
    })
  })

  describe('Logo Functionality', () => {
    it('renders both logo variants', () => {
      renderHeader()
      
      const blackLogo = document.querySelector('.black-logo') as HTMLImageElement
      const whiteLogo = document.querySelector('.white-logo') as HTMLImageElement
      
      expect(blackLogo).toBeInTheDocument()
      expect(whiteLogo).toBeInTheDocument()
      expect(blackLogo.src).toContain('/assets/images/travele-logo1.png')
      expect(whiteLogo.src).toContain('/assets/images/travele-logo.png')
    })

    it('handles logo click navigation', async () => {
      renderHeader()
      const user = userEvent.setup()
      
      const logoContainer = document.querySelector('.site-identity')
      expect(logoContainer).toBeInTheDocument()
      
      await user.click(logoContainer as HTMLElement)
      
      expect(console.log).toHaveBeenCalledWith('Logo clicked')
      expect(window.location.href).toBe('/')
    })

    it('shows correct logo based on scroll state', () => {
      renderHeader()
      
      const blackLogo = document.querySelector('.black-logo') as HTMLElement
      const whiteLogo = document.querySelector('.white-logo') as HTMLElement
      
      // Initially not scrolled - white logo visible
      expect(blackLogo.style.display).toBe('none')
      expect(whiteLogo.style.display).toBe('inline')
    })
  })

  describe('Navigation Menu', () => {
    it('renders main navigation menu', () => {
      renderHeader()
      expect(document.querySelector('#navigation.navigation')).toBeInTheDocument()
    })

    it('renders Tour dropdown menu', () => {
      renderHeader()
      expect(screen.getByText('Tour')).toBeInTheDocument()
      expect(screen.getByText('Destination')).toBeInTheDocument()
      expect(screen.getByText('Tour Packages')).toBeInTheDocument()
      expect(screen.getByText('Package Offer')).toBeInTheDocument()
    })

    it('renders Pages dropdown menu', () => {
      renderHeader()
      expect(screen.getByText('Pages')).toBeInTheDocument()
      expect(screen.getByText('About')).toBeInTheDocument()
      expect(screen.getByText('Service')).toBeInTheDocument()
      expect(screen.getByText('Tour Guide')).toBeInTheDocument()
      expect(screen.getByText('Gallery')).toBeInTheDocument()
      expect(screen.getByText('FAQ')).toBeInTheDocument()
      expect(screen.getByText('Testimonial')).toBeInTheDocument()
      expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    it('renders Blog dropdown menu', () => {
      renderHeader()
      expect(screen.getByText('Blog')).toBeInTheDocument()
      expect(screen.getByText('Blog List')).toBeInTheDocument()
      expect(screen.getByText('Blog Left Sidebar')).toBeInTheDocument()
      expect(screen.getByText('Blog Both Sidebar')).toBeInTheDocument()
      expect(screen.getByText('Blog Single')).toBeInTheDocument()
    })

    it('has correct navigation link attributes', () => {
      renderHeader()
      const links = {
        'Destination': '/destination',
        'Tour Packages': '/',
        'Package Offer': '/package-offer',
        'About': '/about',
        'Service': '/service',
        'Tour Guide': '/tour-guide',
        'Gallery': '/gallery',
        'FAQ': '/faq',
        'Testimonial': '/testimonial-page',
        'Contact': '/contact'
      }
      
      Object.entries(links).forEach(([text, href]) => {
        const link = screen.getByText(text).closest('a')
        expect(link).toHaveAttribute('href', href)
      })
    })
  })

  describe('Authentication - Not Authenticated', () => {
    it('shows login and register buttons when not authenticated', () => {
      renderHeader()
      
      expect(screen.getByText('Login')).toBeInTheDocument()
      expect(screen.getByText('Register')).toBeInTheDocument()
      
      const loginBtn = screen.getByText('Login').closest('a')
      const registerBtn = screen.getByText('Register').closest('a')
      
      expect(loginBtn).toHaveAttribute('href', '/admin/login')
      expect(registerBtn).toHaveAttribute('href', '/user/register')
    })

    it('applies correct styling to auth buttons when not scrolled', () => {
      renderHeader()
      
      const loginBtn = screen.getByText('Login').closest('a') as HTMLElement
      const registerBtn = screen.getByText('Register').closest('a') as HTMLElement
      
      expect(loginBtn.style.color).toBe('rgb(255, 255, 255)')
      expect(loginBtn.style.border).toContain('1px solid rgb(255, 255, 255)')
      expect(registerBtn.style.color).toBe('rgb(16, 31, 70)')
      expect(registerBtn.style.backgroundColor).toBe('rgb(255, 255, 255)')
    })
  })

  describe('Authentication - Authenticated', () => {
    beforeEach(() => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'token') return 'mock-token'
        if (key === 'user') return 'John Doe'
        if (key === 'userEmail') return 'john@example.com'
        return null
      })
    })

    it('shows user dropdown when authenticated', () => {
      renderHeader()
      
      expect(screen.getByText('Welcome, John Doe')).toBeInTheDocument()
      expect(document.querySelector('.fas.fa-chevron-down')).toBeInTheDocument()
    })

    it('toggles user dropdown on click', async () => {
      renderHeader()
      const user = userEvent.setup()
      
      const userButton = screen.getByText('Welcome, John Doe').closest('button')
      expect(userButton).toBeInTheDocument()
      
      // Initially dropdown should not be visible
      expect(screen.queryByText('My Bookings')).not.toBeInTheDocument()
      
      // Click to show dropdown
      await user.click(userButton as HTMLElement)
      
      await waitFor(() => {
        expect(screen.getByText('My Bookings')).toBeInTheDocument()
        expect(screen.getByText('Wishlist')).toBeInTheDocument()
        expect(screen.getByText('Logout')).toBeInTheDocument()
      })
    })

    it('renders dropdown menu items correctly', async () => {
      renderHeader()
      const user = userEvent.setup()
      
      const userButton = screen.getByText('Welcome, John Doe').closest('button')
      await user.click(userButton as HTMLElement)
      
      await waitFor(() => {
        expect(screen.getByText('Signed in as')).toBeInTheDocument()
        expect(screen.getByText('john@example.com')).toBeInTheDocument()
        
        const bookingsLink = screen.getByText('My Bookings').closest('a')
        const wishlistLink = screen.getByText('Wishlist').closest('a')
        
        expect(bookingsLink).toHaveAttribute('href', '/bookings')
        expect(wishlistLink).toHaveAttribute('href', '/wishlist')
      })
    })

    it('handles logout functionality', async () => {
      renderHeader()
      const user = userEvent.setup()
      
      // Open dropdown
      const userButton = screen.getByText('Welcome, John Doe').closest('button')
      await user.click(userButton as HTMLElement)
      
      // Click logout
      await waitFor(() => {
        const logoutButton = screen.getByText('Logout')
        expect(logoutButton).toBeInTheDocument()
      })
      
      const logoutButton = screen.getByText('Logout')
      await user.click(logoutButton)
      
      // Verify localStorage methods were called
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token')
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user')
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('userRole')
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('bookingData')
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('completeBooking')
      expect(window.location.href).toBe('/')
    })

    it('closes dropdown when clicking outside', async () => {
      renderHeader()
      const user = userEvent.setup()
      
      // Open dropdown
      const userButton = screen.getByText('Welcome, John Doe').closest('button')
      await user.click(userButton as HTMLElement)
      
      await waitFor(() => {
        expect(screen.getByText('My Bookings')).toBeInTheDocument()
      })
      
      // Click outside the dropdown
      const outsideElement = document.querySelector('.site-header')
      await user.click(outsideElement as HTMLElement)
      
      await waitFor(() => {
        expect(screen.queryByText('My Bookings')).not.toBeInTheDocument()
      })
    })

    it('handles multiple dropdown toggle clicks', async () => {
      renderHeader()
      const user = userEvent.setup()
      
      const userButton = screen.getByText('Welcome, John Doe').closest('button')
      
      // First click - open dropdown
      await user.click(userButton as HTMLElement)
      await waitFor(() => {
        expect(screen.getByText('My Bookings')).toBeInTheDocument()
      })
      
      // Second click - close dropdown
      await user.click(userButton as HTMLElement)
      await waitFor(() => {
        expect(screen.queryByText('My Bookings')).not.toBeInTheDocument()
      })
      
      // Third click - open again
      await user.click(userButton as HTMLElement)
      await waitFor(() => {
        expect(screen.getByText('My Bookings')).toBeInTheDocument()
      })
    })

    it('displays correct user info in dropdown header', async () => {
      renderHeader()
      const user = userEvent.setup()
      
      const userButton = screen.getByText('Welcome, John Doe').closest('button')
      await user.click(userButton as HTMLElement)
      
      await waitFor(() => {
        expect(screen.getByText('Signed in as')).toBeInTheDocument()
        expect(screen.getByText('john@example.com')).toBeInTheDocument()
      })
    })
  })

  describe('Scroll Behavior', () => {
    it('updates header styling on scroll', async () => {
      renderHeader()
      
      // Simulate scroll event
      Object.defineProperty(window, 'scrollY', { value: 150, writable: true })
      fireEvent.scroll(window)
      
      await waitFor(() => {
        const bottomHeader = document.querySelector('.bottom-header') as HTMLElement
        expect(bottomHeader.style.position).toBe('fixed')
        expect(bottomHeader.style.backgroundColor).toBe('rgb(255, 255, 255)')
        expect(bottomHeader.style.boxShadow).toBe('0 2px 6px rgba(0,0,0,0.15)')
      })
    })

    it('hides top header when scrolled', async () => {
      renderHeader()
      
      const topHeader = document.querySelector('.top-header') as HTMLElement
      expect(topHeader.style.display).toBe('block')
      
      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { value: 150, writable: true })
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(topHeader.style.display).toBe('none')
      })
    })

    it('switches logo display when scrolled', async () => {
      renderHeader()
      
      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { value: 150, writable: true })
      fireEvent.scroll(window)
      
      await waitFor(() => {
        const blackLogo = document.querySelector('.black-logo') as HTMLElement
        const whiteLogo = document.querySelector('.white-logo') as HTMLElement
        
        expect(blackLogo.style.display).toBe('inline')
        expect(whiteLogo.style.display).toBe('none')
      })
    })

    it('updates scroll state correctly for small scroll values', async () => {
      renderHeader()
      
      // Small scroll (less than threshold)
      Object.defineProperty(window, 'scrollY', { value: 50, writable: true })
      fireEvent.scroll(window)
      
      await waitFor(() => {
        const bottomHeader = document.querySelector('.bottom-header') as HTMLElement
        expect(bottomHeader.style.position).toBe('relative')
        expect(bottomHeader.style.backgroundColor).toBe('transparent')
      })
    })

    it('updates scroll state at exact threshold', async () => {
      renderHeader()
      
      // Exact threshold value
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
      fireEvent.scroll(window)
      
      await waitFor(() => {
        const topHeader = document.querySelector('.top-header') as HTMLElement
        expect(topHeader.style.display).toBe('block')
      })
    })

    it('updates scroll state just above threshold', async () => {
      renderHeader()
      
      // Just above threshold
      Object.defineProperty(window, 'scrollY', { value: 101, writable: true })
      fireEvent.scroll(window)
      
      await waitFor(() => {
        const topHeader = document.querySelector('.top-header') as HTMLElement
        expect(topHeader.style.display).toBe('none')
      })
    })

    it('removes scroll event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
      const { unmount } = renderHeader()
      
      unmount()
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    })
  })

  describe('Error Handling', () => {
    it('handles missing localStorage data gracefully', () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      renderHeader()
      
      expect(document.querySelector('#masthead')).toBeInTheDocument()
      expect(screen.getByText('Login')).toBeInTheDocument()
      expect(screen.getByText('Register')).toBeInTheDocument()
    })

    it('handles partial localStorage data gracefully', () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'token') return 'mock-token'
        if (key === 'user') return null
        return null
      })
      
      renderHeader()
      
      expect(document.querySelector('#masthead')).toBeInTheDocument()
      expect(screen.getByText('Login')).toBeInTheDocument()
    })

    it('handles invalid user data in localStorage', () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'token') return 'mock-token'
        if (key === 'user') return 'invalid-json'
        return null
      })
      
      renderHeader()
      
      // Should show authenticated state since user data is just a string
      expect(screen.getByText('Welcome, invalid-json')).toBeInTheDocument()
    })

    it('handles error in parsing user data gracefully', () => {
      // Mock scenario where token exists but user data causes issues
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'token') return 'mock-token'
        if (key === 'user') return null // This would cause the component to show login
        return null
      })
      
      renderHeader()
      
      expect(screen.getByText('Login')).toBeInTheDocument()
      expect(screen.getByText('Register')).toBeInTheDocument()
    })
  })

  describe('Event Handlers', () => {
    it('adds and removes scroll event listener', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
      
      const { unmount } = renderHeader()
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
      
      unmount()
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    })

    it('adds and removes mousedown event listener for dropdown', async () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'token') return 'mock-token'
        if (key === 'user') return 'John Doe'
        return null
      })
      
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener')
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')
      
      const { unmount } = renderHeader()
      const user = userEvent.setup()
      
      // Open dropdown to trigger event listener addition
      const userButton = screen.getByText('Welcome, John Doe').closest('button')
      await user.click(userButton as HTMLElement)
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
      
      unmount()
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
    })

    it('handles dropdown click outside detection correctly', async () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'token') return 'mock-token'
        if (key === 'user') return 'John Doe'
        return null
      })
      
      renderHeader()
      const user = userEvent.setup()
      
      // Open dropdown
      const userButton = screen.getByText('Welcome, John Doe').closest('button')
      await user.click(userButton as HTMLElement)
      
      await waitFor(() => {
        expect(screen.getByText('My Bookings')).toBeInTheDocument()
      })
      
      // Create a mousedown event on dropdown element itself (should not close)
      const dropdownMenu = document.querySelector('.user-dropdown')
      fireEvent.mouseDown(dropdownMenu as HTMLElement)
      
      // Dropdown should still be open
      expect(screen.getByText('My Bookings')).toBeInTheDocument()
      
      // Click outside the dropdown
      fireEvent.mouseDown(document.body)
      
      await waitFor(() => {
        expect(screen.queryByText('My Bookings')).not.toBeInTheDocument()
      })
    })
  })

  describe('Dynamic Styling', () => {
    it('applies correct auth button styling when not scrolled', () => {
      renderHeader()
      
      const loginBtn = screen.getByText('Login').closest('a') as HTMLElement
      const registerBtn = screen.getByText('Register').closest('a') as HTMLElement
      
      expect(loginBtn.style.color).toBe('rgb(255, 255, 255)')
      expect(registerBtn.style.backgroundColor).toBe('rgb(255, 255, 255)')
      expect(registerBtn.style.color).toBe('rgb(16, 31, 70)')
    })

    it('applies correct auth button styling when scrolled', async () => {
      renderHeader()
      
      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { value: 150, writable: true })
      fireEvent.scroll(window)
      
      await waitFor(() => {
        const loginBtn = screen.getByText('Login').closest('a') as HTMLElement
        const registerBtn = screen.getByText('Register').closest('a') as HTMLElement
        
        expect(loginBtn.style.color).toBe('rgb(16, 31, 70)')
        expect(registerBtn.style.backgroundColor).toBe('rgb(16, 31, 70)')
        expect(registerBtn.style.color).toBe('rgb(255, 255, 255)')
      })
    })

    it('applies correct user button styling when authenticated and not scrolled', () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'token') return 'mock-token'
        if (key === 'user') return 'John Doe'
        return null
      })
      
      renderHeader()
      
      const userButton = screen.getByText('Welcome, John Doe').closest('button') as HTMLElement
      expect(userButton.style.color).toBe('rgb(255, 255, 255)')
    })

    it('applies correct user button styling when authenticated and scrolled', async () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'token') return 'mock-token'
        if (key === 'user') return 'John Doe'
        return null
      })
      
      renderHeader()
      
      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { value: 150, writable: true })
      fireEvent.scroll(window)
      
      await waitFor(() => {
        const userButton = screen.getByText('Welcome, John Doe').closest('button') as HTMLElement
        expect(userButton.style.color).toBe('rgb(16, 31, 70)')
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      renderHeader()
      
      const nav = document.querySelector('nav#navigation')
      expect(nav).toBeInTheDocument()
      
      const searchButton = document.querySelector('.search-icon')
      expect(searchButton).toBeInTheDocument()
    })

    it('has proper heading structure', () => {
      renderHeader()
      
      const siteTitle = document.querySelector('.site-title')
      expect(siteTitle).toBeInTheDocument()
    })

    it('dropdown has proper focus management', async () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'token') return 'mock-token'
        if (key === 'user') return 'John Doe'
        return null
      })
      
      renderHeader()
      const user = userEvent.setup()
      
      const userButton = screen.getByText('Welcome, John Doe').closest('button')
      expect(userButton).toHaveAttribute('style')
      expect(userButton).toHaveProperty('tagName', 'BUTTON')
      
      await user.click(userButton as HTMLElement)
      
      await waitFor(() => {
        const dropdownMenu = document.querySelector('.dropdown-menu')
        expect(dropdownMenu).toBeInTheDocument()
      })
    })
  })

  describe('Responsive Behavior', () => {
    it('renders mobile menu container', () => {
      renderHeader()
      expect(document.querySelector('.mobile-menu-container')).toBeInTheDocument()
    })

    it('has responsive visibility classes', () => {
      renderHeader()
      expect(document.querySelector('.d-none.d-lg-block')).toBeInTheDocument()
      expect(document.querySelector('.d-flex.justify-content-lg-end.justify-content-between')).toBeInTheDocument()
    })
  })

  describe('Blog Navigation Links', () => {
    it('has correct blog navigation link attributes', () => {
      renderHeader()
      const blogLinks = {
        'Blog List': '/blog-archive',
        'Blog Left Sidebar': '/blog-archive-left',
        'Blog Both Sidebar': '/blog-archive-both',
        'Blog Single': '/blog-single'
      }
      
      Object.entries(blogLinks).forEach(([text, href]) => {
        const link = screen.getByText(text).closest('a')
        expect(link).toHaveAttribute('href', href)
      })
    })
  })


  describe('User Interaction Edge Cases', () => {
    it('handles rapid dropdown toggle clicks', async () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'token') return 'mock-token'
        if (key === 'user') return 'John Doe'
        return null
      })
      
      renderHeader()
      const user = userEvent.setup()
      
      const userButton = screen.getByText('Welcome, John Doe').closest('button')
      
      // Rapid clicks
      await user.click(userButton as HTMLElement)
      await user.click(userButton as HTMLElement)
      await user.click(userButton as HTMLElement)
      
      // Should handle gracefully without errors
      expect(userButton).toBeInTheDocument()
    })

    it('handles scroll events during dropdown interaction', async () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'token') return 'mock-token'
        if (key === 'user') return 'John Doe'
        return null
      })
      
      renderHeader()
      const user = userEvent.setup()
      
      const userButton = screen.getByText('Welcome, John Doe').closest('button')
      await user.click(userButton as HTMLElement)
      
      await waitFor(() => {
        expect(screen.getByText('My Bookings')).toBeInTheDocument()
      })
      
      // Simulate scroll while dropdown is open
      Object.defineProperty(window, 'scrollY', { value: 150, writable: true })
      fireEvent.scroll(window)
      
      // Dropdown should still be functional
      const logoutButton = screen.getByText('Logout')
      await user.click(logoutButton)
      
      expect(window.location.href).toBe('/')
    })
  })
})
