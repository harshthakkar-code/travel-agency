import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Contact from '../Contact'

// Mock Header to isolate Contact rendering
vi.mock('../Header', () => ({
  default: () => <div data-testid="header-mock">Header Component</div>,
}))

describe('Contact Component', () => {
  const renderContact = () => render(<Contact />)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Structure', () => {
    it('renders header and main content', () => {
      renderContact()
      expect(screen.getByTestId('header-mock')).toBeInTheDocument()
      expect(document.querySelector('main.site-main')).toBeInTheDocument()
    })

    it('renders inner banner with title and shape', () => {
      renderContact()
      const banner = document.querySelector('.inner-baner-container') as HTMLElement
      expect(banner).toBeInTheDocument()
      expect(banner.style.backgroundImage).toContain('assets/images/inner-banner.jpg')
      expect(screen.getByRole('heading', { name: /Contact us/i, level: 1 })).toBeInTheDocument()
      expect(document.querySelector('.inner-shape')).toBeInTheDocument()
    })
  })

  describe('Contact form', () => {
    it('renders section heading and description', () => {
      renderContact()
      expect(screen.getByText('GET IN TOUCH')).toBeInTheDocument()
      expect(screen.getByText('CONTACT US TO GET MORE INFO')).toBeInTheDocument()
      expect(
        screen.getByText(/Aperiam sociosqu urna praesent/i)
      ).toBeInTheDocument()
    })

    it('renders form fields and submit', () => {
      renderContact()
      // Inputs exist with placeholders
      expect(screen.getByPlaceholderText('Your Name*')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Your Email*')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Your Message*')).toBeInTheDocument()
      // Submit button
      expect(screen.getByDisplayValue('SUBMIT MESSAGE')).toBeInTheDocument()
      // Form container
      expect(document.querySelector('form.contact-from')).toBeInTheDocument()
    })
  })

  describe('Contact details', () => {
    it('renders details heading and paragraphs', () => {
      renderContact()
      expect(
        screen.getByRole('heading', { name: /Need help \?\? Feel free to contact us !/i, level: 3 })
      ).toBeInTheDocument()
      // Two descriptive paragraphs
      const paragraphs = document.querySelectorAll('.contact-detail-wrap p')
      expect(paragraphs.length).toBeGreaterThanOrEqual(2)
    })

    it('renders location, email and phone items', () => {
      renderContact()
      // Location
      expect(screen.getByRole('heading', { name: 'Location Address', level: 4 })).toBeInTheDocument()
      expect(
        screen.getByText('411 D Avenue, San Francisco, CS 91950')
      ).toBeInTheDocument()

      // Email label and anchor exists
      expect(screen.getByRole('heading', { name: 'Email Address', level: 4 })).toBeInTheDocument()
      const emailItem = document.querySelector('.fas.fa-envelope-open-text')
      expect(emailItem).toBeInTheDocument()
      const emailLink = document.querySelector('.details-content a') as HTMLAnchorElement
      expect(emailLink).toBeInTheDocument()

      // Phone
      expect(screen.getByRole('heading', { name: 'Phone Number', level: 4 })).toBeInTheDocument()
      expect(
        screen.getByText(/Telephone:\s*619-270-8578\s*\/\s*Mobile:\s*\+\(911\)\s*1987\s*123\s*88/i)
      ).toBeInTheDocument()
    })
  })

  describe('Social links', () => {
    it('renders social section with icons', () => {
      renderContact()
      expect(screen.getByRole('heading', { name: /Follow us on social media../i, level: 3 })).toBeInTheDocument()
      const icons = [
        '.fab.fa-facebook-f',
        '.fab.fa-twitter',
        '.fab.fa-instagram',
        '.fab.fa-linkedin',
      ]
      icons.forEach(sel => {
        expect(document.querySelector(sel)).toBeInTheDocument()
      })
      // Four <li> entries
      const socialLis = document.querySelectorAll('.contct-social ul li')
      expect(socialLis.length).toBe(4)
    })
  })

  describe('Map embed', () => {
    it('renders Google Maps iframe with attributes', () => {
      renderContact()
      const iframe = screen.getByTitle('map') as HTMLIFrameElement
      expect(iframe).toBeInTheDocument()
      expect(iframe).toHaveAttribute('src')
      expect(iframe.getAttribute('src')).toMatch(/^https:\/\/www\.google\.com\/maps\/embed\?pb=/)
      expect(iframe).toHaveAttribute('height', '400')
      expect(iframe).toHaveAttribute('loading', 'lazy')
      // allowFullScreen boolean attribute renders as allowfullscreen in DOM; presence is enough
      expect(iframe.outerHTML.toLowerCase()).toContain('allowfullscreen')
    })
  })

  describe('Footer', () => {
    it('renders footer and sections', () => {
      renderContact()
      const footer = document.getElementById('colophon')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass('site-footer', 'footer-primary')

      // About Travel
      expect(screen.getByText('About Travel')).toBeInTheDocument()
      
      // Contact Information
      expect(screen.getByText('CONTACT INFORMATION')).toBeInTheDocument()
      expect(screen.getByText('+01 (977) 2599 12')).toBeInTheDocument()
      expect(screen.getByText(/3146 Koontz,\s*California/i)).toBeInTheDocument()

      // Latest Post
      expect(screen.getByText('Latest Post')).toBeInTheDocument()
      expect(
        screen.getByText('Life is a beautiful journey not a destination')
      ).toBeInTheDocument()
      expect(
        screen.getByText('Take only memories, leave only footprints')
      ).toBeInTheDocument()

      // Subscribe
      expect(screen.getByText('SUBSCRIBE US')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Your Email..')).toBeInTheDocument()
      expect(screen.getByDisplayValue('SUBSCRIBE NOW')).toBeInTheDocument()

      // Footer menu links
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
      expect(screen.getByText('Term & Condition')).toBeInTheDocument()
      expect(screen.getByText('FAQ')).toBeInTheDocument()

      // Footer logo and copyright
      const logoImg = document.querySelector('.footer-logo img') as HTMLImageElement
      expect(logoImg).toBeInTheDocument()
      expect(logoImg.src).toContain('/assets/images/travele-logo.png')
      expect(
        screen.getByText(/Copyright © 2021 Travele\. All rights reserveds/)
      ).toBeInTheDocument()
    })
  })

  describe('ARIA and semantics', () => {
    it('has proper headings structure in key areas', () => {
      renderContact()
      // H1 for page title
      expect(screen.getByRole('heading', { name: /Contact us/i, level: 1 })).toBeInTheDocument()
      // H2 in form section
      expect(screen.getByRole('heading', { name: /CONTACT US TO GET MORE INFO/i, level: 2 })).toBeInTheDocument()
    })
  })
})
