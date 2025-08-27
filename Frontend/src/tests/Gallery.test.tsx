import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import Gallery from '../Gallery'

// Mock Header component
vi.mock('../Header', () => ({
  default: () => <div data-testid="header-mock">Header Component</div>,
}))

describe('Gallery Component', () => {
  const renderGallery = () => render(<Gallery />)

  const expectedGalleryItems = [
    { img: "gallery-1.jpg", title: "Santorini Island" },
    { img: "gallery-2.jpg", title: "Malaysia Beach" },
    { img: "gallery-3.jpg", title: "Tibet Mountain" },
    { img: "gallery-5.jpg", title: "Burj Khalifa (Dubai)" },
    { img: "gallery-4.jpg", title: "Arizona Desert" },
    { img: "gallery-6.jpg", title: "Oxolotan Island" },
    { img: "gallery-7.jpg", title: "Narita Airport" },
    { img: "gallery-8.jpg", title: "Thailand Temple" },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Structure and Layout', () => {
    it('renders header and main content structure', () => {
      renderGallery()
      expect(screen.getByTestId('header-mock')).toBeInTheDocument()
      expect(document.querySelector('main#content.site-main')).toBeInTheDocument()
    })

    it('renders inner banner with correct styling and title', () => {
      renderGallery()
      
      // Check banner container and background
      const banner = document.querySelector('.inner-baner-container') as HTMLElement
      expect(banner).toBeInTheDocument()
      expect(banner.style.backgroundImage).toContain('assets/images/inner-banner.jpg')
      
      // Check title
      expect(screen.getByRole('heading', { name: /Gallery/i, level: 1 })).toBeInTheDocument()
      expect(document.querySelector('.inner-shape')).toBeInTheDocument()
    })

    it('renders gallery section containers', () => {
      renderGallery()
      expect(document.querySelector('.gallery-section')).toBeInTheDocument()
      expect(document.querySelector('.gallery-outer-wrap')).toBeInTheDocument()
      expect(document.querySelector('.gallery-inner-wrap')).toBeInTheDocument()
      expect(document.querySelector('.gallery-container')).toBeInTheDocument()
      expect(document.querySelector('.grid')).toBeInTheDocument()
    })

    it('has correct masonry grid styling', () => {
      renderGallery()
      const gridContainer = document.querySelector('.gallery-inner-wrap') as HTMLElement
      expect(gridContainer).toBeInTheDocument()
      expect(gridContainer.style.columnCount).toBe('1')
      expect(gridContainer.style.columnGap).toBe('20px')
    })
  })

  describe('Gallery Items', () => {
    it('renders correct number of gallery items', () => {
      renderGallery()
      const galleryItems = document.querySelectorAll('.single-gallery')
      expect(galleryItems).toHaveLength(8)
    })

    it('renders all gallery images with correct sources and alt text', () => {
      renderGallery()
      
      expectedGalleryItems.forEach((item) => {
        const img = screen.getByAltText(item.title) as HTMLImageElement
        expect(img).toBeInTheDocument()
        expect(img.src).toContain(`assets/images/${item.img}`)
      })
    })

    it('renders all gallery titles with lightbox links', () => {
      renderGallery()
      
      expectedGalleryItems.forEach((item) => {
        // Check title appears as text
        expect(screen.getByText(item.title)).toBeInTheDocument()
        
        // Check lightbox link
        const titleLink = screen.getByRole('link', { name: item.title })
        expect(titleLink).toBeInTheDocument()
        expect(titleLink).toHaveAttribute('href', `assets/images/${item.img}`)
        expect(titleLink).toHaveAttribute('data-lightbox', 'lightbox-set')
      })
    })

    it('has proper gallery item structure', () => {
      renderGallery()
      const galleryItems = document.querySelectorAll('.single-gallery')
      
      galleryItems.forEach((item) => {
        // Check grid item class
        expect(item).toHaveClass('single-gallery', 'grid-item')
        
        // Check figure element
        const figure = item.querySelector('figure.gallery-img')
        expect(figure).toBeInTheDocument()
        
        // Check figure styling
        const figureElement = figure as HTMLElement
        expect(figureElement.style.margin).toBe('0px')
        expect(figureElement.style.position).toBe('relative')
        
        // Check gallery title container
        const titleContainer = item.querySelector('.gallery-title')
        expect(titleContainer).toBeInTheDocument()
        
        // Check h3 title
        const h3Title = titleContainer?.querySelector('h3')
        expect(h3Title).toBeInTheDocument()
      })
    })

    it('renders specific gallery items with correct details', () => {
      renderGallery()
      
      // Test specific items
      expect(screen.getByAltText('Santorini Island')).toBeInTheDocument()
      expect(screen.getByAltText('Burj Khalifa (Dubai)')).toBeInTheDocument()
      expect(screen.getByAltText('Thailand Temple')).toBeInTheDocument()
      
      // Test specific links
      const santoriniLink = screen.getByRole('link', { name: 'Santorini Island' })
      expect(santoriniLink).toHaveAttribute('href', 'assets/images/gallery-1.jpg')
      
      const dubaiLink = screen.getByRole('link', { name: 'Burj Khalifa (Dubai)' })
      expect(dubaiLink).toHaveAttribute('href', 'assets/images/gallery-5.jpg')
    })
  })

  describe('Callback Section', () => {
    it('renders callback section with correct structure', () => {
      renderGallery()
      expect(document.querySelector('.bg-color-callback')).toBeInTheDocument()
      expect(document.querySelector('.callback-content')).toBeInTheDocument()
      expect(document.querySelector('.button-wrap')).toBeInTheDocument()
    })

    it('renders callback heading and content', () => {
      renderGallery()
      expect(screen.getByText("LET'S JOIN US FOR MORE UPDATE & INFO !!")).toBeInTheDocument()
    })

    it('renders learn more button', () => {
      renderGallery()
      const learnMoreButton = screen.getByRole('link', { name: 'LEARN MORE' })
      expect(learnMoreButton).toBeInTheDocument()
      expect(learnMoreButton).toHaveClass('button-primary')
      expect(learnMoreButton).toHaveAttribute('href', '#')
    })

    it('has proper responsive grid structure', () => {
      renderGallery()
      expect(document.querySelector('.row.align-items-center.justify-content-between')).toBeInTheDocument()
      expect(document.querySelector('.col-lg-9.col-md-8')).toBeInTheDocument()
      expect(document.querySelector('.col-lg-3.col-md-4')).toBeInTheDocument()
    })
  })

  describe('Footer Section', () => {
    it('renders footer structure and main sections', () => {
      renderGallery()
      const footer = document.getElementById('colophon')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass('site-footer', 'footer-primary')
      
      // Main footer sections
      expect(screen.getByText('About Travel')).toBeInTheDocument()
      expect(screen.getByText('CONTACT INFORMATION')).toBeInTheDocument()
      expect(screen.getByText('Latest Post')).toBeInTheDocument()
      expect(screen.getByText('SUBSCRIBE US')).toBeInTheDocument()
    })

    it('renders footer widgets with unique content', () => {
      renderGallery()
      
      // About Travel content using scoped query
      const aboutWidget = document.querySelector('.widget.widget_text')
      const aboutText = within(aboutWidget as HTMLElement).getByText(/Lorem ipsum dolor sit amet.*pulvinar dapibus leo/i)
      expect(aboutText).toBeInTheDocument()
      
      // Contact information
      expect(screen.getByText('+01 (977) 2599 12')).toBeInTheDocument()
      expect(screen.getByText(/3146 Koontz,\s*California/i)).toBeInTheDocument()
      
      // Latest posts
      expect(screen.getByText('Life is a beautiful journey not a destination')).toBeInTheDocument()
      expect(screen.getByText('Take only memories, leave only footprints')).toBeInTheDocument()
      expect(screen.getAllByText('August 17, 2021')).toHaveLength(2)
      expect(screen.getAllByText('No Comments')).toHaveLength(2)
      
      // Subscribe form
      expect(screen.getByPlaceholderText('Your Email..')).toBeInTheDocument()
      expect(screen.getByDisplayValue('SUBSCRIBE NOW')).toBeInTheDocument()
    })

    it('renders footer menu and copyright', () => {
      renderGallery()
      
      // Footer menu links
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
      expect(screen.getByText('Term & Condition')).toBeInTheDocument()
      expect(screen.getByText('FAQ')).toBeInTheDocument()
      
      // Footer logo
      const footerLogo = document.querySelector('.footer-logo img') as HTMLImageElement
      expect(footerLogo).toBeInTheDocument()
      expect(footerLogo.src).toContain('/assets/images/travele-logo.png')
      
      // Copyright
      expect(screen.getByText(/Copyright © 2021 Travele\. All rights reserveds/)).toBeInTheDocument()
    })

    it('renders award images in about section', () => {
      renderGallery()
      const awardImages = document.querySelectorAll('.award-img img')
      expect(awardImages).toHaveLength(2)
      
      const firstAwardImg = awardImages[0] as HTMLImageElement
      const secondAwardImg = awardImages[1] as HTMLImageElement
      
      expect(firstAwardImg.src).toContain('/assets/images/logo6.png')
      expect(secondAwardImg.src).toContain('/assets/images/logo2.png')
    })

    it('renders newsletter form with proper structure', () => {
      renderGallery()
      const newsletterForm = document.querySelector('.newslatter-form')
      expect(newsletterForm).toBeInTheDocument()
      
      const emailInput = screen.getByPlaceholderText('Your Email..') as HTMLInputElement
      expect(emailInput.type).toBe('email')
      expect(emailInput.name).toBe('s')
      
      const submitButton = screen.getByDisplayValue('SUBSCRIBE NOW') as HTMLInputElement
      expect(submitButton.type).toBe('submit')
      expect(submitButton.name).toBe('s')
    })
  })

  describe('Accessibility and Semantics', () => {
    it('has proper heading hierarchy', () => {
      renderGallery()
      
      // Main page title (H1)
      expect(screen.getByRole('heading', { name: /Gallery/i, level: 1 })).toBeInTheDocument()
      
      // Callback section (H2)
      expect(screen.getByRole('heading', { name: /LET'S JOIN US FOR MORE UPDATE & INFO !!/i, level: 2 })).toBeInTheDocument()
      
      // Footer headings (H3)
      const h3Elements = screen.getAllByRole('heading', { level: 3 })
      expect(h3Elements.length).toBeGreaterThan(3) // Gallery titles + footer titles
      
      // Footer post titles (H5)
      const h5Elements = screen.getAllByRole('heading', { level: 5 })
      expect(h5Elements.length).toBe(2) // Two blog post titles
    })

    it('has proper image alt attributes', () => {
      renderGallery()
      const images = document.querySelectorAll('.gallery-img img')
      
      images.forEach((img) => {
        const imgElement = img as HTMLImageElement
        expect(imgElement).toHaveAttribute('alt')
        expect(imgElement.alt).not.toBe('')
      })
    })

    it('has proper link attributes for lightbox functionality', () => {
      renderGallery()
      const lightboxLinks = document.querySelectorAll('[data-lightbox="lightbox-set"]')
      expect(lightboxLinks).toHaveLength(8)
      
      lightboxLinks.forEach((link) => {
        expect(link).toHaveAttribute('href')
        expect(link.getAttribute('href')).toMatch(/^assets\/images\/gallery-\d+\.jpg$/)
      })
    })

    it('has proper semantic structure for gallery items', () => {
      renderGallery()
      const figures = document.querySelectorAll('figure.gallery-img')
      expect(figures).toHaveLength(8)
      
      figures.forEach((figure) => {
        // Each figure should contain an image
        const img = figure.querySelector('img')
        expect(img).toBeInTheDocument()
        
        // Each figure should have a title container
        const titleContainer = figure.querySelector('.gallery-title')
        expect(titleContainer).toBeInTheDocument()
      })
    })
  })

  describe('Grid Layout and Responsive Structure', () => {
    it('has correct Bootstrap grid classes', () => {
      renderGallery()
      
      // Main containers
      expect(document.querySelector('.container')).toBeInTheDocument()
      expect(document.querySelector('.row')).toBeInTheDocument()
      
      // Callback section grid
      expect(document.querySelector('.col-lg-9.col-md-8')).toBeInTheDocument()
      expect(document.querySelector('.col-lg-3.col-md-4')).toBeInTheDocument()
      
      // Footer grid
      expect(document.querySelectorAll('.col-lg-3.col-md-6')).toHaveLength(4)
      expect(document.querySelector('.col-md-5')).toBeInTheDocument()
      expect(document.querySelector('.col-md-2.text-center')).toBeInTheDocument()
    })

    it('renders masonry grid with proper CSS styling', () => {
      renderGallery()
      const masonryContainer = document.querySelector('.gallery-inner-wrap.gallery-container.grid') as HTMLElement
      
      expect(masonryContainer).toBeInTheDocument()
      expect(masonryContainer.style.columnCount).toBe('1')
      expect(masonryContainer.style.columnGap).toBe('20px')
    })

    it('has proper section containers', () => {
      renderGallery()
      expect(document.querySelector('.gallery-section')).toBeInTheDocument()
      expect(document.querySelector('.bg-color-callback')).toBeInTheDocument()
      expect(document.querySelector('.top-footer')).toBeInTheDocument()
      expect(document.querySelector('.buttom-footer')).toBeInTheDocument()
    })
  })

  describe('Content Validation', () => {
    it('renders all expected gallery destinations', () => {
      renderGallery()
      const expectedTitles = [
        'Santorini Island',
        'Malaysia Beach', 
        'Tibet Mountain',
        'Burj Khalifa (Dubai)',
        'Arizona Desert',
        'Oxolotan Island',
        'Narita Airport',
        'Thailand Temple'
      ]
      
      expectedTitles.forEach(title => {
        expect(screen.getByText(title)).toBeInTheDocument()
      })
    })

    it('has consistent image naming pattern', () => {
      renderGallery()
      const images = document.querySelectorAll('.gallery-img img')
      
      images.forEach((img) => {
        const imgElement = img as HTMLImageElement
        expect(imgElement.src).toMatch(/assets\/images\/gallery-\d+\.jpg/)
      })
    })

    it('renders proper styling classes for visual elements', () => {
      renderGallery()
      
      // Gallery specific classes
      expect(document.querySelector('.gallery-section')).toBeInTheDocument()
      expect(document.querySelector('.gallery-outer-wrap')).toBeInTheDocument()
      expect(document.querySelector('.single-gallery.grid-item')).toBeInTheDocument()
      expect(document.querySelector('.gallery-title')).toBeInTheDocument()
      
      // Callback section classes
      expect(document.querySelector('.bg-color-callback')).toBeInTheDocument()
      expect(document.querySelector('.callback-content')).toBeInTheDocument()
      expect(document.querySelector('.button-primary')).toBeInTheDocument()
      
      // Footer classes
      expect(document.querySelector('.widget.widget_text')).toBeInTheDocument()
      expect(document.querySelector('.textwidget.widget-text')).toBeInTheDocument()
      expect(document.querySelector('.newslatter-form')).toBeInTheDocument()
    })
  })

  describe('Interactive Elements', () => {
    it('renders lightbox links for each gallery item', () => {
      renderGallery()
      const lightboxLinks = document.querySelectorAll('[data-lightbox]')
      expect(lightboxLinks).toHaveLength(8)
      
      // Check specific lightbox attributes
      lightboxLinks.forEach(link => {
        expect(link).toHaveAttribute('data-lightbox', 'lightbox-set')
        expect(link).toHaveAttribute('href')
      })
    })

    it('renders callback section call-to-action', () => {
      renderGallery()
      const ctaButton = screen.getByRole('link', { name: 'LEARN MORE' })
      expect(ctaButton).toBeInTheDocument()
      expect(ctaButton).toHaveClass('button-primary')
    })

    it('renders footer links', () => {
      renderGallery()
      
      // Social/info links
      const footerLinks = document.querySelectorAll('footer a')
      expect(footerLinks.length).toBeGreaterThan(5)
      
      // Newsletter form
      const newsletterForm = document.querySelector('.newslatter-form')
      expect(newsletterForm).toBeInTheDocument()
    })
  })
})
