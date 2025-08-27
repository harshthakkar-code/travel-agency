import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import Faq from '../Faq'

// Mock Header component
vi.mock('../Header', () => ({
  default: () => <div data-testid="header-mock">Header Component</div>,
}))

describe('FAQ Component', () => {
  const renderFaq = () => render(<Faq />)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Structure and Layout', () => {
    it('renders header and main content structure', () => {
      renderFaq()
      expect(screen.getByTestId('header-mock')).toBeInTheDocument()
      expect(document.querySelector('main#content.site-main')).toBeInTheDocument()
    })

    it('renders inner banner with correct styling and title', () => {
      renderFaq()
      
      // Check banner container and background
      const banner = document.querySelector('.inner-baner-container') as HTMLElement
      expect(banner).toBeInTheDocument()
      expect(banner.style.backgroundImage).toContain('assets/images/inner-banner.jpg')
      
      // Check title
      expect(screen.getByRole('heading', { name: /Faq/i, level: 1 })).toBeInTheDocument()
      expect(document.querySelector('.inner-shape')).toBeInTheDocument()
    })

    it('renders main FAQ page sections', () => {
      renderFaq()
      expect(document.querySelector('.faq-page-section')).toBeInTheDocument()
      expect(document.querySelector('.faq-page-container')).toBeInTheDocument()
      
      // Check Bootstrap grid structure
      expect(document.querySelector('.container')).toBeInTheDocument()
      expect(document.querySelector('.row')).toBeInTheDocument()
      expect(document.querySelector('.col-lg-6')).toBeInTheDocument()
    })
  })

  describe('FAQ Content Section - Left Side', () => {
    it('renders section heading and description', () => {
      renderFaq()
      expect(screen.getByText('ANY QUESTIONS')).toBeInTheDocument()
      expect(screen.getByText('FREQUENTLY ASKED QUESTIONS')).toBeInTheDocument()
      expect(screen.getByText(/Aperiam sociosqu urna praesent/i)).toBeInTheDocument()
    })

    it('renders first accordion with correct structure', () => {
      renderFaq()
      const accordion = document.querySelector('#accordionOne')
      expect(accordion).toBeInTheDocument()
      expect(accordion).toHaveClass('accordion')
      
      // Check all cards in first accordion
      const cards = accordion?.querySelectorAll('.card')
      expect(cards?.length).toBe(4)
    })

    it('renders all FAQ questions in first accordion', () => {
      renderFaq()
      const faqQuestions = [
        'HOW WE BECAME BEST AMONG OTHERS?',
        'WHAT WE OFFER TO YOU?',
        'HOW WE PROVIDE SERVICES FOR YOU?',
        'ARE WE AFFORDABLE TO HIRE?'
      ]

      faqQuestions.forEach(question => {
        expect(screen.getByText(question)).toBeInTheDocument()
      })
    })

    it('has proper accordion button attributes', () => {
      renderFaq()
      const firstButton = screen.getByText('HOW WE BECAME BEST AMONG OTHERS?')
      const buttonElement = firstButton.closest('button')
      
      expect(buttonElement).toHaveAttribute('type', 'button')
      expect(buttonElement).toHaveAttribute('data-toggle', 'collapse')
      expect(buttonElement).toHaveAttribute('data-target', '#collapseOne')
      expect(buttonElement).toHaveAttribute('aria-expanded', 'true')
      expect(buttonElement).toHaveAttribute('aria-controls', 'collapseOne')
    })

    it('renders collapse content areas', () => {
      renderFaq()
      const collapseIds = ['collapseOne', 'collapseTwo', 'collapseThree', 'collapseFour']
      
      collapseIds.forEach(id => {
        const collapseElement = document.querySelector(`#${id}`)
        expect(collapseElement).toBeInTheDocument()
        expect(collapseElement).toHaveClass('collapse')
        
        const cardBody = collapseElement?.querySelector('.card-body')
        expect(cardBody).toBeInTheDocument()
      })
    })
  })

  describe('Question Form Section - Right Side', () => {
    it('renders question form heading and description', () => {
      renderFaq()
      expect(screen.getByText('STILL HAVE A QUESTION?')).toBeInTheDocument()
      expect(screen.getByText(/Lorem ipsum dolor sit amet.*ullam corper/i)).toBeInTheDocument()
    })

    it('renders all form fields with correct types and placeholders', () => {
      renderFaq()
      
      // Name field
      const nameInput = screen.getByPlaceholderText('Your Name*') as HTMLInputElement
      expect(nameInput).toBeInTheDocument()
      expect(nameInput.type).toBe('text')
      expect(nameInput.name).toBe('name')
      
      // Email field
      const emailInput = screen.getByPlaceholderText('Your Email*') as HTMLInputElement
      expect(emailInput).toBeInTheDocument()
      expect(emailInput.type).toBe('email')
      expect(emailInput.name).toBe('email')
      
      // Number field
      const numberInput = screen.getByPlaceholderText('Your Number*') as HTMLInputElement
      expect(numberInput).toBeInTheDocument()
      expect(numberInput.type).toBe('number')
      expect(numberInput.name).toBe('number')
      
      // Message textarea
      const messageTextarea = screen.getByPlaceholderText('Enter your message') as HTMLTextAreaElement
      expect(messageTextarea).toBeInTheDocument()
      expect(messageTextarea.tagName.toLowerCase()).toBe('textarea')
      expect(messageTextarea.rows).toBe(8)
      
      // Submit button
      const submitButton = screen.getByDisplayValue('SUBMIT QUESTIONS') as HTMLInputElement
      expect(submitButton).toBeInTheDocument()
      expect(submitButton.type).toBe('submit')
      expect(submitButton.name).toBe('submit')
    })

    it('renders form container structure', () => {
      renderFaq()
      expect(document.querySelector('.qsn-form-container')).toBeInTheDocument()
      
      const form = document.querySelector('.qsn-form-container form')
      expect(form).toBeInTheDocument()
      
      // Check form paragraphs structure
      const formParagraphs = form?.querySelectorAll('p')
      expect(formParagraphs?.length).toBe(5) // 4 inputs + 1 submit
    })
  })

  describe('Testimonial Section', () => {
    it('renders testimonial image and content', () => {
      renderFaq()
      
      // Testimonial container
      expect(document.querySelector('.faq-testimonial')).toBeInTheDocument()
      
      // Image
      const testimonialImage = document.querySelector('.faq-image img') as HTMLImageElement
      expect(testimonialImage).toBeInTheDocument()
      expect(testimonialImage.src).toContain('assets/images/img37.jpg')
      
      // Quote icon
      expect(document.querySelector('.fas.fa-quote-left')).toBeInTheDocument()
      
      // Testimonial text
      expect(screen.getByText(/"Lorem ipsum dolor sit amet.*pulvinar dapibus leo\."/i)).toBeInTheDocument()
    })

    it('has proper testimonial structure', () => {
      renderFaq()
      expect(document.querySelector('figure.faq-image')).toBeInTheDocument()
      expect(document.querySelector('.testimonial-content')).toBeInTheDocument()
      expect(document.querySelector('.quote-icon')).toBeInTheDocument()
    })
  })

  describe('Second Accordion Section', () => {
    it('renders second section heading', () => {
      renderFaq()
      expect(screen.getByText('QUESTIONS/ANSWERS')).toBeInTheDocument()
      expect(screen.getByText('BENEFITS & WHAT WE DO?')).toBeInTheDocument()
    })

    it('renders second accordion with unique IDs', () => {
      renderFaq()
      const secondAccordion = document.querySelector('#accordionTwo')
      expect(secondAccordion).toBeInTheDocument()
      expect(secondAccordion).toHaveClass('accordion')
      
      // Check cards in second accordion
      const cards = secondAccordion?.querySelectorAll('.card')
      expect(cards?.length).toBe(4)
    })

    it('renders all questions in second accordion', () => {
      renderFaq()
      const secondFaqQuestions = [
        'HOW DO YOU MANAGE TO TRAVEL THE WORLD?',
        'HOW DID YOU MANAGE YOUR CLIENTS?',
        'HOW TO TRAVEL WITH YOUR TIPS?',
        'WHAT LOW BUDGET DESTINATIONS DO YOU RECOMMEND?'
      ]

      secondFaqQuestions.forEach(question => {
        expect(screen.getByText(question)).toBeInTheDocument()
      })
    })

    it('has unique collapse IDs for second accordion', () => {
      renderFaq()
      const secondCollapseIds = ['collapseOne2', 'collapseTwo2', 'collapseThree2', 'collapseFour2']
      
      secondCollapseIds.forEach(id => {
        const collapseElement = document.querySelector(`#${id}`)
        expect(collapseElement).toBeInTheDocument()
        expect(collapseElement).toHaveClass('collapse')
        expect(collapseElement).toHaveAttribute('data-parent', '#accordionTwo')
      })
    })

    it('renders content wrapper with proper styling class', () => {
      renderFaq()
      expect(document.querySelector('.faq-content-wrap.pl-20')).toBeInTheDocument()
    })
  })

  describe('Footer Section', () => {
    it('renders footer structure and main sections', () => {
      renderFaq()
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
      renderFaq()
      
      // About Travel content
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
      renderFaq()
      
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
      renderFaq()
      const awardImages = document.querySelectorAll('.award-img img')
      expect(awardImages).toHaveLength(2)
      
      const firstAwardImg = awardImages[0] as HTMLImageElement
      const secondAwardImg = awardImages[1] as HTMLImageElement
      
      expect(firstAwardImg.src).toContain('/assets/images/logo6.png')
      expect(secondAwardImg.src).toContain('/assets/images/logo2.png')
    })
  })

  describe('Accessibility and Semantics', () => {
    it('has proper heading hierarchy', () => {
      renderFaq()
      
      // Main page title (H1)
      expect(screen.getByRole('heading', { name: /Faq/i, level: 1 })).toBeInTheDocument()
      
      // Section titles (H2)
      expect(screen.getByRole('heading', { name: /FREQUENTLY ASKED QUESTIONS/i, level: 2 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /BENEFITS & WHAT WE DO?/i, level: 2 })).toBeInTheDocument()
      
      // Subsection titles (H3)
      expect(screen.getByRole('heading', { name: /STILL HAVE A QUESTION?/i, level: 3 })).toBeInTheDocument()
      
      // FAQ question titles (H4)
      const h4Elements = screen.getAllByRole('heading', { level: 4 })
      expect(h4Elements.length).toBe(8) // 4 questions in each accordion
    })

    it('has proper ARIA attributes for accordions', () => {
      renderFaq()
      
      // Check first accordion button
      const firstButton = screen.getByText('HOW WE BECAME BEST AMONG OTHERS?').closest('button')
      expect(firstButton).toHaveAttribute('aria-expanded')
      expect(firstButton).toHaveAttribute('aria-controls')
      
      // Check collapse panels
      const firstCollapse = document.querySelector('#collapseOne')
      expect(firstCollapse).toHaveAttribute('aria-labelledby', 'headingOne')
      expect(firstCollapse).toHaveAttribute('data-parent', '#accordionOne')
    })

    it('has proper form field structure', () => {
      renderFaq()
      
      // All form fields should be wrapped in paragraphs
      const formParagraphs = document.querySelectorAll('.qsn-form-container form p')
      expect(formParagraphs.length).toBe(5)
      
      // Each paragraph should contain an input or textarea
      formParagraphs.forEach(paragraph => {
        const input = paragraph.querySelector('input, textarea')
        expect(input).toBeInTheDocument()
      })
    })
  })

  describe('Grid Layout and Responsive Structure', () => {
    it('has correct Bootstrap grid classes', () => {
      renderFaq()
      
      // Main grid containers
      expect(document.querySelector('.container')).toBeInTheDocument()
      
      // Column classes
      expect(document.querySelector('.col-lg-6')).toBeInTheDocument()
      expect(document.querySelector('.col-lg-5')).toBeInTheDocument()
      expect(document.querySelector('.col-lg-7')).toBeInTheDocument()
      expect(document.querySelectorAll('.col-lg-3')).toHaveLength(4) // Footer columns
    })

    it('renders section containers with proper classes', () => {
      renderFaq()
      
      expect(document.querySelector('.faq-content-wrap')).toBeInTheDocument()
      expect(document.querySelector('.section-heading')).toBeInTheDocument()
      expect(document.querySelector('.qsn-form-container')).toBeInTheDocument()
      expect(document.querySelector('.faq-testimonial')).toBeInTheDocument()
    })
  })

  describe('Content Validation', () => {
    it('has consistent Lorem ipsum content in accordion answers', () => {
      renderFaq()
      
      // All accordion card bodies should have the same Lorem ipsum content
      const cardBodies = document.querySelectorAll('.card-body')
      expect(cardBodies.length).toBe(8) // 4 in each accordion
      
      cardBodies.forEach(cardBody => {
        expect(cardBody).toHaveTextContent(/Lorem ipsum dolor sit amet.*pulvinar dapibus leo/i)
      })
    })

    it('renders proper styling classes for visual elements', () => {
      renderFaq()
      
      // Section styling classes
      expect(document.querySelector('.dash-style')).toBeInTheDocument()
      expect(document.querySelector('.mb-0')).toBeInTheDocument()
      expect(document.querySelector('.btn.btn-link')).toBeInTheDocument()
      expect(document.querySelector('.collapsed')).toBeInTheDocument()
      
      // Footer styling classes
      expect(document.querySelector('.top-footer')).toBeInTheDocument()
      expect(document.querySelector('.buttom-footer')).toBeInTheDocument()
      expect(document.querySelector('.align-items-center')).toBeInTheDocument()
      expect(document.querySelector('.text-center')).toBeInTheDocument()
      expect(document.querySelector('.text-right')).toBeInTheDocument()
    })
  })
})
