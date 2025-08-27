import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import DbEditBlog from '../editBlog'
import api from '../../utils/api'
import uploadImage from '../../utils/uploadImage'

// Create mockNavigate outside to maintain reference
const mockNavigate = vi.fn()

// Mock API
vi.mock('../../utils/api', () => ({
  default: {
    get: vi.fn(),
    put: vi.fn(),
  },
}))

// Mock the uploadImage utility
vi.mock('../../utils/uploadImage', () => ({
  default: vi.fn(),
}))

// Mock header/sidebar components using stable test ids
vi.mock('./dashboardHeader', () => () => <div data-testid="header" />)
vi.mock('./dashboardSidebar', () => () => <div data-testid="sidebar" />)

// Mock router hooks: useParams returns id from the URL we route to
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ id: 'blog123' }),
    useNavigate: () => mockNavigate,
  }
})

function renderWithRouter(ui) {
  return render(
    <MemoryRouter initialEntries={['/admin/edit-blog/blog123']}>
      <Routes>
        <Route path="/admin/edit-blog/:id" element={ui} />
      </Routes>
    </MemoryRouter>
  )
}

// Helper functions for DOM queries
const byName = (name) => document.querySelector(`input[name="${name}"]`)
const byTextareaName = (name) => document.querySelector(`textarea[name="${name}"]`)
const bySelectName = (name) => document.querySelector(`select[name="${name}"]`)

describe('DbEditBlog', () => {
  const mockBlogData = {
    _id: 'blog123',
    title: 'Sample Travel Blog',
    author: 'John Traveler',
    content: 'Amazing journey through the mountains and valleys...',
    category: 'Travel Tips',
    tags: ['travel', 'adventure', 'mountains'],
    status: 'Draft',
    image: 'https://example.com/sample-image.jpg'
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockNavigate.mockClear()
  })

  it('shows loading state initially', async () => {
    // Mock API to never resolve to keep loading state
    api.get.mockImplementation(() => new Promise(() => {}))

    renderWithRouter(<DbEditBlog />)

    expect(screen.getByText('Loading blog data...')).toBeInTheDocument()
    expect(screen.queryByText('Edit Blog')).not.toBeInTheDocument()
  })

  it('fetches blog data and pre-fills form fields', async () => {
    api.get.mockResolvedValueOnce({ data: mockBlogData })

    renderWithRouter(<DbEditBlog />)

    // Header/Sidebar present
    // expect(screen.getByTestId('header')).toBeInTheDocument()
    // expect(screen.getByTestId('sidebar')).toBeInTheDocument()

    // API called with correct endpoint
    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/blogs/blog123'))

    // Form fields populated
    expect(byName('title')).toHaveValue('Sample Travel Blog')
    expect(byName('author')).toHaveValue('John Traveler')
    expect(byTextareaName('content')).toHaveValue('Amazing journey through the mountains and valleys...')
    expect(bySelectName('category')).toHaveValue('Travel Tips')
    expect(byName('tags')).toHaveValue('travel, adventure, mountains')

    // Image preview shown
    const images = screen.getAllByRole('img')
    const blogImage = images.find(img => img.src === 'https://example.com/sample-image.jpg')
    expect(blogImage).toBeInTheDocument()

    expect(screen.getByText('Edit Blog')).toBeInTheDocument()
  })

  it('shows error message when fetch fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    api.get.mockRejectedValueOnce(new Error('Network error'))

    renderWithRouter(<DbEditBlog />)

    await waitFor(() => expect(api.get).toHaveBeenCalled())

    expect(await screen.findByText(/Failed to load blog data/i)).toBeInTheDocument()
    
    consoleSpy.mockRestore()
  })

  it('validates required fields on submit and clears errors on change', async () => {
    // Return empty values to force validation
    api.get.mockResolvedValueOnce({
      data: {
        _id: 'blog123',
        title: '',
        author: '',
        content: '',
        category: '',
        tags: [],
        status: 'Draft',
        image: ''
      },
    })

    renderWithRouter(<DbEditBlog />)
    await waitFor(() => expect(api.get).toHaveBeenCalled())

    // Submit empty form
    await userEvent.click(screen.getByRole('button', { name: /save changes/i }))

    // Validation errors shown
    expect(await screen.findByText(/Title is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Author is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Content is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Category is required/i)).toBeInTheDocument()

    // Clear errors via input changes
    await userEvent.type(byName('title'), 'New Blog Title')
    expect(screen.queryByText(/Title is required/i)).not.toBeInTheDocument()

    await userEvent.type(byName('author'), 'Jane Doe')
    expect(screen.queryByText(/Author is required/i)).not.toBeInTheDocument()

    await userEvent.type(byTextareaName('content'), 'Blog content here...')
    expect(screen.queryByText(/Content is required/i)).not.toBeInTheDocument()

    await userEvent.selectOptions(bySelectName('category'), 'Adventure')
    expect(screen.queryByText(/Category is required/i)).not.toBeInTheDocument()
  })

  it('handles image upload successfully', async () => {
    api.get.mockResolvedValueOnce({ data: mockBlogData })
    uploadImage.mockResolvedValueOnce('https://example.com/new-uploaded-image.jpg')

    renderWithRouter(<DbEditBlog />)
    await waitFor(() => expect(api.get).toHaveBeenCalled())

    // Create and upload file
    const file = new File(['test content'], 'test-image.jpg', { type: 'image/jpeg' })
    const fileInput = screen.getByTestId('file-input') // File input element

    await userEvent.upload(fileInput, file)

    await waitFor(() => {
      expect(uploadImage).toHaveBeenCalledWith(file)
    })

    // New image should be displayed
    await waitFor(() => {
      const images = screen.getAllByRole('img')
      const uploadedImage = images.find(img => img.src === 'https://example.com/new-uploaded-image.jpg')
      expect(uploadedImage).toBeInTheDocument()
    })
  })

  it('handles image upload error', async () => {
    api.get.mockResolvedValueOnce({ data: mockBlogData })
    uploadImage.mockRejectedValueOnce(new Error('Upload failed'))

    renderWithRouter(<DbEditBlog />)
    await waitFor(() => expect(api.get).toHaveBeenCalled())

    const file = new File(['test content'], 'test-image.jpg', { type: 'image/jpeg' })
    const fileInput = screen.getByTestId('file-input')

    await userEvent.upload(fileInput, file)

    expect(await screen.findByText(/Image upload failed/i)).toBeInTheDocument()
  })

  it('removes image when remove button is clicked', async () => {
  api.get.mockResolvedValueOnce({ data: mockBlogData })

  renderWithRouter(<DbEditBlog />)
  await waitFor(() => expect(api.get).toHaveBeenCalled())

  // Image should be present initially

  // Click remove button
  const removeButton = screen.getByText('Remove')
  await userEvent.click(removeButton)

  // ✅ Check that no images with that src exist
  await waitFor(() => {
    const images = screen.queryAllByRole('img')
    const hasRemovedImage = images.some(img => img.src === 'https://example.com/sample-image.jpg')
    expect(hasRemovedImage).toBe(false)
  })
})


  it('submits valid form with correct payload and shows success', async () => {
    api.get.mockResolvedValueOnce({ data: mockBlogData })
    api.put.mockResolvedValueOnce({ data: { success: true } })

    renderWithRouter(<DbEditBlog />)
    await waitFor(() => expect(api.get).toHaveBeenCalled())

    // Edit some fields
    await userEvent.clear(byName('title'))
    await userEvent.type(byName('title'), 'Updated Travel Blog')

    await userEvent.clear(byName('tags'))
    await userEvent.type(byName('tags'), 'updated, travel, blog, awesome')

    await userEvent.selectOptions(bySelectName('category'), 'Adventure')

    // Submit form
    await userEvent.click(screen.getByRole('button', { name: /save changes/i }))

    await waitFor(() => expect(api.put).toHaveBeenCalledTimes(1))

    const [url, payload] = api.put.mock.calls[0]
    expect(url).toBe('/blogs/blog123')
    expect(payload).toEqual({
      title: 'Updated Travel Blog',
      author: 'John Traveler',
      content: 'Amazing journey through the mountains and valleys...',
      category: 'Adventure',
      tags: ['updated', 'travel', 'blog', 'awesome'],
      status: 'Draft',
      image: 'https://example.com/sample-image.jpg'
    })

    expect(await screen.findByText(/Blog updated successfully/i)).toBeInTheDocument()
  })

  it('shows API error when PUT fails', async () => {
    api.get.mockResolvedValueOnce({ data: mockBlogData })
    api.put.mockRejectedValueOnce({
      response: { data: { message: 'Failed to update blog' } }
    })

    renderWithRouter(<DbEditBlog />)
    await waitFor(() => expect(api.get).toHaveBeenCalled())

    await userEvent.click(screen.getByRole('button', { name: /save changes/i }))

    expect(await screen.findByText(/Failed to update blog/i)).toBeInTheDocument()
  })

  it('shows generic error when PUT fails without specific message', async () => {
    api.get.mockResolvedValueOnce({ data: mockBlogData })
    api.put.mockRejectedValueOnce(new Error('Network error'))

    renderWithRouter(<DbEditBlog />)
    await waitFor(() => expect(api.get).toHaveBeenCalled())

    await userEvent.click(screen.getByRole('button', { name: /save changes/i }))

    expect(await screen.findByText(/Error updating blog/i)).toBeInTheDocument()
  })

  it('handles empty tags correctly', async () => {
    const blogWithEmptyTags = { ...mockBlogData, tags: [] }
    api.get.mockResolvedValueOnce({ data: blogWithEmptyTags })

    renderWithRouter(<DbEditBlog />)
    await waitFor(() => expect(api.get).toHaveBeenCalled())

    expect(byName('tags')).toHaveValue('')
  })

  it('processes tags with extra spaces and empty values correctly', async () => {
    api.get.mockResolvedValueOnce({ data: mockBlogData })
    api.put.mockResolvedValueOnce({ data: { success: true } })

    renderWithRouter(<DbEditBlog />)
    await waitFor(() => expect(api.get).toHaveBeenCalled())

    // Enter tags with spaces and empty values
    await userEvent.clear(byName('tags'))
    await userEvent.type(byName('tags'), 'tag1,  tag2  , , tag3,  ')

    await userEvent.click(screen.getByRole('button', { name: /save changes/i }))

    await waitFor(() => expect(api.put).toHaveBeenCalledTimes(1))

    const [, payload] = api.put.mock.calls[0]
    expect(payload.tags).toEqual(['tag1', 'tag2', 'tag3'])
  })

  it('shows uploading state during image upload', async () => {
    api.get.mockResolvedValueOnce({ data: mockBlogData })
    
    // Create a promise that we can control
    let resolveUpload
    const uploadPromise = new Promise((resolve) => {
      resolveUpload = resolve
    })
    uploadImage.mockReturnValueOnce(uploadPromise)

    renderWithRouter(<DbEditBlog />)
    await waitFor(() => expect(api.get).toHaveBeenCalled())

    const file = new File(['test content'], 'test-image.jpg', { type: 'image/jpeg' })
    const fileInput = screen.getByTestId('file-input')

    await userEvent.upload(fileInput, file)

    // Should show uploading state
    expect(screen.getByText('Uploading...')).toBeInTheDocument()

    // Resolve the upload
    resolveUpload('https://example.com/uploaded-image.jpg')

    await waitFor(() => {
      expect(screen.queryByText('Uploading...')).not.toBeInTheDocument()
    })
  })

  it('navigates back after successful update', async () => {
    api.get.mockResolvedValueOnce({ data: mockBlogData })
    api.put.mockResolvedValueOnce({ data: { success: true } })

    renderWithRouter(<DbEditBlog />)
    await waitFor(() => expect(api.get).toHaveBeenCalled())

    await userEvent.click(screen.getByRole('button', { name: /save changes/i }))

    await waitFor(() => {
      expect(screen.getByText(/Blog updated successfully/i)).toBeInTheDocument()
    })

    // Wait for navigation timeout (2 seconds in your component)
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/admin/blogs')
    }, { timeout: 3000 })
  })

  it('cancel button navigates to blogs list', async () => {
    api.get.mockResolvedValueOnce({ data: mockBlogData })

    renderWithRouter(<DbEditBlog />)
    await waitFor(() => expect(api.get).toHaveBeenCalled())

    const cancelButton = screen.getByText('Cancel')
    await userEvent.click(cancelButton)

    expect(mockNavigate).toHaveBeenCalledWith('/admin/blogs')
  })
})
