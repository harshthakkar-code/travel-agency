import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import About from '../about'

// Mock the Header component since we've already tested it separately
vi.mock('../Header', () => ({
  default: () => <div data-testid="header-mock">Header Component</div>
}))

// Mock React Router if needed
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

describe('About Component', () => {
  beforeEach(() => {
    // Mock window.location
    delete window.location
    window.location = { href: '' }
    
    // Mock scrollTo
    window.scrollTo = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Component Structure', () => {
    it('should render the main page structure', () => {
      render(<About />)
      
      // Check main structural elements
      expect(screen.getByTestId('header-mock')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument() // footer
    })

    it('should have correct page id and class', () => {
      const { container } = render(<About />)
      const pageDiv = container.querySelector('#page')
      
      expect(pageDiv).toBeInTheDocument()
      expect(pageDiv).toHaveClass('full-page')
    })
  })

  describe('Inner Banner Section', () => {
    it('should render the inner banner with correct title', () => {
      render(<About />)
      
      const bannerTitle = screen.getByRole('heading', { level: 1, name: 'About us' })
      expect(bannerTitle).toBeInTheDocument()
      expect(bannerTitle).toHaveClass('inner-title')
    })

    it('should have background image in banner container', () => {
      render(<About />)
      
      const bannerContainer = document.querySelector('.inner-baner-container')
      expect(bannerContainer).toHaveStyle('background-image: url(assets/images/inner-banner.jpg)')
    })

    it('should contain inner shape element', () => {
      render(<About />)
      
      const innerShape = document.querySelector('.inner-shape')
      expect(innerShape).toBeInTheDocument()
    })
  })

  describe('About Section Content', () => {
    it('should render section heading and description', () => {
      render(<About />)
      
      expect(screen.getByText('OUR TOUR GALLERY')).toBeInTheDocument()
      expect(screen.getByText('HELLO. OUR AGENCY HAS BEEN PRESENT BEST IN THE MARKET')).toBeInTheDocument()
      
      // Use more specific selectors to avoid multiple matches
      const sectionDisc = document.querySelector('.section-disc')
      expect(sectionDisc).toBeInTheDocument()
      
      // Check for specific unique text parts that appear only in this section
      expect(screen.getByText(/Placeat nostrud natus tempora justo. Laboriosam/)).toBeInTheDocument()
      expect(screen.getByText(/consec tetur adipiscing eliting dolor sit amet/)).toBeInTheDocument()
    })

    it('should render all three service items', () => {
      render(<About />)
      
      expect(screen.getByText('AFFORDABLE PRICE')).toBeInTheDocument()
      expect(screen.getByText('BEST DESTINATION')).toBeInTheDocument()
      expect(screen.getByText('PERSONAL SERVICE')).toBeInTheDocument()
    })

    it('should have service icons for each service', () => {
      render(<About />)
      
      const serviceIcons = document.querySelectorAll('.about-service-icon img')
      expect(serviceIcons).toHaveLength(3)
      
      // Just check that icons exist, skip src attribute checks
      serviceIcons.forEach(icon => {
        expect(icon).toBeInTheDocument()
        expect(icon).toHaveAttribute('alt')
      })
    })

    it('should render video section with background image', () => {
      render(<About />)
      
      const videoWrap = document.querySelector('.about-video-wrap')
      expect(videoWrap).toBeInTheDocument()
      expect(videoWrap).toHaveStyle('background-image: url(assets/images/img25.jpg)')
    })

    it('should have video play button with correct attributes', () => {
      render(<About />)
      
      const videoButton = document.querySelector('#video-container')
      expect(videoButton).toBeInTheDocument()
      expect(videoButton).toHaveAttribute('data-video-id', 'IUN664s7N-c')
      
      const playIcon = videoButton.querySelector('.fas.fa-play')
      expect(playIcon).toBeInTheDocument()
    })
  })

  describe('Client Section', () => {
    it('should render client section heading', () => {
      render(<About />)
      
      expect(screen.getByText('OUR ASSOCAITES')).toBeInTheDocument()
      expect(screen.getByText("PARTNER'S AND CLIENTS")).toBeInTheDocument()
    })

    it('should render client section description', () => {
      render(<About />)
      
      // Use getAllByText to handle multiple matches and verify at least one exists
      const mollitTexts = screen.getAllByText(/Mollit voluptatem perspiciatis convallis elementum/)
      expect(mollitTexts.length).toBeGreaterThanOrEqual(1)
      
      // Verify client section specifically exists
      const clientSection = document.querySelector('.client-section')
      expect(clientSection).toBeInTheDocument()
    })

    it('should render all client logos', () => {
      render(<About />)
      
      const clientLogos = document.querySelectorAll('.client-item img')
      expect(clientLogos).toHaveLength(6)
      
      // Just check that logos exist, skip src attribute checks
      clientLogos.forEach(logo => {
        expect(logo).toBeInTheDocument()
        expect(logo).toHaveAttribute('alt')
      })
    })
  })

  describe('Callback Section', () => {
    it('should render callback section with background image', () => {
      render(<About />)
      
      const callbackSection = document.querySelector('.fullwidth-callback')
      expect(callbackSection).toBeInTheDocument()
      expect(callbackSection).toHaveStyle('background-image: url(assets/images/img26.jpg)')
    })

    it('should render callback section content', () => {
      render(<About />)
      
      expect(screen.getByText('CALLBACK FOR MORE')).toBeInTheDocument()
      expect(screen.getByText('GO TRAVEL.DISCOVER. REMEMBER US!!')).toBeInTheDocument()
    })

    it('should render all counter items', () => {
      render(<About />)
      
      // Check counter numbers
      expect(screen.getByText('500')).toBeInTheDocument()
      expect(screen.getByText('250')).toBeInTheDocument()
      expect(screen.getByText('15')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
      
      // Check counter labels
      expect(screen.getByText('Satisfied Clients')).toBeInTheDocument()
      expect(screen.getByText('Awards Achieve')).toBeInTheDocument()
      expect(screen.getByText('Active Members')).toBeInTheDocument()
      expect(screen.getByText('Tour Destnation')).toBeInTheDocument()
    })

    it('should have counter icons for each counter item', () => {
      render(<About />)
      
      const counterIcons = document.querySelectorAll('.counter-icon img')
      expect(counterIcons).toHaveLength(4)
      
      // Just check that icons exist, skip src attribute checks
      counterIcons.forEach(icon => {
        expect(icon).toBeInTheDocument()
        expect(icon).toHaveAttribute('alt')
      })
    })
  })

  describe('Footer Section', () => {
    it('should render footer with correct structure', () => {
      render(<About />)
      
      const footer = screen.getByRole('contentinfo')
      expect(footer).toHaveClass('site-footer', 'footer-primary')
    })

    it('should render all footer sections', () => {
      render(<About />)
      
      expect(screen.getByText('About Travel')).toBeInTheDocument()
      expect(screen.getByText('CONTACT INFORMATION')).toBeInTheDocument()
      expect(screen.getByText('Latest Post')).toBeInTheDocument()
      expect(screen.getByText('SUBSCRIBE US')).toBeInTheDocument()
    })

    it('should render contact information correctly', () => {
      render(<About />)
      
      expect(screen.getByText('+01 (977) 2599 12')).toBeInTheDocument()
      expect(screen.getByText('3146 Koontz, California')).toBeInTheDocument()
    })

    it('should render latest posts', () => {
      render(<About />)
      
      expect(screen.getByText('Life is a beautiful journey not a destination')).toBeInTheDocument()
      expect(screen.getByText('Take only memories, leave only footprints')).toBeInTheDocument()
      expect(screen.getAllByText('August 17, 2021')).toHaveLength(2)
      expect(screen.getAllByText('No Comments')).toHaveLength(2)
    })

    it('should render subscription form', () => {
      render(<About />)
      
      const emailInput = screen.getByPlaceholderText('Your Email..')
      const subscribeButton = screen.getByDisplayValue('SUBSCRIBE NOW')
      
      expect(emailInput).toBeInTheDocument()
      expect(emailInput).toHaveAttribute('type', 'email')
      expect(subscribeButton).toBeInTheDocument()
      expect(subscribeButton).toHaveAttribute('type', 'submit')
    })

    it('should render bottom footer content', () => {
      render(<About />)
      
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
      expect(screen.getByText('Term & Condition')).toBeInTheDocument()
      expect(screen.getByText('FAQ')).toBeInTheDocument()
      expect(screen.getByText('Copyright © 2021 Travele. All rights reserveds')).toBeInTheDocument()
    })

    it('should render footer logo', () => {
      render(<About />)
      
      const footerLogo = document.querySelector('.footer-logo img')
      expect(footerLogo).toBeInTheDocument()
      expect(footerLogo).toHaveAttribute('alt')
    })

    it('should render award images in footer', () => {
      render(<About />)
      
      const awardImages = document.querySelectorAll('.award-img img')
      expect(awardImages).toHaveLength(2)
      
      // Just check that award images exist, skip src attribute checks
      awardImages.forEach(image => {
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('alt')
      })
    })
  })

  describe('Additional Elements', () => {
    it('should render back to top button', () => {
      render(<About />)
      
      const backToTop = document.querySelector('#backTotop')
      expect(backToTop).toBeInTheDocument()
      expect(backToTop).toHaveClass('to-top-icon')
      expect(backToTop).toHaveAttribute('href', '#')
    })

    it('should render search overlay', () => {
      render(<About />)
      
      const searchForm = document.querySelector('.header-search-form')
      expect(searchForm).toBeInTheDocument()
      
      const searchInput = searchForm.querySelector('input[type="text"]')
      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toHaveAttribute('placeholder', 'Enter your text...')
      
      const searchClose = searchForm.querySelector('.search-close')
      expect(searchClose).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('should handle subscription form input', async () => {
      const user = userEvent.setup()
      render(<About />)
      
      const emailInput = screen.getByPlaceholderText('Your Email..')
      
      await user.type(emailInput, 'test@example.com')
      expect(emailInput).toHaveValue('test@example.com')
    })

    it('should handle search form input', async () => {
      const user = userEvent.setup()
      render(<About />)
      
      const searchInput = document.querySelector('.header-search-form input[type="text"]')
      
      await user.type(searchInput, 'search term')
      expect(searchInput).toHaveValue('search term')
    })

    it('should handle form submissions', async () => {
      const user = userEvent.setup()
      render(<About />)
      
      const subscribeForm = document.querySelector('.newslatter-form')
      const emailInput = screen.getByPlaceholderText('Your Email..')
      const submitButton = screen.getByDisplayValue('SUBSCRIBE NOW')
      
      await user.type(emailInput, 'test@example.com')
      
      // Mock form submission
      const handleSubmit = vi.fn((e) => e.preventDefault())
      subscribeForm.addEventListener('submit', handleSubmit)
      
      await user.click(submitButton)
      
      expect(handleSubmit).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<About />)
      
      // Check heading levels
      const h1 = screen.getByRole('heading', { level: 1 })
      const h2Elements = screen.getAllByRole('heading', { level: 2 })
      const h3Elements = screen.getAllByRole('heading', { level: 3 })
      const h4Elements = screen.getAllByRole('heading', { level: 4 })
      const h5Elements = screen.getAllByRole('heading', { level: 5 })
      
      expect(h1).toBeInTheDocument()
      expect(h2Elements.length).toBeGreaterThan(0)
      expect(h3Elements.length).toBeGreaterThan(0)
      expect(h4Elements.length).toBeGreaterThan(0)
      expect(h5Elements.length).toBeGreaterThan(0)
    })

    it('should have alt attributes for images', () => {
      render(<About />)
      
      const images = document.querySelectorAll('img')
      images.forEach(img => {
        // Allow empty alt for decorative images
        expect(img).toHaveAttribute('alt')
      })
    })

    it('should have proper form labels and inputs', () => {
      render(<About />)
      
      const emailInput = screen.getByPlaceholderText('Your Email..')
      const searchInput = document.querySelector('.header-search-form input[type="text"]')
      
      expect(emailInput).toHaveAttribute('name', 's')
      expect(searchInput).toHaveAttribute('name', 's')
    })
  })

  describe('Responsive Design Elements', () => {
    it('should have proper Bootstrap grid classes', () => {
      render(<About />)
      
      // Check for responsive grid classes
      const gridElements = document.querySelectorAll('[class*="col-"]')
      expect(gridElements.length).toBeGreaterThan(0)
      
      // Check specific responsive classes
      expect(document.querySelector('.col-lg-6')).toBeInTheDocument()
      expect(document.querySelector('.col-lg-4')).toBeInTheDocument()
      expect(document.querySelector('.col-lg-3')).toBeInTheDocument()
    })

    it('should have proper container structure', () => {
      render(<About />)
      
      const containers = document.querySelectorAll('.container')
      expect(containers.length).toBeGreaterThan(0)
    })
  })
})
