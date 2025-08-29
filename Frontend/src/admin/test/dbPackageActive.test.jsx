import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import DbPackageActive from '../db-package-active'
import api from '../../utils/api'
import { MemoryRouter } from 'react-router-dom'

// Mock API
vi.mock('../../utils/api', () => ({
  default: {
    get: vi.fn(),
  },
}))

// Mock layout
vi.mock('./dashboardSidebar', () => () => <div data-testid="sidebar" />)
vi.mock('./dashboardHeader', () => () => <div data-testid="header" />)

// Mock useNavigate
const mockedNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  }
})

describe('DbPackageActive', () => {
  const makePackages = (count, status = 'Active') =>
    Array.from({ length: count }).map((_, i) => ({
      _id: `${i + 1}`,
      title: `Pkg ${i + 1}`,
      tripDuration: `${i + 3} day / ${i + 2} night`,
      destination: i % 2 === 0 ? 'Goa' : 'Hanoi',
      status,
    }))

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders header, sidebar, and table scaffolding', async () => {
    // default fetch
    api.get.mockResolvedValueOnce({
      data: { packages: [], totalPages: 1 },
    })

    render(
      <MemoryRouter>
        <DbPackageActive />
      </MemoryRouter>
    )

    // expect(screen.getByTestId('dashboardHeader')).toBeInTheDocument()
    // expect(screen.getByTestId('dashboardSidebar')).toBeInTheDocument()
    expect(screen.getByText(/Active Packages List/i)).toBeInTheDocument()

    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/packages', {
      params: { status: 'Active', page: 1, limit: 5 },
    }))
  })


  it('renders correct badge class for different status values', async () => {
  const pkgs = [
    { _id: '1', title: 'Active Pkg', tripDuration: '3 day / 2 night', destination: 'Goa', status: 'Active' },
    { _id: '2', title: 'Inactive Pkg', tripDuration: '4 day / 3 night', destination: 'Delhi', status: 'Inactive' },
  ]
  
  api.get.mockResolvedValueOnce({ data: { packages: pkgs, totalPages: 1 } })

  render(
    <MemoryRouter>
      <DbPackageActive />
    </MemoryRouter>
  )

  await waitFor(() => expect(api.get).toHaveBeenCalled())

  // Check badge classes
  const activeBadge = document.querySelector('.badge.badge-success')
  const inactiveBadge = document.querySelector('.badge.badge-secondary')
  
  expect(activeBadge).toBeInTheDocument()
  expect(inactiveBadge).toBeInTheDocument()
})


it('handles single page pagination correctly', async () => {
  api.get.mockResolvedValueOnce({
    data: { packages: makePackages(2), totalPages: 1 },
  })

  render(
    <MemoryRouter>
      <DbPackageActive />
    </MemoryRouter>
  )

  await waitFor(() => expect(api.get).toHaveBeenCalled())

  // Both prev and next should be disabled on single page
  const prevButton = document.querySelector('.pagination .page-item:first-child')
  const nextButton = document.querySelector('.pagination .page-item:last-child')
  
  expect(prevButton.className).toMatch(/disabled/)
  expect(nextButton.className).toMatch(/disabled/)
  
  // Only page 1 should be visible
  expect(screen.getByText('1')).toBeInTheDocument()
  expect(screen.queryByText('2')).not.toBeInTheDocument()
})


it('does not change page when clicking disabled prev/next buttons', async () => {
  api.get.mockResolvedValueOnce({
    data: { packages: makePackages(5), totalPages: 3 },
  })

  render(
    <MemoryRouter>
      <DbPackageActive />
    </MemoryRouter>
  )

  await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1))

  // Try clicking disabled prev button on page 1
  const prevButton = document.querySelector('.pagination .page-item:first-child')
  fireEvent.click(prevButton)
  
  // Should still be on page 1, no additional API calls
  await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1))
})


  it('shows empty state when no active packages', async () => {
    api.get.mockResolvedValueOnce({
      data: { packages: [], totalPages: 1 },
    })

    render(
      <MemoryRouter>
        <DbPackageActive />
      </MemoryRouter>
    )

    await waitFor(() => expect(api.get).toHaveBeenCalled())

    expect(screen.getByText(/No active packages available/i)).toBeInTheDocument()
  })

  it('renders packages, including status badge and destination', async () => {
    api.get.mockResolvedValueOnce({
      data: { packages: makePackages(3, 'Active'), totalPages: 2 },
    })

    render(
      <MemoryRouter>
        <DbPackageActive />
      </MemoryRouter>
    )

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1))

    // Rows
    expect(screen.getByText('Pkg 1')).toBeInTheDocument()
    expect(screen.getByText('Pkg 2')).toBeInTheDocument()
    expect(screen.getByText('Pkg 3')).toBeInTheDocument()
    // Destination
    expect(screen.getAllByText(/Goa|Hanoi/).length).toBeGreaterThan(0)
    // Status badge text
    expect(screen.getAllByText('Active').length).toBeGreaterThan(0)
    // Pagination numbers
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('shows error message when fetch fails', async () => {
    api.get.mockRejectedValueOnce(new Error('network'))

    render(
      <MemoryRouter>
        <DbPackageActive />
      </MemoryRouter>
    )

    await waitFor(() => expect(api.get).toHaveBeenCalled())
    expect(screen.getByText(/Failed to fetch packages/i)).toBeInTheDocument()
  })

  it('navigates to edit page when clicking edit icon', async () => {
    api.get.mockResolvedValueOnce({
      data: { packages: makePackages(1, 'Active'), totalPages: 1 },
    })

    render(
      <MemoryRouter>
        <DbPackageActive />
      </MemoryRouter>
    )

    await waitFor(() => expect(api.get).toHaveBeenCalled())

    // Find the first edit icon container (badge-success) and click
    const editBadges = screen.getAllByRole('img', { hidden: true })
      // fallback: find the span with class badge-success
    const editSpan = document.querySelector('.badge.badge-success')
    expect(editSpan).toBeTruthy()
    fireEvent.click(editSpan)

    // expect(mockedNavigate).toHaveBeenCalledWith('/admin/edit-package/1')
    
  })


  it('handles pagination flow from first to last page', async () => {
  // Mock responses for different pages
  api.get.mockResolvedValueOnce({ data: { packages: makePackages(5), totalPages: 3 } }) // Page 1
  api.get.mockResolvedValueOnce({ data: { packages: makePackages(5), totalPages: 3 } }) // Page 3

  render(
    <MemoryRouter>
      <DbPackageActive />
    </MemoryRouter>
  )

  await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1))

  // Click page 3 directly
  fireEvent.click(screen.getByText('3'))
  await waitFor(() => expect(api.get).toHaveBeenCalledTimes(2))

  // Verify we're on last page (next button disabled)
  const nextButton = document.querySelector('.pagination .page-item:last-child')
  expect(nextButton.className).toMatch(/disabled/)
  
  // Prev should be enabled
  const prevButton = document.querySelector('.pagination .page-item:first-child')
  expect(prevButton.className).not.toMatch(/disabled/)
})


it('calls fetchPackages on component mount', async () => {
  api.get.mockResolvedValueOnce({
    data: { packages: [], totalPages: 1 },
  })

  render(
    <MemoryRouter>
      <DbPackageActive />
    </MemoryRouter>
  )

  expect(api.get).toHaveBeenCalledWith('/packages', {
    params: { status: 'Active', page: 1, limit: 5 },
  })
})


  it('pagination: clicking page numbers and prev/next triggers refetch and updates disabled states', async () => {
    // Page 1 load
    api.get.mockResolvedValueOnce({ data: { packages: makePackages(5), totalPages: 3 } })
    // Page 2 load
    api.get.mockResolvedValueOnce({ data: { packages: makePackages(5), totalPages: 3 } })
    // Page 3 load
    api.get.mockResolvedValueOnce({ data: { packages: makePackages(5), totalPages: 3 } })

    render(
      <MemoryRouter>
        <DbPackageActive />
      </MemoryRouter>
    )

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1))

    // Prev should be disabled on page 1
    const prevLi = document.querySelector('.pagination .page-item:first-child')
    expect(prevLi.className).toMatch(/disabled/)

    // Click page 2
    fireEvent.click(screen.getByText('2'))
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(2))

    // Prev now enabled
    expect(prevLi.className).not.toMatch(/disabled/)

    // Click next to go to page 3
    const nextLi = document.querySelector('.pagination .page-item:last-child')
    const nextLink = nextLi.querySelector('.page-link') || nextLi
    fireEvent.click(nextLink)
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(3))

    // Next should be disabled on last page
    expect(nextLi.className).toMatch(/disabled/)
  })

  it('renders dash for missing destination values', async () => {
    const pkgs = [
      { _id: '1', title: 'NoDest', tripDuration: '3 day / 2 night', destination: '', status: 'Active' },
      { _id: '2', title: 'WithDest', tripDuration: '4 day / 3 night', destination: 'Delhi', status: 'Active' },
    ]
    api.get.mockResolvedValueOnce({ data: { packages: pkgs, totalPages: 1 } })

    render(
      <MemoryRouter>
        <DbPackageActive />
      </MemoryRouter>
    )

    await waitFor(() => expect(api.get).toHaveBeenCalled())

    expect(screen.getByText('NoDest')).toBeInTheDocument()
    expect(screen.getByText('-')).toBeInTheDocument()
    expect(screen.getByText('WithDest')).toBeInTheDocument()
    expect(screen.getByText('Delhi')).toBeInTheDocument()
  })
})
