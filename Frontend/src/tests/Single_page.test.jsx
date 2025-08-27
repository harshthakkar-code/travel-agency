import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Single_page from '../Single-page'

// Mock Header component
vi.mock('../Header', () => ({
  default: () => <div data-testid="header-mock">Header Component</div>,
}))

describe('Single_page Component', () => {
  beforeEach(() => {
    // Mock console.error to avoid noise
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Component Structure', () => {
    it('renders the main page structure correctly', () => {
      render(<Single_page />)
      
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

    it('renders the inner banner section with correct styling', () => {
      render(<Single_page />)
      
      // Check banner container
      const bannerContainer = document.querySelector('.inner-baner-container')
      expect(bannerContainer).toBeInTheDocument()
      expect(bannerContainer).toHaveStyle('background-image: url(/assets/images/inner-banner.jpg)')
      
      // Check banner title
      expect(screen.getByText('Single page')).toBeInTheDocument()
      const bannerTitle = screen.getByText('Single page')
      expect(bannerTitle).toHaveClass('inner-title')
      expect(bannerTitle.tagName).toBe('H1')
      
      // Check banner shape
      const innerShape = document.querySelector('.inner-shape')
      expect(innerShape).toBeInTheDocument()
    })

    it('renders the single page content section', () => {
      render(<Single_page />)
      
      // Check single page section
      const singlePageSection = document.querySelector('.single-page-section')
      expect(singlePageSection).toBeInTheDocument()
      
      // Check container
      const container = singlePageSection.querySelector('.container')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Featured Image', () => {
    it('displays the feature image correctly', () => {
      render(<Single_page />)
      
      // Check feature image container
      const featureImageFigure = document.querySelector('.single-feature-img')
      expect(featureImageFigure).toBeInTheDocument()
      expect(featureImageFigure.tagName).toBe('FIGURE')
      
      // Check image
      const featureImage = featureImageFigure.querySelector('img')
      expect(featureImage).toBeInTheDocument()
      expect(featureImage).toHaveAttribute('src', '/assets/images/img31.jpg')
      expect(featureImage).toHaveAttribute('alt', '')
    })
  })

  describe('Page Content', () => {
   it('renders all paragraph content with correct structure', () => {
  render(<Single_page />)
  
  const pageContent = document.querySelector('.page-content')
  expect(pageContent).toBeInTheDocument()
  
  // Test structure: should have 3 paragraphs and 1 list
  const paragraphs = pageContent.querySelectorAll('p')
  const lists = pageContent.querySelectorAll('ul')
  
  expect(paragraphs).toHaveLength(3)
  expect(lists).toHaveLength(1)
  
  // Verify content exists by checking for unique phrases from each section
  expect(pageContent.textContent).toContain('Distinctio molestias!')
  expect(pageContent.textContent).toContain('Taciti euismod metpus!')
  expect(pageContent.textContent).toContain('vivamus diamlorem natpo.')
})




    it('renders the bulleted list with all items', () => {
      render(<Single_page />)
      
      // Check list container
      const pageContent = document.querySelector('.page-content')
      const list = pageContent.querySelector('ul')
      expect(list).toBeInTheDocument()
      
      // Check all list items
      const listItems = [
        'Purus sequi accusamus? Nibh aut perspiciatis, lorem lorem perspiciatis.',
        'Dictum? Posuere cumque sed illum facilisis leo illum facilisis.',
        'Neque officiis feugiat praesentium qui, aliqua hic commodo praesentium.',
        'Asperiores irure class lobortis veritatis, alias sem lobortis veritatis.',
        'Ipsum eros quaerat deserunt proin porttitor, fugit ultrices.',
        'Volutpat, justo mollit ullamco sagittis duis enim labore, ullamcorper dicta'
      ]
      
      listItems.forEach(itemText => {
        expect(screen.getByText(itemText)).toBeInTheDocument()
      })
      
      // Check that we have exactly 6 list items
      const liElements = list.querySelectorAll('li')
      expect(liElements).toHaveLength(6)
    })

    it('displays content in the correct order', () => {
      render(<Single_page />)
      
      const pageContent = document.querySelector('.page-content')
      const children = Array.from(pageContent.children)
      
      // Verify structure: p, p, ul, p
      expect(children).toHaveLength(4)
      expect(children[0].tagName).toBe('P') // First paragraph
      expect(children[1].tagName).toBe('P') // Second paragraph
      expect(children[2].tagName).toBe('UL') // List
      expect(children[3].tagName).toBe('P') // Third paragraph
    })
  })

  describe('Footer Section', () => {
    it('renders all footer widgets', () => {
      render(<Single_page />)
      
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
      render(<Single_page />)
      
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

    it('renders award images in About Travel section', () => {
      render(<Single_page />)
      
      const awardSection = document.querySelector('.award-img')
      expect(awardSection).toBeInTheDocument()
      
      const awardImages = awardSection.querySelectorAll('img')
      expect(awardImages).toHaveLength(2)
      expect(awardImages[0]).toHaveAttribute('src', '/assets/images/logo6.png')
      expect(awardImages[1]).toHaveAttribute('src', '/assets/images/logo2.png')
    })

    it('renders contact information with proper structure', () => {
      render(<Single_page />)
      
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
      render(<Single_page />)
      
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
      render(<Single_page />)
      
      const emailInput = screen.getByPlaceholderText('Your Email..')
      
      await user.type(emailInput, 'test@example.com')
      
      expect(emailInput).toHaveValue('test@example.com')
    })
  })

  describe('Back to Top Button', () => {
    it('renders back to top button with correct attributes', () => {
      render(<Single_page />)
      
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
      render(<Single_page />)
      
      const backToTopButton = document.querySelector('#backTotop')
      
      // Should not throw error when clicked
      await user.click(backToTopButton)
      expect(backToTopButton).toBeInTheDocument()
    })
  })

  describe('Search Overlay', () => {
    it('renders search overlay with correct structure', () => {
      render(<Single_page />)
      
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
      render(<Single_page />)
      
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
      render(<Single_page />)
      
      const searchInput = screen.getByPlaceholderText('Enter your text...')
      
      await user.type(searchInput, 'travel destination')
      
      expect(searchInput).toHaveValue('travel destination')
    })

    it('search close button is clickable', async () => {
      const user = userEvent.setup()
      render(<Single_page />)
      
      const closeButton = document.querySelector('.search-close')
      
      // Should not throw error when clicked
      await user.click(closeButton)
      expect(closeButton).toBeInTheDocument()
    })
  })

  describe('CSS Classes and Styling', () => {
    it('applies correct CSS classes to main sections', () => {
      render(<Single_page />)
      
      // Banner section
      expect(document.querySelector('.inner-banner-wrap')).toBeInTheDocument()
      expect(document.querySelector('.inner-banner-content')).toBeInTheDocument()
      
      // Single page section
      expect(document.querySelector('.single-page-section')).toBeInTheDocument()
      
      // Footer sections
      expect(document.querySelector('.site-footer')).toBeInTheDocument()
      expect(document.querySelector('.footer-primary')).toBeInTheDocument()
      expect(document.querySelector('.top-footer')).toBeInTheDocument()
      expect(document.querySelector('.buttom-footer')).toBeInTheDocument()
    })

    it('applies Bootstrap grid classes correctly', () => {
      render(<Single_page />)
      
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
  })

  describe('Latest Post Section', () => {
    it('renders blog posts with metadata', () => {
      render(<Single_page />)
      
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
      render(<Single_page />)
      
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
      render(<Single_page />)
      
      // Main page title (h1)
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toHaveTextContent('Single page')
      
      // Section titles (h3)
      const h3Elements = screen.getAllByRole('heading', { level: 3 })
      const h3Texts = h3Elements.map(h3 => h3.textContent)
      expect(h3Texts).toContain('About Travel')
      expect(h3Texts).toContain('CONTACT INFORMATION')
      expect(h3Texts).toContain('Latest Post')
      expect(h3Texts).toContain('SUBSCRIBE US')
      
      // Blog post titles (h5)
      const h5Elements = screen.getAllByRole('heading', { level: 5 })
      expect(h5Elements).toHaveLength(2)
    })

    it('has proper form labels and attributes', () => {
      render(<Single_page />)
      
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
      render(<Single_page />)
      
      // Feature image
      const featureImg = document.querySelector('.single-feature-img img')
      expect(featureImg).toHaveAttribute('alt', '')
      
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
})
