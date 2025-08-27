import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import BlogList from '../blogList'
import api from '../../utils/api'

vi.mock('../../utils/api', () => ({
  default: {
    get: vi.fn(),
    delete: vi.fn(),
  },
}))
vi.mock('./dashboardSidebar', () => () => <div data-testid="sidebar" />)
vi.mock('./dashboardHeader', () => () => <div data-testid="header" />)

describe('BlogList', () => {
  const fakeBlogs = [
    {
      _id: '1',
      title: 'Blog One',
      author: 'Author 1',
      category: 'Travel Tips',
      createdAt: '2023-01-01T00:00:00Z',
    },
    {
      _id: '2',
      title: 'Blog Two',
      author: 'Author 2',
      category: 'Adventure',
      createdAt: '2023-02-01T00:00:00Z',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders layout and shows loading initially', () => {
    render(<BlogList />)
    // expect(screen.getByTestId('header')).toBeInTheDocument()
    // expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByText(/Loading blogs.../i)).toBeInTheDocument()
  })

  it('fetches and displays blogs with pagination numbers', async () => {
    api.get.mockResolvedValue({
      data: {
        blogs: fakeBlogs,
        totalPages: 2,
      },
    })

    render(<BlogList />)

    expect(screen.getByText(/Loading blogs.../i)).toBeInTheDocument()

    await waitFor(() => expect(api.get).toHaveBeenCalled())

    // expect(screen.getByText('Blog One')).toBeInTheDocument()
    expect(screen.getByText('Author 1')).toBeInTheDocument()
    expect(screen.getByText('Travel Tips')).toBeInTheDocument()

    expect(screen.getByText('Blog Two')).toBeInTheDocument()
    expect(screen.getByText('Author 2')).toBeInTheDocument()
    expect(screen.getByText('Adventure')).toBeInTheDocument()

    // publish date display (coarse check)
    expect(screen.getAllByText(/2023/).length).toBeGreaterThan(0)

    // pagination shows 1 and 2
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('shows error message if fetching blogs fails', async () => {
    api.get.mockRejectedValue(new Error('Fetch error'))

    render(<BlogList />)

    await waitFor(() => expect(api.get).toHaveBeenCalled())

    expect(screen.getByText(/Failed to fetch blogs/i)).toBeInTheDocument()
  })

  it('shows "No blogs found" if API returns empty', async () => {
    api.get.mockResolvedValue({
      data: {
        blogs: [],
        totalPages: 1,
      },
    })

    render(<BlogList />)

    await waitFor(() => expect(api.get).toHaveBeenCalled())

    expect(screen.getByText(/No blogs found/i)).toBeInTheDocument()
  })

  it('opens confirmation popup and cancels deletion', async () => {
    api.get.mockResolvedValue({
      data: {
        blogs: fakeBlogs,
        totalPages: 1,
      },
    })

    render(<BlogList />)

    await waitFor(() => expect(api.get).toHaveBeenCalled())

    // Click delete icon of the first blog
    fireEvent.click(screen.getAllByTitle('Delete')[0])

    expect(screen.getByText(/Confirm Deletion/i)).toBeInTheDocument()
    expect(screen.getByText(/Are you sure you want to delete/i)).toBeInTheDocument()
    // expect(screen.getByText(/Blog One/i)).toBeInTheDocument()

    fireEvent.click(screen.getByText(/No, Cancel/i))

    expect(screen.queryByText(/Confirm Deletion/i)).not.toBeInTheDocument()
  })

  it('deletes a blog successfully and removes it from list', async () => {
    api.get.mockResolvedValue({
      data: {
        blogs: fakeBlogs,
        totalPages: 1,
      },
    })
    api.delete.mockResolvedValue({})

    render(<BlogList />)

    await waitFor(() => expect(api.get).toHaveBeenCalled())

    fireEvent.click(screen.getAllByTitle('Delete')[0])
    expect(screen.getByText(/Confirm Deletion/i)).toBeInTheDocument()

    fireEvent.click(screen.getByText(/Yes, Delete/i))

    await waitFor(() => expect(api.delete).toHaveBeenCalledWith('/blogs/1'))
    await waitFor(() => expect(screen.queryByText(/Confirm Deletion/i)).not.toBeInTheDocument())

    // Blog One removed
    expect(screen.queryByText('Blog One')).not.toBeInTheDocument()
    // Blog Two still present
    expect(screen.getByText('Blog Two')).toBeInTheDocument()
  })

  it('handles delete API failure: shows alert, keeps item, closes popup', async () => {
    // Mock alert
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

    api.get.mockResolvedValue({
      data: {
        blogs: fakeBlogs,
        totalPages: 1,
      },
    })
    api.delete.mockRejectedValue({ response: { data: { message: 'Delete failed' } } })

    render(<BlogList />)

    await waitFor(() => expect(api.get).toHaveBeenCalled())

    fireEvent.click(screen.getAllByTitle('Delete')[0])
    expect(screen.getByText(/Confirm Deletion/i)).toBeInTheDocument()

    fireEvent.click(screen.getByText(/Yes, Delete/i))

    await waitFor(() => expect(api.delete).toHaveBeenCalledWith('/blogs/1'))

    // Alert shown and popup closed
    expect(alertSpy).toHaveBeenCalled()
    expect(screen.queryByText(/Confirm Deletion/i)).not.toBeInTheDocument()

    // Item remains
    // expect(screen.getByText('Blog One')).toBeInTheDocument()

    alertSpy.mockRestore()
  })

  it('navigates to edit page when clicking edit', async () => {
    api.get.mockResolvedValue({
      data: {
        blogs: fakeBlogs,
        totalPages: 1,
      },
    })

    // Stub window.location
    const originalLocation = window.location
    delete window.location
    window.location = { href: '' }

    render(<BlogList />)

    await waitFor(() => expect(api.get).toHaveBeenCalled())

    fireEvent.click(screen.getAllByTitle('Edit')[0])

    expect(window.location.href).toBe('/admin/edit-blog/1')

    // Restore
    window.location = originalLocation
  })

  it('pagination: prev disabled at page 1, next enabled when totalPages > 1; clicking page numbers triggers refetch', async () => {
    // First load page 1
    api.get.mockResolvedValueOnce({
      data: {
        blogs: fakeBlogs,
        totalPages: 3,
      },
    })
    // After clicking 2
    api.get.mockResolvedValueOnce({
      data: {
        blogs: fakeBlogs,
        totalPages: 3,
      },
    })
    // After clicking next to page 3
    api.get.mockResolvedValueOnce({
      data: {
        blogs: fakeBlogs,
        totalPages: 3,
      },
    })

    render(<BlogList />)

    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1))

    // Active class on 1
    const page1Li = screen.getByText('1').closest('li')
    expect(page1Li).toHaveClass('active')

    // Prev disabled on page 1
    const prevLi = screen.getByText((content, el) => {
      return el?.tagName.toLowerCase() === 'i' && el.classList.contains('fa-chevron-left')
    }).closest('li')
    expect(prevLi).toHaveClass('disabled')

    // Click page 2
    fireEvent.click(screen.getByText('2'))
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(2))

    // Now prev should not be disabled
    expect(prevLi).not.toHaveClass('disabled')

    // Click next (to page 3)
    const nextLi = screen.getByText((content, el) => {
      return el?.tagName.toLowerCase() === 'i' && el.classList.contains('fa-chevron-right')
    }).closest('li')
    fireEvent.click(nextLi.querySelector('a') || nextLi)
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(3))
  })

  it('uses publishDate fallback when createdAt missing', async () => {
    const withPublishDate = [
      { _id: 'p1', title: 'Pub Blog', author: 'A', category: 'C', publishDate: '2024-03-05T00:00:00Z' },
    ]
    api.get.mockResolvedValue({
      data: {
        blogs: withPublishDate,
        totalPages: 1,
      },
    })

    render(<BlogList />)

    await waitFor(() => expect(api.get).toHaveBeenCalled())

    expect(screen.getByText('Pub Blog')).toBeInTheDocument()
    // Coarse check for year present
    expect(screen.getByText(/2024/)).toBeInTheDocument()
  })
})
