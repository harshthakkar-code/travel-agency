import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import UserEdit from '../user-edit'
import api from '../../utils/api'

// Mock API
vi.mock('../../utils/api', () => ({
  default: {
    get: vi.fn(),
    put: vi.fn(),
  },
}))

// Mock header/sidebar to stable test ids using the same import path the component uses
vi.mock('./dashboardHeader', () => () => <div data-testid="header" />)
vi.mock('./dashboardSidebar', () => () => <div data-testid="sidebar" />)

// Mock router hooks: useParams returns id from the URL we route to
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ id: 'u123' }),
  }
})

function renderWithRouter(ui) {
  return render(
    <MemoryRouter initialEntries={['/admin/user-edit/u123']}>
      <Routes>
        <Route path="/admin/user-edit/:id" element={ui} />
      </Routes>
    </MemoryRouter>
  )
}

const byName = (name) => document.querySelector(`input[name="${name}"]`)
const bySelectName = (name) => document.querySelector(`select[name="${name}"]`)

describe('UserEdit', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches user by id, parses dateOfBirth into day/month/year, and fills form', async () => {
    // 1996-07-09T00:00:00.000Z -> day=9, month=7, year=1996
    api.get.mockResolvedValueOnce({
      data: {
        _id: 'u123',
        firstName: 'Priya',
        lastName: 'Shah',
        email: 'priya@example.com',
        dateOfBirth: '1996-07-09T00:00:00.000Z',
        mobile: '9999999999',
        country: 'India',
        city: 'Ahmedabad',
      },
    })

    renderWithRouter(<UserEdit />)

    // API called with /users/u123
    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/users/u123'))

    // Inputs populated
    expect(byName('firstname')).toHaveValue('Priya')
    expect(byName('lastname')).toHaveValue('Shah')
    expect(byName('email')).toHaveValue('priya@example.com')
    expect(byName('phone')).toHaveValue('9999999999')
    expect(byName('country')).toHaveValue('India')
    expect(byName('city')).toHaveValue('Ahmedabad')

    // DOB selects
    expect(bySelectName('day')).toHaveValue('9')
    expect(bySelectName('month')).toHaveValue('7')
    expect(bySelectName('year')).toHaveValue('1996')

    expect(screen.getByText(/User Edit Details/i)).toBeInTheDocument()
  })

  it('shows error message when fetch fails', async () => {
    api.get.mockRejectedValueOnce(new Error('network'))

    renderWithRouter(<UserEdit />)

    await waitFor(() => expect(api.get).toHaveBeenCalled())

    expect(await screen.findByText(/Failed to load user data/i)).toBeInTheDocument()
  })

  it('validates required fields on submit and clears errors on change', async () => {
    // Return empty values to force validation on submit
    api.get.mockResolvedValueOnce({
      data: {
        _id: 'u123',
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        mobile: '',
        country: '',
        city: '',
      },
    })

    renderWithRouter(<UserEdit />)
    await waitFor(() => expect(api.get).toHaveBeenCalled())

    // ✅ Wait for the form to be fully loaded and populated
    await waitFor(() => {
      expect(byName('firstname')).toBeInTheDocument()
      expect(byName('lastname')).toBeInTheDocument()
    })

    // Submit empty form
    await userEvent.click(screen.getByRole('button', { name: /save changes/i }))

    // ✅ Use increased timeout and more specific selectors
    await waitFor(() => {
      expect(screen.getByText(/First name is required/i)).toBeInTheDocument()
    }, { timeout: 3000 })

    expect(screen.getByText(/Last name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Complete date of birth is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Country is required/i)).toBeInTheDocument()
    expect(screen.getByText(/City is required/i)).toBeInTheDocument()

    // Clear errors via input changes (handleChange logic)
    await userEvent.type(byName('firstname'), 'Ravi')
    await waitFor(() => {
      expect(screen.queryByText(/First name is required/i)).not.toBeInTheDocument()
    })

    await userEvent.type(byName('lastname'), 'Kumar')
    await waitFor(() => {
      expect(screen.queryByText(/Last name is required/i)).not.toBeInTheDocument()
    })

    await userEvent.type(byName('email'), 'ravi@example.com')
    await waitFor(() => {
      expect(screen.queryByText(/Email is required/i)).not.toBeInTheDocument()
    })

    // Select DOB
    await userEvent.selectOptions(bySelectName('day'), '15')
    await userEvent.selectOptions(bySelectName('month'), '12')
    await userEvent.selectOptions(bySelectName('year'), '1999')

    await userEvent.type(byName('phone'), '8888888888')
    await waitFor(() => {
      expect(screen.queryByText(/Phone number is required/i)).not.toBeInTheDocument()
    })

    await userEvent.type(byName('country'), 'India')
    await waitFor(() => {
      expect(screen.queryByText(/Country is required/i)).not.toBeInTheDocument()
    })

    await userEvent.type(byName('city'), 'Pune')
    await waitFor(() => {
      expect(screen.queryByText(/City is required/i)).not.toBeInTheDocument()
    })
  }, 10000) // ✅ Increased timeout for the entire test

  it('submits valid form, PUTs correct payload, and shows success', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        _id: 'u123',
        firstName: 'Priya',
        lastName: 'Shah',
        email: 'priya@example.com',
        dateOfBirth: '1996-07-09T00:00:00.000Z',
        mobile: '9999999999',
        country: 'India',
        city: 'Ahmedabad',
      },
    })
    api.put.mockResolvedValueOnce({ data: { ok: true } })

    renderWithRouter(<UserEdit />)
    await waitFor(() => expect(api.get).toHaveBeenCalled())

    // ✅ Wait for form to be populated
    await waitFor(() => {
      expect(byName('firstname')).toHaveValue('Priya')
    })

    // Edit some fields - ✅ Use clear and type properly
    const firstNameInput = byName('firstname')
    await userEvent.clear(firstNameInput)
    await userEvent.type(firstNameInput, 'Priya2')

    await userEvent.selectOptions(bySelectName('day'), '10')
    await userEvent.selectOptions(bySelectName('month'), '8')
    await userEvent.selectOptions(bySelectName('year'), '1997')

    const cityInput = byName('city')
    await userEvent.clear(cityInput)
    await userEvent.type(cityInput, 'Surat')

    // ✅ Verify the values before submitting
    await waitFor(() => {
      expect(firstNameInput.value).toBe('Priya2')
      expect(cityInput.value).toBe('Surat')
    })

    // Submit
    await userEvent.click(screen.getByRole('button', { name: /save changes/i }))

    await waitFor(() => expect(api.put).toHaveBeenCalledTimes(1))
    
    const [url, payload] = api.put.mock.calls[0]
    expect(url).toBe('/users/u123')
    expect(payload).toEqual({
      firstName: 'Priya2',
      lastName: 'Shah',
      email: 'priya@example.com',
      dateOfBirth: '1997-08-10',
      mobile: '9999999999',
      country: 'India',
      city: 'Surat',
    })

    expect(await screen.findByText(/User updated successfully/i)).toBeInTheDocument()
  })

  it('shows API error when PUT fails', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        _id: 'u123',
        firstName: 'Priya',
        lastName: 'Shah',
        email: 'priya@example.com',
        dateOfBirth: '1996-07-09T00:00:00.000Z',
        mobile: '9999999999',
        country: 'India',
        city: 'Ahmedabad',
      },
    })
    api.put.mockRejectedValueOnce({ response: { data: { message: 'Failed to update user' } } })

    renderWithRouter(<UserEdit />)
    await waitFor(() => expect(api.get).toHaveBeenCalled())

    // ✅ Wait for form to be loaded
    await waitFor(() => {
      expect(byName('firstname')).toHaveValue('Priya')
    })

    await userEvent.click(screen.getByRole('button', { name: /save changes/i }))

    expect(await screen.findByText(/Failed to update user/i)).toBeInTheDocument()
  })
})
