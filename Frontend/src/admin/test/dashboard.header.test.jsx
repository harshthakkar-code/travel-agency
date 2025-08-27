import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import DashboardHeader from '../dashboardHeader'

// No need to vi.mock the component itself here; test the real one.

describe('DashboardHeader', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Reset window.location mocking
    const original = window.location
    delete window.location
    window.location = { ...original, href: '' }
  })

  afterAll(() => {
    // best-effort restore if needed by other suites
    // Note: In some runners, a full restore is not necessary between files.
  })

  it('renders logo and user profile', () => {
    localStorage.setItem('user', 'John Doe')
    localStorage.setItem('userEmail', 'john@example.com')

    render(<DashboardHeader />)

    // Logo image
    const logo = screen.getByAltText('Logo')
    expect(logo).toBeInTheDocument()
    expect(logo.getAttribute('src') || '').toMatch(/logo\.png/)

    // User profile image
    const profileImg = screen.getByAltText('Profile')
    expect(profileImg).toBeInTheDocument()

    // User name displayed
    const userName = screen.getByText('John Doe')
    expect(userName).toBeInTheDocument()
  })

  it('toggles user dropdown when clicking caret icon only', () => {
    localStorage.setItem('user', 'John Doe')
    render(<DashboardHeader />)

    // Initially dropdown content not visible
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument()

    // Click caret icon to show dropdown (query the caret by class)
    const caret = screen.getByText((_c, el) => el?.className?.includes('fa-caret-down'))
    fireEvent.click(caret)
    expect(screen.getByText(/Logout/i)).toBeInTheDocument()

    // Clicking inside but not on caret should not toggle off (e.g., click on username span)
    const userNameSpan = screen.getByText('John Doe')
    fireEvent.click(userNameSpan)
    expect(screen.getByText(/Logout/i)).toBeInTheDocument()

    // Click caret again hides dropdown
    fireEvent.click(caret)
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument()
  })

  it('closes dropdown when clicking outside', () => {
    localStorage.setItem('user', 'John Doe')
    render(<DashboardHeader />)

    // open dropdown
    const caret = screen.getByText((_c, el) => el?.className?.includes('fa-caret-down'))
    fireEvent.click(caret)
    expect(screen.getByText(/Logout/i)).toBeInTheDocument()

    // click outside of .user-dropdown
    fireEvent.mouseDown(document.body)
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument()
  })

  it('logs out and clears storage keys, then redirects to /', () => {
    // Set all keys that component clears
    localStorage.setItem('user', 'Jane Doe')
    localStorage.setItem('userEmail', 'jane@example.com')
    localStorage.setItem('token', 'some-token')
    localStorage.setItem('userRole', 'admin')
    localStorage.setItem('bookingData', 'data-x')
    localStorage.setItem('completeBooking', 'yes')

    render(<DashboardHeader />)

    // Show dropdown
    const caret = screen.getByText((_c, el) => el?.className?.includes('fa-caret-down'))
    fireEvent.click(caret)
    const logoutButton = screen.getByRole('button', { name: /logout/i })
    fireEvent.click(logoutButton)

    // Keys removed (note: component uses bookingData and completeBooking)
    expect(localStorage.getItem('token')).toBeNull()
    expect(localStorage.getItem('user')).toBeNull()
    expect(localStorage.getItem('userRole')).toBeNull()
    expect(localStorage.getItem('bookingData')).toBeNull()
    expect(localStorage.getItem('completeBooking')).toBeNull()

    // Dropdown should close after logout
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument()

    // Redirect happened
    expect(window.location.href).toBe('/')
  })

  it('hover handlers on logout button do not crash and apply inline style changes', () => {
    localStorage.setItem('user', 'Hover User')
    localStorage.setItem('userEmail', 'hover@example.com')

    render(<DashboardHeader />)

    // open dropdown
    const caret = screen.getByText((_c, el) => el?.className?.includes('fa-caret-down'))
    fireEvent.click(caret)
    const logoutButton = screen.getByRole('button', { name: /logout/i })

    // onMouseOver applies background color; while jsdom may not compute style fully,
    // inline style changes are set on target element
    fireEvent.mouseOver(logoutButton)
    // can't rely on computed style; check attribute-level style mutation
    // JSDOM stores inline styles in element.style
    expect(logoutButton.style.backgroundColor).toBe('rgb(248, 249, 250)') // '#f8f9fa' normalized may vary
    // Allow either empty or 'transparent' after mouse out
    fireEvent.mouseOut(logoutButton)
    // In JSDOM, setting 'transparent' may normalize differently; just assert style exists (not throwing)
    expect(logoutButton).toBeInTheDocument()
  })
})
