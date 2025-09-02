import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import Wishlist_page from '../Wishlist-page'

// Mock the API module
vi.mock('../utils/api', () => ({
  default: {
    get: vi.fn(),
    delete: vi.fn(),     
  }
}))

// Mock Header component
vi.mock('../Header', () => ({
  default: () => <div data-testid="header-mock">Header Component</div>,
}))

// Mock react-router-dom hooks
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Import the component AFTER mocks
const api = (await import('../utils/api')).default

// Helper function to render component with router
const renderWithRouter = (component, { route = '/wishlist' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {component}
    </MemoryRouter>
  )
}

describe('Wishlist_page Component', () => {
  // Mock localStorage
  const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  }

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks()
    
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    })

    // Mock console.error to avoid noise
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Wishlist Item Removal', () => {
  const mockPackages = [
    {
      _id: 'package1',
      title: 'Amazing Paris Tour',
      description: 'Explore the beautiful city of Paris.',
      price: 199900,
    },
    {
      _id: 'package2', 
      title: 'Tokyo Adventure',
      description: 'Experience Tokyo culture.',
      price: 249900,
    }
  ]

  beforeEach(() => {
    mockLocalStorage.getItem.mockReturnValue('valid-token')
    api.get.mockResolvedValue({ data: { packages: mockPackages } })
    // Mock the delete method
    api.delete = vi.fn()
  })

  it('removes package from wishlist when Wish List button is clicked', async () => {
    const user = userEvent.setup()
    api.delete.mockResolvedValue({})
    
    renderWithRouter(<Wishlist_page />)
    
    await waitFor(() => {
      expect(screen.getByText('Amazing Paris Tour')).toBeInTheDocument()
      expect(screen.getByText('Tokyo Adventure')).toBeInTheDocument()
    })

    // Use more specific selector for wishlist buttons
    const wishListButtons = document.querySelectorAll('.btn-wrap a[style*="cursor: pointer"]')
    await user.click(wishListButtons[0])

    // Verify API delete call
    expect(api.delete).toHaveBeenCalledWith('/wishlist/package1')

    // Verify package is removed from UI
    await waitFor(() => {
      expect(screen.queryByText('Amazing Paris Tour')).not.toBeInTheDocument()
      expect(screen.getByText('Tokyo Adventure')).toBeInTheDocument()
    })
  })

  it('redirects to login when no token during wishlist removal', async () => {
    const user = userEvent.setup()
    
    // First render with token to get packages
    renderWithRouter(<Wishlist_page />)
    
    await waitFor(() => {
      expect(screen.getByText('Amazing Paris Tour')).toBeInTheDocument()
    })

    // Clear the navigate mock after initial render
    mockNavigate.mockClear()
    
    // Mock no token for the toggleWishlist call
    mockLocalStorage.getItem.mockReturnValueOnce(null)

    const wishListButtons = document.querySelectorAll('.btn-wrap a[style*="cursor: pointer"]')
    await user.click(wishListButtons[0])

    expect(mockNavigate).toHaveBeenCalledWith('/admin/login')
  })

  it('handles error during wishlist removal', async () => {
    const user = userEvent.setup()
    api.delete.mockRejectedValue(new Error('Delete failed'))
    
    renderWithRouter(<Wishlist_page />)
    
    await waitFor(() => {
      expect(screen.getByText('Amazing Paris Tour')).toBeInTheDocument()
    })

    const wishListButtons = document.querySelectorAll('.btn-wrap a[style*="cursor: pointer"]')
    await user.click(wishListButtons[0])

    expect(api.delete).toHaveBeenCalledWith('/wishlist/package1')
    expect(console.error).toHaveBeenCalledWith('Failed to update wishlist', expect.any(Error))
    
    // Package should still be visible since removal failed
    expect(screen.getByText('Amazing Paris Tour')).toBeInTheDocument()
  })

  it('removes last package and shows empty state', async () => {
    const user = userEvent.setup()
    const singlePackage = [mockPackages[0]]
    api.get.mockResolvedValue({ data: { packages: singlePackage } })
    api.delete.mockResolvedValue({})
    
    renderWithRouter(<Wishlist_page />)
    
    await waitFor(() => {
      expect(screen.getByText('Amazing Paris Tour')).toBeInTheDocument()
    })

    // Use querySelector for the specific wishlist button, not the page title
    const wishListButton = document.querySelector('.btn-wrap a[style*="cursor: pointer"]')
    await user.click(wishListButton)

    await waitFor(() => {
      expect(screen.getByText('Your wishlist is empty.')).toBeInTheDocument()
    })
  })
})


  

  describe('Authentication Edge Cases', () => {
  it('handles token check during component mount', async () => {
    mockLocalStorage.getItem.mockReturnValue('valid-token')
    api.get.mockResolvedValue({ data: { packages: [] } })
    
    renderWithRouter(<Wishlist_page />)
    
    await waitFor(() => {
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('token')
      expect(api.get).toHaveBeenCalledWith('/wishlist')
    })
  })

  it('does not make API call when no token', async () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    
    renderWithRouter(<Wishlist_page />)
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/admin/login')
    })
    
    expect(api.get).not.toHaveBeenCalled()
  })
})


describe('Package Navigation Links', () => {
  const mockPackages = [{
    _id: 'package1',
    title: 'Test Package',
    imageUrl: '/test-image.jpg'
  }]

  beforeEach(() => {
    mockLocalStorage.getItem.mockReturnValue('valid-token')
    api.get.mockResolvedValue({ data: { packages: mockPackages } })
  })

  it('renders image links to package detail page', async () => {
    renderWithRouter(<Wishlist_page />)
    
    await waitFor(() => {
      const imageLinks = document.querySelectorAll('figure.feature-image a')
      expect(imageLinks).toHaveLength(1)
      expect(imageLinks[0]).toHaveAttribute('href', '/package-detail/package1')
    })
  })

  it('renders title links to package detail page', async () => {
    renderWithRouter(<Wishlist_page />)
    
    await waitFor(() => {
      const titleLinks = document.querySelectorAll('.package-content h3 a')
      expect(titleLinks).toHaveLength(1)
      expect(titleLinks[0]).toHaveAttribute('href', '/package-detail/package1')
    })
  })

  it('renders Book Now links to package detail page', async () => {
    renderWithRouter(<Wishlist_page />)
    
    await waitFor(() => {
      const bookNowLinks = document.querySelectorAll('.btn-wrap a.button-text')
      const bookNowLink = Array.from(bookNowLinks).find(link => 
        link.textContent.includes('Book Now')
      )
      expect(bookNowLink).toHaveAttribute('href', '/package-detail/package1')
    })
  })
})


describe('Price Display Logic', () => {
  it('calculates and displays price correctly from cents', async () => {
    const mockPackages = [{
      _id: 'package1',
      title: 'Test Package',
      price: 123456 // $1234.56 in cents
    }]
    
    mockLocalStorage.getItem.mockReturnValue('valid-token')
    api.get.mockResolvedValue({ data: { packages: mockPackages } })
    
    renderWithRouter(<Wishlist_page />)
    
    await waitFor(() => {
      expect(screen.getByText('$1234.56')).toBeInTheDocument()
    })
  })


  it('uses fallback price when price is null', async () => {
    const mockPackages = [{
      _id: 'package1',
      title: 'No Price Package',
      price: null
    }]
    
    mockLocalStorage.getItem.mockReturnValue('valid-token')
    api.get.mockResolvedValue({ data: { packages: mockPackages } })
    
    renderWithRouter(<Wishlist_page />)
    
    await waitFor(() => {
      expect(screen.getByText('$1,900')).toBeInTheDocument()
    })
  })
})


describe('Rating Display', () => {
  it('calculates rating percentage correctly', async () => {
    const mockPackages = [
      { _id: '1', title: 'Package 1', rating: 3.5 },
      { _id: '2', title: 'Package 2', rating: 2.0 },
      { _id: '3', title: 'Package 3', rating: 5.0 }
    ]
    
    mockLocalStorage.getItem.mockReturnValue('valid-token')
    api.get.mockResolvedValue({ data: { packages: mockPackages } })
    
    renderWithRouter(<Wishlist_page />)
    
    await waitFor(() => {
      const ratingStars = document.querySelectorAll('.rating-start span')
      expect(ratingStars[0]).toHaveStyle('width: 70%') // 3.5 * 20 = 70%
      expect(ratingStars[1]).toHaveStyle('width: 40%') // 2.0 * 20 = 40%
      expect(ratingStars[2]).toHaveStyle('width: 100%') // 5.0 * 20 = 100%
    })
  })

  it('handles null rating correctly', async () => {
    const mockPackages = [{
      _id: 'package1',
      title: 'No Rating Package',
      rating: null
    }]
    
    mockLocalStorage.getItem.mockReturnValue('valid-token')
    api.get.mockResolvedValue({ data: { packages: mockPackages } })
    
    renderWithRouter(<Wishlist_page />)
    
    await waitFor(() => {
      const ratingStars = document.querySelectorAll('.rating-start span')
      expect(ratingStars[0]).toHaveStyle('width: 0%')
    })
  })
})


describe('Conditional Rendering Logic', () => {
  it('switches from empty state to package list when data changes', async () => {
    mockLocalStorage.getItem.mockReturnValue('valid-token')
    
    // Start with empty wishlist
    api.get.mockResolvedValueOnce({ data: { packages: [] } })
    
    const { rerender } = renderWithRouter(<Wishlist_page />)
    
    await waitFor(() => {
      expect(screen.getByText('Your wishlist is empty.')).toBeInTheDocument()
    })

    // Now mock with packages
    const mockPackages = [{
      _id: 'package1',
      title: 'New Package'
    }]
    
    api.get.mockResolvedValue({ data: { packages: mockPackages } })
    
    rerender(<Wishlist_page />)
    
    await waitFor(() => {
      expect(screen.queryByText('Your wishlist is empty.')).not.toBeInTheDocument()
      expect(screen.getByText('New Package')).toBeInTheDocument()
    })
  })
})


describe('Component Lifecycle', () => {
  it('calls fetchWishlist when navigate dependency changes', async () => {
    mockLocalStorage.getItem.mockReturnValue('valid-token')
    api.get.mockResolvedValue({ data: { packages: [] } })
    
    renderWithRouter(<Wishlist_page />)
    
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledTimes(1)
    })
    
    // The useEffect should only run once with navigate dependency
    expect(api.get).toHaveBeenCalledWith('/wishlist')
  })
})


  describe('Authentication Check', () => {
    it('redirects to login when no token is found', async () => {
      mockLocalStorage.getItem.mockReturnValue(null) // No token
      
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/admin/login')
      })
    })

    it('does not redirect when token is present', async () => {
      mockLocalStorage.getItem.mockReturnValue('valid-token')
      api.get.mockResolvedValue({ data: { packages: [] } })
      
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        expect(mockNavigate).not.toHaveBeenCalledWith('/admin/login')
      })
    })
  })

  describe('Empty Wishlist State', () => {
    beforeEach(() => {
      mockLocalStorage.getItem.mockReturnValue('valid-token')
      api.get.mockResolvedValue({ data: { packages: [] } })
    })

    it('renders empty wishlist message when no packages', async () => {
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        expect(screen.getByText('Your wishlist is empty.')).toBeInTheDocument()
      })
    })

    it('renders header and banner for empty wishlist', async () => {
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        expect(screen.getByTestId('header-mock')).toBeInTheDocument()
        expect(screen.getByText('Wish List')).toBeInTheDocument()
      })
    })

    it('renders footer for empty wishlist', async () => {
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        expect(screen.getByText('About Travel')).toBeInTheDocument()
        expect(screen.getByText('CONTACT INFORMATION')).toBeInTheDocument()
        expect(screen.getByText('SUBSCRIBE US')).toBeInTheDocument()
        expect(screen.getByText('Copyright © 2021 Travele. All rights reserveds')).toBeInTheDocument()
      })
    })

    it('applies correct styling to empty message', async () => {
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        const emptyMessage = screen.getByText('Your wishlist is empty.')
        expect(emptyMessage).toHaveStyle('text-align: center')
        expect(emptyMessage.tagName).toBe('H2')
      })
    })
  })

  describe('API Error Handling', () => {
    beforeEach(() => {
      mockLocalStorage.getItem.mockReturnValue('valid-token')
    })

    it('handles API error and shows empty state', async () => {
      api.get.mockRejectedValue(new Error('API Error'))
      
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        expect(screen.getByText('Your wishlist is empty.')).toBeInTheDocument()
      })
      
      expect(console.error).toHaveBeenCalledWith('Failed to fetch wishlist', expect.any(Error))
    })

    it('handles API response without packages property', async () => {
      api.get.mockResolvedValue({ data: {} }) // No packages property
      
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        expect(screen.getByText('Your wishlist is empty.')).toBeInTheDocument()
      })
    })
  })

  describe('Wishlist with Packages', () => {
    const mockPackages = [
      {
        _id: 'package1',
        title: 'Amazing Paris Tour',
        description: 'Explore the beautiful city of Paris with guided tours.',
        imageUrl: '/assets/images/paris.jpg',
        price: 199900, // $1999.00 in cents
        tripDuration: '7D/6N',
        people: '4',
        destination: 'Paris, France',
        rating: 4.8,
        reviewsCount: 156
      },
      {
        _id: 'package2',
        title: 'Tokyo Adventure',
        description: 'Experience the vibrant culture of Tokyo.',
        imageUrl: '/assets/images/tokyo.jpg',
        price: 249900, // $2499.00 in cents
        tripDuration: '5D/4N',
        people: '2',
        destination: 'Tokyo, Japan',
        rating: 4.6,
        reviewsCount: 89
      },
      {
        _id: 'package3',
        title: 'Basic Package',
        description: 'A simple travel package.',
        // Missing optional fields to test fallbacks
        rating: 0,
        reviewsCount: 0
      }
    ]

    beforeEach(() => {
      mockLocalStorage.getItem.mockReturnValue('valid-token')
      api.get.mockResolvedValue({ data: { packages: mockPackages } })
    })

    it('renders packages when wishlist has items', async () => {
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        expect(screen.getByText('Amazing Paris Tour')).toBeInTheDocument()
        expect(screen.getByText('Tokyo Adventure')).toBeInTheDocument()
        expect(screen.getByText('Basic Package')).toBeInTheDocument()
      })
    })

   it('displays package images with fallback', async () => {
  renderWithRouter(<Wishlist_page />)
  
  await waitFor(() => {
    // Get all images and find by alt attribute
    const allImages = screen.getAllByRole('img')
    
    const parisImage = allImages.find(img => img.getAttribute('alt') === 'Amazing Paris Tour')
    const tokyoImage = allImages.find(img => img.getAttribute('alt') === 'Tokyo Adventure')
    const basicImage = allImages.find(img => img.getAttribute('alt') === 'Basic Package')
    
    expect(parisImage).toBeDefined()
    expect(tokyoImage).toBeDefined()
    expect(basicImage).toBeDefined()
    
    expect(parisImage).toHaveAttribute('src', '/assets/images/paris.jpg')
    expect(tokyoImage).toHaveAttribute('src', '/assets/images/tokyo.jpg')
    expect(basicImage).toHaveAttribute('src', '/assets/images/img5.jpg')
  })
})


    it('displays correct pricing information', async () => {
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        expect(screen.getByText('$1999.00')).toBeInTheDocument()
        expect(screen.getByText('$2499.00')).toBeInTheDocument()
        expect(screen.getByText('$1,900')).toBeInTheDocument() // fallback price
        
        const perPersonTexts = screen.getAllByText('/ per person')
        expect(perPersonTexts).toHaveLength(3)
      })
    })

    it('displays package metadata correctly', async () => {
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        // Trip durations
const durations = screen.getAllByText('7D/6N')
expect(durations.length).toBeGreaterThanOrEqual(1)
expect(durations[0]).toBeInTheDocument()
        expect(screen.getByText('5D/4N')).toBeInTheDocument()
        
        // People count
        expect(screen.getByText('People: 4')).toBeInTheDocument()
        expect(screen.getByText('People: 2')).toBeInTheDocument()
        expect(screen.getByText('People: 5')).toBeInTheDocument() // fallback
        
        // Destinations
        expect(screen.getByText('Paris, France')).toBeInTheDocument()
        expect(screen.getByText('Tokyo, Japan')).toBeInTheDocument()
        expect(screen.getByText('-')).toBeInTheDocument() // fallback destination
      })
    })

    it('displays rating and reviews correctly', async () => {
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        // Review counts
        expect(screen.getByText('(156 reviews)')).toBeInTheDocument()
        expect(screen.getByText('(89 reviews)')).toBeInTheDocument()
        expect(screen.getByText('(0 reviews)')).toBeInTheDocument()
        
        // Check rating stars
        const ratingStars = document.querySelectorAll('.rating-start span')
        expect(ratingStars).toHaveLength(3)
        expect(ratingStars[0]).toHaveStyle('width: 96%') // 4.8 * 20 = 96%
        expect(ratingStars[1]).toHaveStyle('width: 92%') // 4.6 * 20 = 92%
        expect(ratingStars[2]).toHaveStyle('width: 0%') // 0 * 20 = 0%
      })
    })

    it('displays package descriptions', async () => {
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        expect(screen.getByText('Explore the beautiful city of Paris with guided tours.')).toBeInTheDocument()
        expect(screen.getByText('Experience the vibrant culture of Tokyo.')).toBeInTheDocument()
        expect(screen.getByText('A simple travel package.')).toBeInTheDocument()
      })
    })

    it('renders Book Now buttons with correct links', async () => {
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        const bookNowButtons = screen.getAllByText('Book Now')
        expect(bookNowButtons).toHaveLength(3)
        
        // Check links
        bookNowButtons.forEach((button, index) => {
          const link = button.closest('a')
          expect(link).toHaveAttribute('href', `/package-detail/${mockPackages[index]._id}`)
        })
        
        // Check icons
        const arrowIcons = document.querySelectorAll('.fa-arrow-right')
        expect(arrowIcons).toHaveLength(3)
      })
    })

    it('renders package title links correctly', async () => {
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        const titleLinks = document.querySelectorAll('.package-content h3 a')
        expect(titleLinks).toHaveLength(3)
        
        expect(titleLinks[0]).toHaveAttribute('href', '/package-detail/package1')
        expect(titleLinks[1]).toHaveAttribute('href', '/package-detail/package2')
        expect(titleLinks[2]).toHaveAttribute('href', '/package-detail/package3')
      })
    })

    it('renders proper grid layout', async () => {
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        const packageColumns = document.querySelectorAll('.col-lg-4.col-md-6')
        expect(packageColumns).toHaveLength(3)
        
        const packageWraps = document.querySelectorAll('.package-wrap')
        expect(packageWraps).toHaveLength(3)
      })
    })
  })

  describe('Component Structure', () => {
    beforeEach(() => {
      mockLocalStorage.getItem.mockReturnValue('valid-token')
      api.get.mockResolvedValue({ data: { packages: [] } })
    })

    it('renders main page structure when wishlist has packages', async () => {
      const mockPackages = [{
        _id: 'package1',
        title: 'Test Package',
        description: 'Test description'
      }]
      
      api.get.mockResolvedValue({ data: { packages: mockPackages } })
      
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        // Check main structure
        const pageContainer = document.querySelector('#page')
        expect(pageContainer).toBeInTheDocument()
        expect(pageContainer).toHaveClass('full-page')
        
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
    })

    it('renders banner section with correct styling', async () => {
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        // Check banner container
        const bannerContainer = document.querySelector('.inner-baner-container')
        expect(bannerContainer).toBeInTheDocument()
        expect(bannerContainer).toHaveStyle('background-image: url(/assets/images/inner-banner.jpg)')
        
        // Check banner title
        expect(screen.getByText('Wish List')).toBeInTheDocument()
        const bannerTitle = screen.getByText('Wish List')
        expect(bannerTitle).toHaveClass('inner-title')
        expect(bannerTitle.tagName).toBe('H1')
        
        // Check banner shape
        const innerShape = document.querySelector('.inner-shape')
        expect(innerShape).toBeInTheDocument()
      })
    })
  })

  describe('Footer Section', () => {
    beforeEach(() => {
      mockLocalStorage.getItem.mockReturnValue('valid-token')
      api.get.mockResolvedValue({ data: { packages: [] } })
    })

    it('renders all footer widgets', async () => {
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        // About Travel section
        expect(screen.getByText('About Travel')).toBeInTheDocument()
        expect(screen.getByText(/Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus/)).toBeInTheDocument()
        
        // Contact Information section
        expect(screen.getByText('CONTACT INFORMATION')).toBeInTheDocument()
        expect(screen.getByText('+01 (977) 2599 12')).toBeInTheDocument()
        expect(screen.getByText('3146 Koontz, California')).toBeInTheDocument()
        
        // Latest Post section
        expect(screen.getByText('Latest Post')).toBeInTheDocument()
        expect(screen.getByText('Life is a beautiful journey not a destination')).toBeInTheDocument()
        expect(screen.getByText('Take only memories, leave only footprints')).toBeInTheDocument()
        
        // Subscribe section
        expect(screen.getByText('SUBSCRIBE US')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Your Email..')).toBeInTheDocument()
        expect(screen.getByDisplayValue('SUBSCRIBE NOW')).toBeInTheDocument()
      })
    })

    it('renders footer menu and copyright', async () => {
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
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

    it('renders newsletter subscription form', async () => {
      const user = userEvent.setup()
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        const emailInput = screen.getByPlaceholderText('Your Email..')
        expect(emailInput).toBeInTheDocument()
        expect(emailInput).toHaveAttribute('type', 'email')
        
        const submitButton = screen.getByDisplayValue('SUBSCRIBE NOW')
        expect(submitButton).toBeInTheDocument()
        expect(submitButton).toHaveAttribute('type', 'submit')
      })
      
      // Test form interaction
      const emailInput = screen.getByPlaceholderText('Your Email..')
      await user.type(emailInput, 'test@example.com')
      expect(emailInput).toHaveValue('test@example.com')
    })
  })

  describe('API Integration', () => {
    beforeEach(() => {
      mockLocalStorage.getItem.mockReturnValue('valid-token')
    })

    it('makes API call to fetch wishlist', async () => {
      api.get.mockResolvedValue({ data: { packages: [] } })
      
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/wishlist')
      })
    })

    it('calls API only once on component mount', async () => {
      api.get.mockResolvedValue({ data: { packages: [] } })
      
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        expect(api.get).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Package Icons and Metadata', () => {
    beforeEach(() => {
      mockLocalStorage.getItem.mockReturnValue('valid-token')
      const mockPackages = [{
        _id: 'package1',
        title: 'Test Package',
        tripDuration: '5D/4N',
        people: '3',
        destination: 'Test Destination'
      }]
      api.get.mockResolvedValue({ data: { packages: mockPackages } })
    })

    it('displays correct icons for package metadata', async () => {
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        // Check for FontAwesome icons
        expect(document.querySelector('.fa-clock')).toBeInTheDocument()
        expect(document.querySelector('.fa-user-friends')).toBeInTheDocument()
        expect(document.querySelector('.fa-map-marker-alt')).toBeInTheDocument()
      })
    })
  })

  describe('Fallback Values', () => {
    beforeEach(() => {
      mockLocalStorage.getItem.mockReturnValue('valid-token')
      const mockPackages = [{
        _id: 'package1',
        // Missing most optional fields to test fallbacks
      }]
      api.get.mockResolvedValue({ data: { packages: mockPackages } })
    })

    it('displays fallback values when package data is missing', async () => {
      renderWithRouter(<Wishlist_page />)
      
      await waitFor(() => {
        expect(screen.getByText('Package Title')).toBeInTheDocument() // title fallback
        expect(screen.getByText('$1,900')).toBeInTheDocument() // price fallback
        expect(screen.getByText('7D/6N')).toBeInTheDocument() // duration fallback
        expect(screen.getByText('People: 5')).toBeInTheDocument() // people fallback
        expect(screen.getByText('-')).toBeInTheDocument() // destination fallback
        expect(screen.getByText('(0 reviews)')).toBeInTheDocument() // reviews fallback
      })
    })
  })
})

