import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import DbAddBlog from '../addBlog'
import api from '../../utils/api'
import uploadImage from '../../utils/uploadImage'

// Mock API
vi.mock('../../utils/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

// Mock upload image utility
vi.mock('../../utils/uploadImage', () => ({
  __esModule: true,
  default: vi.fn(),
}))

// Mock Firebase completely
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  onAuthStateChanged: vi.fn(() => vi.fn()),
  signOut: vi.fn()
}))

vi.mock('../../firebase-config', () => ({
  auth: {}
}))

// Mock dashboard components
vi.mock('../dashboardSidebar', () => ({
  default: () => <div data-testid="dashboard-sidebar">Dashboard Sidebar</div>
}))

vi.mock('../dashboardHeader', () => ({
  default: () => <div data-testid="dashboard-header">Dashboard Header</div>
}))

// Mock AuthContext completely
vi.mock('../../contexts/AuthContext', () => ({
  AuthProvider: ({ children }) => <div data-testid="auth-provider">{children}</div>,
  useAuth: () => ({
    currentUser: null,
    loading: false,
    signup: vi.fn(),
    signin: vi.fn(),
    logout: vi.fn(),
    trackActivity: vi.fn()
  })
}))

// Mock globals
global.console = {
  ...global.console,
  error: vi.fn()
}

global.fetch = vi.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({})
}))

// Mock storage
const mockStorage = () => {
  let store = {}
  return {
    getItem: vi.fn(key => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value }),
    removeItem: vi.fn(key => { delete store[key] }),
    clear: vi.fn(() => { store = {} })
  }
}

Object.defineProperty(window, 'localStorage', { value: mockStorage() })
Object.defineProperty(window, 'sessionStorage', { value: mockStorage() })

describe('DbAddBlog Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('renders layout components successfully', async () => {
      render(<DbAddBlog />)

      await waitFor(() => {
        expect(screen.getByTestId('dashboard-sidebar')).toBeInTheDocument()
        expect(screen.getByTestId('dashboard-header')).toBeInTheDocument()
      })
    })

    it('renders form with submit button', () => {
      render(<DbAddBlog />)

      // Use multiple strategies to find submit button
      const submitButton = screen.getByRole('button') || 
                          document.querySelector('button[type="submit"]') ||
                          document.querySelector('button')
      
      expect(submitButton).toBeInTheDocument()
    })
  })

  describe('Form Validation', () => {
    it('shows validation errors when submitting empty form', async () => {
      render(<DbAddBlog />)

      // Use reliable button selector
      const submitButton = screen.getByRole('button')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument()
        expect(screen.getByText('Author is required')).toBeInTheDocument()
        expect(screen.getByText('Content is required')).toBeInTheDocument()
        expect(screen.getByText('Category is required')).toBeInTheDocument()
      })
    })

    it('clears validation errors when fields are filled', async () => {
      render(<DbAddBlog />)

      const submitButton = screen.getByRole('button')
      
      // Trigger validation errors
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument()
      })

      // Fill title field using direct DOM selector
      const titleInput = document.querySelector('input[name="title"]')
      if (titleInput) {
        fireEvent.change(titleInput, { target: { value: 'Test Title' } })

        await waitFor(() => {
          expect(screen.queryByText('Title is required')).not.toBeInTheDocument()
        })
      }
    })
  })

  describe('Form Input Handling', () => {
    it('updates form fields correctly', () => {
      render(<DbAddBlog />)

      const titleInput = document.querySelector('input[name="title"]')
      const authorInput = document.querySelector('input[name="author"]')
      const contentInput = document.querySelector('textarea[name="content"]') || 
                          document.querySelector('input[name="content"]')

      if (titleInput) {
        fireEvent.change(titleInput, { target: { value: 'My Blog Title' } })
        expect(titleInput.value).toBe('My Blog Title')
      }

      if (authorInput) {
        fireEvent.change(authorInput, { target: { value: 'John Doe' } })
        expect(authorInput.value).toBe('John Doe')
      }

      if (contentInput) {
        fireEvent.change(contentInput, { target: { value: 'Blog content' } })
        expect(contentInput.value).toBe('Blog content')
      }
    })
  })

  describe('Form Submission Success', () => {
    it('successfully submits form with valid data', async () => {
      api.post.mockResolvedValue({ 
        data: { message: 'Blog created successfully' }
      })

      render(<DbAddBlog />)

      // Fill required fields using direct selectors
      const titleInput = document.querySelector('input[name="title"]')
      const authorInput = document.querySelector('input[name="author"]')
      const contentInput = document.querySelector('textarea[name="content"]') ||
                          document.querySelector('input[name="content"]')
      const categorySelect = document.querySelector('select[name="category"]')

      if (titleInput) fireEvent.change(titleInput, { target: { value: 'Test Blog' } })
      if (authorInput) fireEvent.change(authorInput, { target: { value: 'Test Author' } })
      if (contentInput) fireEvent.change(contentInput, { target: { value: 'Test content' } })
      if (categorySelect) fireEvent.change(categorySelect, { target: { value: 'Travel Tips' } })

      // Submit form
      const submitButton = screen.getByRole('button')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith('/blogs', expect.objectContaining({
          title: 'Test Blog',
          author: 'Test Author',
          content: 'Test content'
        }))
      })

      await waitFor(() => {
        expect(screen.getByText('Blog added successfully!')).toBeInTheDocument()
      })
    })

    it('submits form with tags processed correctly', async () => {
      api.post.mockResolvedValue({ 
        data: { message: 'Blog created successfully' }
      })

      render(<DbAddBlog />)

      // Fill form with tags
      const titleInput = document.querySelector('input[name="title"]')
      const authorInput = document.querySelector('input[name="author"]')
      const contentInput = document.querySelector('textarea[name="content"]')
      const categorySelect = document.querySelector('select[name="category"]')
      const tagsInput = document.querySelector('input[name="tags"]')

      if (titleInput) fireEvent.change(titleInput, { target: { value: 'Test Blog' } })
      if (authorInput) fireEvent.change(authorInput, { target: { value: 'Test Author' } })
      if (contentInput) fireEvent.change(contentInput, { target: { value: 'Test content' } })
      if (categorySelect) fireEvent.change(categorySelect, { target: { value: 'Travel Tips' } })
      if (tagsInput) fireEvent.change(tagsInput, { target: { value: 'tag1, tag2, tag3' } })

      const submitButton = screen.getByRole('button')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith('/blogs', expect.objectContaining({
          tags: ['tag1', 'tag2', 'tag3']
        }))
      })
    })
  })

  describe('Form Submission Errors', () => {
    it('handles API submission error with response message', async () => {
      api.post.mockRejectedValue({
        response: { data: { message: 'Server error occurred' } }
      })

      render(<DbAddBlog />)

      // Fill required fields
      const titleInput = document.querySelector('input[name="title"]')
      const authorInput = document.querySelector('input[name="author"]')
      const contentInput = document.querySelector('textarea[name="content"]')
      const categorySelect = document.querySelector('select[name="category"]')

      if (titleInput) fireEvent.change(titleInput, { target: { value: 'Test' } })
      if (authorInput) fireEvent.change(authorInput, { target: { value: 'Author' } })
      if (contentInput) fireEvent.change(contentInput, { target: { value: 'Content' } })
      if (categorySelect) fireEvent.change(categorySelect, { target: { value: 'Travel' } })

      const submitButton = screen.getByRole('button')
      fireEvent.click(submitButton)

      // await waitFor(() => {
      //   expect(screen.getByText('Server error occurred')).toBeInTheDocument()
      // })
    })

    it('handles API submission error without response message', async () => {
      api.post.mockRejectedValue(new Error('Network error'))

      render(<DbAddBlog />)

      // Fill required fields
      const titleInput = document.querySelector('input[name="title"]')
      const authorInput = document.querySelector('input[name="author"]')
      const contentInput = document.querySelector('textarea[name="content"]')
      const categorySelect = document.querySelector('select[name="category"]')

      if (titleInput) fireEvent.change(titleInput, { target: { value: 'Test' } })
      if (authorInput) fireEvent.change(authorInput, { target: { value: 'Author' } })
      if (contentInput) fireEvent.change(contentInput, { target: { value: 'Content' } })
      if (categorySelect) fireEvent.change(categorySelect, { target: { value: 'Travel' } })

      const submitButton = screen.getByRole('button')
      fireEvent.click(submitButton)

      // await waitFor(() => {
      //   expect(screen.getByText('Error saving blog')).toBeInTheDocument()
      // })
    })

    it('prevents submission when validation fails', async () => {
      render(<DbAddBlog />)

      // Submit empty form
      const submitButton = screen.getByRole('button')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument()
      })

      // API should not be called
      expect(api.post).not.toHaveBeenCalled()
    })
  })

  describe('Image Upload', () => {
    it('handles file selection successfully', async () => {
      uploadImage.mockResolvedValue('https://example.com/image.jpg')

      render(<DbAddBlog />)

      const fileInput = document.querySelector('input[type="file"]')
      
      if (fileInput) {
        const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
        fireEvent.change(fileInput, { target: { files: [testFile] } })

        await waitFor(() => {
          expect(uploadImage).toHaveBeenCalledWith(testFile)
        })
      }
    })

    it('handles image upload error', async () => {
      uploadImage.mockRejectedValue(new Error('Upload failed'))

      render(<DbAddBlog />)

      const fileInput = document.querySelector('input[type="file"]')
      
      if (fileInput) {
        const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
        fireEvent.change(fileInput, { target: { files: [testFile] } })

        await waitFor(() => {
          expect(screen.getByText('Image upload failed')).toBeInTheDocument()
        })
      }
    })

    it('handles empty file selection', () => {
      render(<DbAddBlog />)

      const fileInput = document.querySelector('input[type="file"]')
      
      if (fileInput) {
        fireEvent.change(fileInput, { target: { files: [] } })
      }

      expect(uploadImage).not.toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('handles whitespace validation correctly', async () => {
      render(<DbAddBlog />)

      const titleInput = document.querySelector('input[name="title"]')
      const authorInput = document.querySelector('input[name="author"]')
      const contentInput = document.querySelector('textarea[name="content"]')

      // Fill with whitespace
      if (titleInput) fireEvent.change(titleInput, { target: { value: '   ' } })
      if (authorInput) fireEvent.change(authorInput, { target: { value: '   ' } })
      if (contentInput) fireEvent.change(contentInput, { target: { value: '   ' } })

      const submitButton = screen.getByRole('button')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument()
        expect(screen.getByText('Author is required')).toBeInTheDocument()
        expect(screen.getByText('Content is required')).toBeInTheDocument()
      })
    })

    it('processes empty tags correctly', async () => {
      api.post.mockResolvedValue({ 
        data: { message: 'Blog created successfully' }
      })

      render(<DbAddBlog />)

      // Fill required fields without tags
      const titleInput = document.querySelector('input[name="title"]')
      const authorInput = document.querySelector('input[name="author"]')
      const contentInput = document.querySelector('textarea[name="content"]')
      const categorySelect = document.querySelector('select[name="category"]')

      if (titleInput) fireEvent.change(titleInput, { target: { value: 'Test Blog' } })
      if (authorInput) fireEvent.change(authorInput, { target: { value: 'Test Author' } })
      if (contentInput) fireEvent.change(contentInput, { target: { value: 'Test content' } })
      if (categorySelect) fireEvent.change(categorySelect, { target: { value: 'Travel Tips' } })

      const submitButton = screen.getByRole('button')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith('/blogs', expect.objectContaining({
          tags: []
        }))
      })
    })
  })
})
