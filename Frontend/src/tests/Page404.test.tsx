import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Page404 from '../404'

// Mock Header component
vi.mock('../Header', () => ({
  default: () => <div data-testid="header-mock">Header Component</div>,
}))

describe('Page404 Component', () => {
  beforeEach(() => {
    // Mock console.error to avoid noise
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Component Structure', () => {
    it('renders the main page structure correctly', () => {
      render(<Page404 />)
      
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

    it('renders the 404 error section with correct styling', () => {
      render(<Page404 />)
      
      // Check 404 section container - test separately
      const noContentSection = document.querySelector('.no-content-section')
      expect(noContentSection).toBeInTheDocument()
      expect(noContentSection).toHaveClass('404-page')
      
      // Check overlay
      const overlay = document.querySelector('.overlay')
      expect(overlay).toBeInTheDocument()
      
      // Check container
      const container = noContentSection.querySelector('.container')
      expect(container).toBeInTheDocument()
    })
  })

  describe('404 Error Content', () => {
    it('displays the 404 error number prominently', () => {
      render(<Page404 />)
      
      // Check 404 number
      const errorNumber = screen.getByText('404')
      expect(errorNumber).toBeInTheDocument()
      expect(errorNumber.tagName).toBe('SPAN')
    })

    it('renders the main error heading', () => {
      render(<Page404 />)
      
      // Check main error heading
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent("Oops! That page can't be found")
    })

    it('displays the error description', () => {
      render(<Page404 />)
      
      // Check error description
      const description = screen.getByRole('heading', { level: 4 })
      expect(description).toHaveTextContent(
        'It looks like nothing was found at this location. Maybe the page you are looking for was removed, renamed or might never existed.'
      )
    })

    it('renders the error content wrapper with correct structure', () => {
      render(<Page404 />)
      
      const noContentWrap = document.querySelector('.no-content-wrap')
      expect(noContentWrap).toBeInTheDocument()
      
      // Check structure: span, h1, h4, div (search-form-wrap)
      const children = Array.from(noContentWrap.children)
      expect(children).toHaveLength(4) // span, h1, h4, search-form-wrap
      expect(children[0].tagName).toBe('SPAN') // 404 number
      expect(children[1].tagName).toBe('H1') // Error heading
      expect(children[2].tagName).toBe('H4') // Error description
      expect(children[3].tagName).toBe('DIV') // search-form-wrap
    })

    it('renders search form wrapper (even if commented out)', () => {
      render(<Page404 />)
      
      const searchFormWrap = document.querySelector('.search-form-wrap')
      expect(searchFormWrap).toBeInTheDocument()
    })
  })

  describe('Footer Section', () => {
    it('renders all footer widgets', () => {
      render(<Page404 />)
      
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

    it('renders footer menu and copyright', () => {
      render(<Page404 />)
      
      // Footer menu links
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
      expect(screen.getByText('Term & Condition')).toBeInTheDocument()
      expect(screen.getByText('FAQ')).toBeInTheDocument()
      
      // Footer logo
      const footerLogo = document.querySelector('.footer-logo img')
      expect(footerLogo).toBeInTheDocument()
      expect(footerLogo).toHaveAttribute('src', 'assets/images/travele-logo.png')
      
      // Copyright text
      expect(screen.getByText('Copyright © 2021 Travele. All rights reserveds')).toBeInTheDocument()
    })

    it('renders award images in About Travel section', () => {
      render(<Page404 />)
      
      const awardSection = document.querySelector('.award-img')
      expect(awardSection).toBeInTheDocument()
      
      const awardImages = awardSection.querySelectorAll('img')
      expect(awardImages).toHaveLength(2)
      expect(awardImages[0]).toHaveAttribute('src', 'assets/images/logo6.png')
      expect(awardImages[1]).toHaveAttribute('src', 'assets/images/logo2.png')
    })

    it('renders contact information with proper structure', () => {
      render(<Page404 />)
      
      const contactSection = screen.getByText('CONTACT INFORMATION').closest('.widget_text')
      const contactList = contactSection.querySelector('ul')
      expect(contactList).toBeInTheDocument()
      
      const contactItems = contactList.querySelectorAll('li')
      expect(contactItems).toHaveLength(3)
      
      // Check icons are present
      expect(contactSection.querySelector('.fa-phone-alt')).toBeInTheDocument()
      expect(contactSection.querySelector('.fa-envelope')).toBeInTheDocument()
      expect(contactSection.querySelector('.fa-map-marker-alt')).toBeInTheDocument()
    })
  })

  describe('Subscribe Form', () => {
    it('renders newsletter subscription form correctly', () => {
      render(<Page404 />)
      
      const subscribeSection = document.querySelector('.widget_newslatter')
      expect(subscribeSection).toBeInTheDocument()
      
      const subscribeForm = subscribeSection.querySelector('.newslatter-form')
      expect(subscribeForm).toBeInTheDocument()
      
      // Check form elements
      const emailInput = subscribeForm.querySelector('input[type="email"]')
      const submitButton = subscribeForm.querySelector('input[type="submit"]')
      
      expect(emailInput).toBeInTheDocument()
      expect(emailInput).toHaveAttribute('name', 's')
      expect(emailInput).toHaveAttribute('placeholder', 'Your Email..')
      
      expect(submitButton).toBeInTheDocument()
      expect(submitButton).toHaveAttribute('name', 's')
      expect(submitButton).toHaveAttribute('value', 'SUBSCRIBE NOW')
    })

    it('handles user input in newsletter form', async () => {
      const user = userEvent.setup()
      render(<Page404 />)
      
      const emailInput = screen.getByPlaceholderText('Your Email..')
      
      await user.type(emailInput, 'test@example.com')
      
      expect(emailInput).toHaveValue('test@example.com')
    })
  })

  describe('Back to Top Button', () => {
    it('renders back to top button with correct attributes', () => {
      render(<Page404 />)
      
      const backToTopButton = document.querySelector('#backTotop')
      expect(backToTopButton).toBeInTheDocument()
      expect(backToTopButton).toHaveAttribute('href', '#')
      expect(backToTopButton).toHaveClass('to-top-icon')
      
      // Check icon
      const icon = backToTopButton.querySelector('.fa-chevron-up')
      expect(icon).toBeInTheDocument()
    })

    it('back to top button is clickable', async () => {
      const user = userEvent.setup()
      render(<Page404 />)
      
      const backToTopButton = document.querySelector('#backTotop')
      
      // Should not throw error when clicked
      await user.click(backToTopButton)
      expect(backToTopButton).toBeInTheDocument()
    })
  })

  describe('Search Overlay', () => {
    it('renders search overlay with correct structure', () => {
      render(<Page404 />)
      
      const searchOverlay = document.querySelector('.header-search-form')
      expect(searchOverlay).toBeInTheDocument()
      
      const searchContainer = searchOverlay.querySelector('.header-search-container')
      expect(searchContainer).toBeInTheDocument()
      
      const searchForm = searchContainer.querySelector('.search-form')
      expect(searchForm).toBeInTheDocument()
      expect(searchForm).toHaveAttribute('role', 'search')
      expect(searchForm).toHaveAttribute('method', 'get')
    })

    it('renders search input and close button', () => {
      render(<Page404 />)
      
      // Search input
      const searchInput = screen.getByPlaceholderText('Enter your text...')
      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toHaveAttribute('type', 'text')
      expect(searchInput).toHaveAttribute('name', 's')
      
      // Close button
      const closeButton = document.querySelector('.search-close')
      expect(closeButton).toBeInTheDocument()
      expect(closeButton).toHaveAttribute('href', '#')
      
      const closeIcon = closeButton.querySelector('.fa-times')
      expect(closeIcon).toBeInTheDocument()
    })

    it('handles user input in search form', async () => {
      const user = userEvent.setup()
      render(<Page404 />)
      
      const searchInput = screen.getByPlaceholderText('Enter your text...')
      
      await user.type(searchInput, '404 error help')
      
      expect(searchInput).toHaveValue('404 error help')
    })

    it('search close button is clickable', async () => {
      const user = userEvent.setup()
      render(<Page404 />)
      
      const closeButton = document.querySelector('.search-close')
      
      // Should not throw error when clicked
      await user.click(closeButton)
      expect(closeButton).toBeInTheDocument()
    })
  })

  describe('CSS Classes and Styling', () => {
    it('applies correct CSS classes to main sections', () => {
      render(<Page404 />)
      
      // 404 section - test classes separately
      expect(document.querySelector('.no-content-section')).toBeInTheDocument()
      const section404 = document.querySelector('.no-content-section')
      expect(section404).toHaveClass('404-page')
      expect(document.querySelector('.no-content-wrap')).toBeInTheDocument()
      
      // Footer sections
      expect(document.querySelector('.site-footer')).toBeInTheDocument()
      expect(document.querySelector('.footer-primary')).toBeInTheDocument()
      expect(document.querySelector('.top-footer')).toBeInTheDocument()
      expect(document.querySelector('.buttom-footer')).toBeInTheDocument()
    })

    it('applies Bootstrap grid classes correctly', () => {
      render(<Page404 />)
      
      // Check container classes
      const containers = document.querySelectorAll('.container')
      expect(containers.length).toBeGreaterThan(0)
      
      // Check row classes
      const rows = document.querySelectorAll('.row')
      expect(rows.length).toBeGreaterThan(0)
      
      // Check column classes
      expect(document.querySelector('.col-lg-3')).toBeInTheDocument()
      expect(document.querySelector('.col-md-6')).toBeInTheDocument()
      expect(document.querySelector('.col-md-5')).toBeInTheDocument()
      expect(document.querySelector('.col-md-2')).toBeInTheDocument()
    })

    it('applies error page specific styling', () => {
      render(<Page404 />)
      
      // Check classes separately to avoid selector issues
      const errorSection = document.querySelector('.no-content-section')
      expect(errorSection).toBeInTheDocument()
      expect(errorSection).toHaveClass('404-page')
      
      // Check overlay element
      const overlay = document.querySelector('.overlay')
      expect(overlay).toBeInTheDocument()
    })
  })

  describe('Latest Post Section', () => {
    it('renders blog posts with metadata', () => {
      render(<Page404 />)
      
      const latestPostSection = screen.getByText('Latest Post').closest('.widget_recent_post')
      expect(latestPostSection).toBeInTheDocument()
      
      // Check post titles are links
      const post1Link = screen.getByText('Life is a beautiful journey not a destination')
      const post2Link = screen.getByText('Take only memories, leave only footprints')
      
      expect(post1Link.tagName).toBe('A')
      expect(post2Link.tagName).toBe('A')
      expect(post1Link).toHaveAttribute('href', '#')
      expect(post2Link).toHaveAttribute('href', '#')
      
      // Check post metadata
      const postDates = screen.getAllByText('August 17, 2021')
      expect(postDates).toHaveLength(2)
      
      const commentLinks = screen.getAllByText('No Comments')
      expect(commentLinks).toHaveLength(2)
      commentLinks.forEach(link => {
        expect(link.tagName).toBe('A')
        expect(link).toHaveAttribute('href', '#')
      })
    })

    it('renders post structure with proper HTML elements', () => {
      render(<Page404 />)
      
      const latestPostSection = screen.getByText('Latest Post').closest('.widget_recent_post')
      const postList = latestPostSection.querySelector('ul')
      expect(postList).toBeInTheDocument()
      
      const listItems = postList.querySelectorAll('li')
      expect(listItems).toHaveLength(2)
      
      // Each list item should have h5 and entry-meta
      listItems.forEach(item => {
        expect(item.querySelector('h5')).toBeInTheDocument()
        expect(item.querySelector('.entry-meta')).toBeInTheDocument()
        expect(item.querySelector('.post-on')).toBeInTheDocument()
        expect(item.querySelector('.comments-link')).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<Page404 />)
      
      // Main page title (h1)
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toHaveTextContent("Oops! That page can't be found")
      
      // Section titles (h3)
      const h3Elements = screen.getAllByRole('heading', { level: 3 })
      const h3Texts = h3Elements.map(h3 => h3.textContent)
      expect(h3Texts).toContain('About Travel')
      expect(h3Texts).toContain('CONTACT INFORMATION')
      expect(h3Texts).toContain('Latest Post')
      expect(h3Texts).toContain('SUBSCRIBE US')
      
      // Error description (h4)
      const h4 = screen.getByRole('heading', { level: 4 })
      expect(h4).toBeInTheDocument()
      
      // Blog post titles (h5)
      const h5Elements = screen.getAllByRole('heading', { level: 5 })
      expect(h5Elements).toHaveLength(2)
    })

    it('has proper form labels and attributes', () => {
      render(<Page404 />)
      
      // Newsletter form
      const emailInput = screen.getByPlaceholderText('Your Email..')
      expect(emailInput).toHaveAttribute('type', 'email')
      
      // Search form
      const searchForm = document.querySelector('.search-form')
      expect(searchForm).toHaveAttribute('role', 'search')
      
      const searchInput = screen.getByPlaceholderText('Enter your text...')
      expect(searchInput).toHaveAttribute('type', 'text')
    })

    it('has proper alt attributes for images', () => {
      render(<Page404 />)
      
      // Award images
      const awardImages = document.querySelectorAll('.award-img img')
      awardImages.forEach(img => {
        expect(img).toHaveAttribute('alt', '')
      })
      
      // Footer logo
      const footerLogo = document.querySelector('.footer-logo img')
      expect(footerLogo).toHaveAttribute('alt', '')
    })
  })

  describe('Error Page Specific Features', () => {
    it('displays error content with proper semantic structure', () => {
      render(<Page404 />)
      
      // Check that 404 content is within main content area
      const mainContent = screen.getByRole('main')
      const errorSection = mainContent.querySelector('.no-content-section')
      expect(errorSection).toBeInTheDocument()
      
      // Check proper nesting structure
      const noContentWrap = errorSection.querySelector('.no-content-wrap')
      expect(noContentWrap).toBeInTheDocument()
      
      // Check container structure
      const container = errorSection.querySelector('.container')
      expect(container).toBeInTheDocument()
      expect(container.contains(noContentWrap)).toBe(true)
    })

    it('maintains consistent styling with other pages', () => {
      render(<Page404 />)
      
      // Check that page maintains consistent footer structure
      const footer = screen.getByRole('contentinfo')
      expect(footer).toHaveClass('site-footer', 'footer-primary')
      
      // Check consistent container structure
      const topFooter = footer.querySelector('.top-footer')
      const bottomFooter = footer.querySelector('.buttom-footer')
      expect(topFooter).toBeInTheDocument()
      expect(bottomFooter).toBeInTheDocument()
    })
  })
})
