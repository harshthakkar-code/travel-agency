import React from 'react'
import { render, screen } from '@testing-library/react'
import Forgot from '../forgot'

// Mock static image imports so JSDOM can handle them
vi.mock('../../admin/assets/images/bg.jpg', () => ({ default: 'bg-mock.jpg' }))
vi.mock('../../admin/assets/images/logo.png', () => ({ default: 'logo-mock.png' }))

// If the component imports 'popper.js', stub it (no-op)
vi.mock('popper.js', () => ({}))

describe('Forgot', () => {
  it('renders logo, username field, and links with correct hrefs', () => {
    render(<Forgot />)

    // Page container with background style
    const page = document.querySelector('.login-page')
    expect(page).toBeTruthy()
    expect(page.getAttribute('style') || '').toMatch(/bg-mock\.jpg/)

    // Logo image present by alt text
    const logo = screen.getByAltText(/logo/i)
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', expect.stringMatching(/logo-mock\.png/))

    // Username input associated by id and label htmlFor
    const usernameInput = screen.getByLabelText(/user name/i)
    expect(usernameInput).toBeInTheDocument()
    expect(usernameInput).toHaveAttribute('id', 'username')

    // Submit link is an anchor styled as button-primary, and has href "dashboard.html"
    const submitLink = screen.getByRole('link', { name: /submit/i })
    expect(submitLink).toBeInTheDocument()
    expect(submitLink).toHaveClass('button-primary')
    expect(submitLink).toHaveAttribute('href', 'dashboard.html')

    // Login link navigates to /admin/login
    const loginLink = screen.getByRole('link', { name: /login/i })
    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveAttribute('href', '/admin/login')
  })
})
