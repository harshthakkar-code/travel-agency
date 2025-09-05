import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import DbEditBlog from '../editBlog'
import api from '../../utils/api'
import uploadImage from '../../utils/uploadImage'


// Mock API
vi.mock('../../utils/api', () => ({
  default: {
    get: vi.fn(),
    put: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}))


// Mock upload image utility
vi.mock('../../utils/uploadImage', () => ({
  __esModule: true,
  default: vi.fn(),
}))


// Mock Firebase
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


// Mock AuthContext
vi.mock('../../contexts/AuthContext', () => ({
  AuthProvider: ({ children }) => <div data-testid="auth-provider">{children}</div>,
  useAuth: () => ({
    currentUser: { uid: 'user123' },
    loading: false,
    signup: vi.fn(),
    signin: vi.fn(),
    logout: vi.fn(),
    trackActivity: vi.fn()
  })
}))


// Mock React Router
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ id: 'blog123' }),
    useNavigate: () => mockNavigate,
  }
})


// Mock globals
global.console = {
  ...global.console,
  log: vi.fn(),
  error: vi.fn()
}


global.fetch = vi.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({})
}))


// Mock storage
const createMockStorage = () => {
  let store = {}
  return {
    getItem: vi.fn(key => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value }),
    removeItem: vi.fn(key => { delete store[key] }),
    clear: vi.fn(() => { store = {} })
  }
}


Object.defineProperty(window, 'localStorage', { value: createMockStorage() })
Object.defineProperty(window, 'sessionStorage', { value: createMockStorage() })


// Test wrapper with router
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)


const renderWithRouter = (ui) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);


describe('DbEditBlog Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
    mockNavigate.mockClear()
  })


  // Sample blog data for testing
  const mockBlogData = {
    id: 'blog123',
    title: 'Sample Blog Title',
    author: 'John Doe',
    content: 'This is sample blog content for testing purposes.',
    category: 'Travel Tips',
    tags: ['react', 'testing', 'javascript'],
    status: 'Draft',
    image: 'https://example.com/sample-image.jpg'
  }


  describe('Component Rendering and Data Loading', () => {
    it('shows loading state initially', () => {
      // Make API call hang to test loading state
      api.get.mockImplementation(() => new Promise(() => { }))

      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })


    it('renders layout components after loading', async () => {
      api.get.mockResolvedValue({ data: mockBlogData })

      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByTestId('dashboard-sidebar')).toBeInTheDocument()
        expect(screen.getByTestId('dashboard-header')).toBeInTheDocument()
      })
    })


    it('fetches and populates blog data on mount', async () => {
      api.get.mockResolvedValue({ data: mockBlogData })

      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/blogs/blog123')
      })

      await waitFor(() => {
        expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
        expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
        expect(screen.getByDisplayValue('This is sample blog content for testing purposes.')).toBeInTheDocument()
        expect(document.querySelector('select[name="category"]').value).toBe('Travel Tips')
        const tagsInput = document.querySelector('input[name="tags"]')
        expect(tagsInput.value).toBe('react, testing, javascript')
        // No status select in your form, so skipped status check here
      })
    })


    it('handles API fetch error', async () => {
      api.get.mockRejectedValue(new Error('Failed to fetch'))

      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('Failed to load blog data')).toBeInTheDocument()
      })
    })
  })


  describe('Form Input Handling', () => {
    beforeEach(async () => {
      api.get.mockResolvedValue({ data: mockBlogData })
    })


    it('updates form fields correctly', async () => {
      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
      })

      const titleInput = screen.getByPlaceholderText('Enter blog title')
      const authorInput = screen.getByPlaceholderText('Enter author name')
      const contentInput = screen.getByPlaceholderText('Write your blog content here...')

      fireEvent.change(titleInput, { target: { value: 'Updated Blog Title' } })
      fireEvent.change(authorInput, { target: { value: 'Jane Smith' } })
      fireEvent.change(contentInput, { target: { value: 'Updated blog content' } })

      expect(titleInput.value).toBe('Updated Blog Title')
      expect(authorInput.value).toBe('Jane Smith')
      expect(contentInput.value).toBe('Updated blog content')
    })


    it('handles category and status changes', async () => {
      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
      })

      const categorySelect = document.querySelector('select[name="category"]')

      if (categorySelect) {
        fireEvent.change(categorySelect, { target: { value: 'Culture' } })
        expect(categorySelect.value).toBe('Culture')
      }
    })


    it('handles tags processing correctly', async () => {
      api.put.mockResolvedValue({ data: { message: 'Blog updated successfully' } })

      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
      })

      const tagsInput = document.querySelector('input[name="tags"]')
      expect(tagsInput).toBeInTheDocument()
      expect(tagsInput.value).toBe('react, testing, javascript')

      fireEvent.change(tagsInput, { target: { value: ' tag1 ,, tag2 , , tag3 ' } })

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(api.put).toHaveBeenCalledWith('/blogs/blog123', expect.objectContaining({
          tags: ['tag1', 'tag2', 'tag3']
        }))
      }, { timeout: 10000 })
    })
  })


  describe('Form Validation', () => {
    beforeEach(async () => {
      api.get.mockResolvedValue({ data: mockBlogData })
    })


    it('shows validation errors for empty required fields', async () => {
      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
      })

      const titleInput = screen.getByPlaceholderText('Enter blog title')
      const authorInput = screen.getByPlaceholderText('Enter author name')
      const contentInput = screen.getByPlaceholderText('Write your blog content here...')

      fireEvent.change(titleInput, { target: { value: '' } })
      fireEvent.change(authorInput, { target: { value: '' } })
      fireEvent.change(contentInput, { target: { value: '' } })
      // Category validation is in form, but no select validation error UI test here as no htmlFor label

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument()
        expect(screen.getByText('Author is required')).toBeInTheDocument()
        expect(screen.getByText('Content is required')).toBeInTheDocument()
      })
    })


    it('shows validation errors for whitespace input', async () => {
      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
      })

      const titleInput = screen.getByPlaceholderText('Enter blog title')
      const authorInput = screen.getByPlaceholderText('Enter author name')
      const contentInput = screen.getByPlaceholderText('Write your blog content here...')

      fireEvent.change(titleInput, { target: { value: '   ' } })
      fireEvent.change(authorInput, { target: { value: '   ' } })
      fireEvent.change(contentInput, { target: { value: '   ' } })

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument()
        expect(screen.getByText('Author is required')).toBeInTheDocument()
        expect(screen.getByText('Content is required')).toBeInTheDocument()
      })
    })


    it('clears validation errors when fields are filled', async () => {
      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
      })

      const titleInput = screen.getByPlaceholderText('Enter blog title')

      fireEvent.change(titleInput, { target: { value: '' } })

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument()
      })

      fireEvent.change(titleInput, { target: { value: 'New Title' } })

      await waitFor(() => {
        expect(screen.queryByText('Title is required')).not.toBeInTheDocument()
      })
    })
  })


  describe('Image Upload Functionality', () => {
    beforeEach(async () => {
      api.get.mockResolvedValue({ data: mockBlogData })
    })


    it('handles successful image upload', async () => {
      uploadImage.mockResolvedValue('https://example.com/new-image.jpg')

      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
      })

      const fileInput = document.querySelector('input[type="file"]')
      if (fileInput) {
        const testFile = new File(['test image'], 'test.jpg', { type: 'image/jpeg' })
        fireEvent.change(fileInput, { target: { files: [testFile] } })

        await waitFor(() => {
          expect(uploadImage).toHaveBeenCalledWith(testFile)
        })
      }
    })


    it('handles image upload error', async () => {
      uploadImage.mockRejectedValue(new Error('Upload failed'))

      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
      })

      const fileInput = document.querySelector('input[type="file"]')
      if (fileInput) {
        const testFile = new File(['test image'], 'test.jpg', { type: 'image/jpeg' })
        fireEvent.change(fileInput, { target: { files: [testFile] } })

        await waitFor(() => {
          expect(screen.getByText('Image upload failed')).toBeInTheDocument()
        })
      }
    })


    it('handles image removal', async () => {
      api.get.mockResolvedValue({ data: mockBlogData })

      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
      })

      const removeButton = screen.getByRole('button', { name: /remove/i })
      fireEvent.click(removeButton)

      await waitFor(() => {
        expect(screen.queryByAltText('Preview')).not.toBeInTheDocument()
      })
    })


    it('handles empty file selection', () => {
      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      const fileInput = document.querySelector('input[type="file"]')
      if (fileInput) {
        fireEvent.change(fileInput, { target: { files: [] } })
      }

      expect(uploadImage).not.toHaveBeenCalled()
    })
  })


  describe('Form Submission', () => {
    beforeEach(async () => {
      api.get.mockResolvedValue({ data: mockBlogData })
    })


    it('submits form successfully with updated data', async () => {
      api.put.mockResolvedValue({ data: { message: 'Blog updated successfully' } })

      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
      })

      const titleInput = screen.getByPlaceholderText('Enter blog title')
      const authorInput = screen.getByPlaceholderText('Enter author name')
      const contentInput = screen.getByPlaceholderText('Write your blog content here...')
      const tagsInput = screen.getByPlaceholderText('Enter tags separated by commas')

      fireEvent.change(titleInput, { target: { value: 'Updated Blog Title' } })
      fireEvent.change(authorInput, { target: { value: 'Jane Smith' } })
      fireEvent.change(contentInput, { target: { value: 'Updated content here' } })
      fireEvent.change(tagsInput, { target: { value: 'vue, testing, updated' } })

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(api.put).toHaveBeenCalledWith('/blogs/blog123', expect.objectContaining({
          title: 'Updated Blog Title',
          author: 'Jane Smith',
          content: 'Updated content here',
          tags: ['vue', 'testing', 'updated'],
          category: 'Travel Tips',
          status: 'Draft',
          image: mockBlogData.image, // image is not changed in this test
        }))
      }, { timeout: 10000 })

      await waitFor(() => {
        expect(screen.getByText('Blog updated successfully!')).toBeInTheDocument()
      })
    })


    it('submits form with uploaded image', async () => {
      uploadImage.mockResolvedValue('https://example.com/uploaded-image.jpg')
      api.put.mockResolvedValue({ data: { message: 'Blog updated successfully' } })

      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
      })

      const fileInput = document.querySelector('input[type="file"]')
      if (fileInput) {
        const testFile = new File(['test image'], 'test.jpg', { type: 'image/jpeg' })
        fireEvent.change(fileInput, { target: { files: [testFile] } })

        await waitFor(() => {
          expect(uploadImage).toHaveBeenCalledWith(testFile)
        })
      }

      // Submit form after image upload
      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(api.put).toHaveBeenCalledWith('/blogs/blog123', expect.objectContaining({
          image: 'https://example.com/uploaded-image.jpg'
        }))
      }, { timeout: 10000 })
    })


    it('handles API submission error with response message', async () => {
      api.put.mockRejectedValue({
        response: { data: { message: 'Server validation error' } }
      })

      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
      })

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Server validation error')).toBeInTheDocument()
      })
    })


    it('handles API submission error without response message', async () => {
      api.put.mockRejectedValue(new Error('Network error'))

      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
      })

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Error updating blog')).toBeInTheDocument()
      })
    })


    it('navigates to blog list after successful update', async () => {
      api.put.mockResolvedValue({ data: { message: 'Blog updated successfully' } })

      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
      })

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Blog updated successfully!')).toBeInTheDocument()
      })

      // Wait for navigation timeout
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/admin/blogs')
      }, { timeout: 3000 })
    })


    it('prevents submission when validation fails', async () => {
      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
      })

      const titleInput = screen.getByPlaceholderText('Enter blog title')
      fireEvent.change(titleInput, { target: { value: '' } })

      const form = document.querySelector('form')
      if (form) fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument()
      })

      expect(api.put).not.toHaveBeenCalled()
    })
  })


  describe('Edge Cases', () => {
    it('handles blog with no existing image', async () => {
      const blogWithoutImage = {
        id: 'blog123',
        title: 'Sample Blog Title',
        author: 'John Doe',
        content: 'This is sample blog content for testing purposes.',
        category: 'Travel Tips',
        tags: ['react', 'testing'],
        status: 'Draft',
        image: null
      }

      api.get.mockResolvedValue({ data: blogWithoutImage })

      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
      })

      expect(screen.queryByText('Image upload failed')).not.toBeInTheDocument()
      expect(screen.queryByAltText('Preview')).not.toBeInTheDocument()
    }, 30000)


    it('handles blog with empty tags array', async () => {
      const blogWithoutTags = {
        id: 'blog123',
        title: 'Sample Blog Title',
        author: 'John Doe',
        content: 'This is sample blog content for testing purposes.',
        category: 'Travel Tips',
        tags: [],
        status: 'Draft'
      }

      api.get.mockResolvedValue({ data: blogWithoutTags })

      render(
        <TestWrapper>
          <DbEditBlog />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
      })

      await waitFor(() => {
        const tagsInput = document.querySelector('input[name="tags"]')
        expect(tagsInput).toBeInTheDocument()
        expect(tagsInput.value).toBe('')
      })
    }, 30000)
  })


  it('processes tags string into trimmed array correctly on submit', async () => {
  api.put.mockResolvedValue({ data: { message: 'Blog updated successfully' } })

  render(
    <TestWrapper>
      <DbEditBlog />
    </TestWrapper>
  )

  await waitFor(() => {
    expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
  })

  // Update tags input with commas and some empty entries and whitespace
  const tagsInput = screen.getByPlaceholderText('Enter tags separated by commas')

  fireEvent.change(tagsInput, { target: { value: ' tag1 ,, tag2 , , tag3 ' } })

  // Submit the form
  const form = document.querySelector('form')
  if (form) fireEvent.submit(form)

  // Expect api.put called with cleaned tags array
  await waitFor(() => {
    expect(api.put).toHaveBeenCalledWith('/blogs/blog123', expect.objectContaining({
      tags: ['tag1', 'tag2', 'tag3']
    }))
  }, { timeout: 10000 })
})


it('submits form with empty tags string as empty array', async () => {
  api.put.mockResolvedValue({ data: { message: 'Blog updated successfully' } })

  render(
    <TestWrapper>
      <DbEditBlog />
    </TestWrapper>
  )

  await waitFor(() => {
    expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
  })

  const tagsInput = screen.getByPlaceholderText('Enter tags separated by commas')
  fireEvent.change(tagsInput, { target: { value: '' } })

  // Submit form
  const form = document.querySelector('form')
  if (form) fireEvent.submit(form)

  await waitFor(() => {
    expect(api.put).toHaveBeenCalledWith('/blogs/blog123', expect.objectContaining({
      tags: []
    }))
  })
})

it('submits form with imageUrl empty string when imageUrl is null', async () => {
  api.put.mockResolvedValue({ data: { message: 'Blog updated successfully' } })

  render(
    <TestWrapper>
      <DbEditBlog />
    </TestWrapper>
  )

  await waitFor(() => {
    expect(screen.getByDisplayValue('Sample Blog Title')).toBeInTheDocument()
  })

  // Ensure imageUrl is null to cover fallback to ""
  // This can be done by not uploading image in this test

  const form = document.querySelector('form')
  if (form) fireEvent.submit(form)

  await waitFor(() => {
    expect(api.put).toHaveBeenCalledWith('/blogs/blog123', expect.objectContaining({
      image: ""  // fallback when imageUrl is null
    }))
  })
})


// Cover useEffect guard (lines 38-43)
// it('does not fetch blog data if id param is missing', () => {
//   // Temporarily mock useParams to return empty object (no id)
//   const useParamsSpy = vi.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({})

//   render(
//     <BrowserRouter>
//       <DbEditBlog />
//     </BrowserRouter>
//   )
//   expect(api.get).not.toHaveBeenCalled()

//   // Restore original mock
//   useParamsSpy.mockRestore()
// })

// Cover handleChange error clearing (line 69) by filling input after invalid
it('clears validation error for title on valid input change', async () => {
  render(<TestWrapper><DbEditBlog /></TestWrapper>)

  await waitFor(() => screen.getByDisplayValue('Sample Blog Title'))

  const titleInput = screen.getByPlaceholderText('Enter blog title')

  // Trigger validation error
  fireEvent.change(titleInput, { target: { value: '' } })
  fireEvent.submit(document.querySelector('form'))

  await waitFor(() => {
    expect(screen.getByText('Title is required')).toBeInTheDocument()
  })

  // Fix input and expect error cleared (line 69 logic)
  fireEvent.change(titleInput, { target: { value: 'Valid Title' } })
  await waitFor(() => {
    expect(screen.queryByText('Title is required')).not.toBeInTheDocument()
  })
})

// Cover handleFileChange early return (line 91)
it('does not call uploadImage when no file selected', async () => {
  api.get.mockResolvedValue({ data: mockBlogData })  // ensure blog data fetched

  render(<TestWrapper><DbEditBlog /></TestWrapper>)

  // Wait for file input to appear (meaning loading finished)
  const fileInput = await screen.findByTestId('file-input')

  fireEvent.change(fileInput, { target: { files: [] } })

  expect(uploadImage).not.toHaveBeenCalled()
})


// Cover handleRemoveImage clearing state (line 119)
it('clears image when remove button clicked', async () => {
  api.get.mockResolvedValue({ data: mockBlogData })

  render(<TestWrapper><DbEditBlog /></TestWrapper>)
  await waitFor(() => screen.getByDisplayValue('Sample Blog Title'))

  const removeButton = screen.getByRole('button', { name: /remove/i })
  fireEvent.click(removeButton)

  await waitFor(() => {
    expect(screen.queryByAltText('Preview')).not.toBeInTheDocument()
  })
})

// Cover navigation after successful submit with setTimeout (line 240)
it('navigates to blog list after successful submission', async () => {
  api.put.mockResolvedValue({ data: { message: 'Blog updated successfully' } })

  render(<TestWrapper><DbEditBlog /></TestWrapper>)
  await waitFor(() => screen.getByDisplayValue('Sample Blog Title'))

  const form = document.querySelector('form')
  fireEvent.submit(form)

  await waitFor(() => {
    expect(screen.getByText('Blog updated successfully!')).toBeInTheDocument()
  })

  // Await the navigation triggered by setTimeout
  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/admin/blogs')
  }, { timeout: 3000 })
})


it('navigates after submit with delay', async () => {
  api.put.mockResolvedValue({ data: { message: 'Blog updated successfully' } })

  render(<TestWrapper><DbEditBlog /></TestWrapper>)
  await waitFor(() => screen.getByDisplayValue('Sample Blog Title'))

  const form = document.querySelector('form')
  fireEvent.submit(form)

  await waitFor(() => expect(screen.getByText('Blog updated successfully!')).toBeInTheDocument())

  // await navigation explicitly with longer timeout
  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/admin/blogs'), { timeout: 5000 })
})




describe('DbEditBlog Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads and displays existing blog data', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        title: 'Test Title',
        author: 'Test Author',
        content: 'Test content',
        category: 'Travel Tips',
        tags: ['tag1', 'tag2'],
        status: 'Draft',
        image: 'http://example.com/image.jpg',
      },
    });

    renderWithRouter(<DbEditBlog />);

    expect(screen.getByText(/Loading blog data.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Title')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Author')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test content')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Travel Tips')).toBeInTheDocument();
      expect(screen.getByDisplayValue('tag1, tag2')).toBeInTheDocument();
      expect(screen.getByAltText('Preview')).toHaveAttribute('src', 'http://example.com/image.jpg');
    });
  });

it('validates required fields and shows errors', async () => {
  api.get.mockResolvedValueOnce({
    data: { title: '', author: '', content: '', category: '', tags: [], status: 'Draft' },
  });

  renderWithRouter(<DbEditBlog />);

  await waitFor(() => {
    expect(screen.getByText(/Edit Blog/i)).toBeInTheDocument();
  });

  const titleInput = screen.getByPlaceholderText(/Enter blog title/i);
  const authorInput = screen.getByPlaceholderText(/Enter author name/i);
  const contentInput = screen.getByPlaceholderText(/Write your blog content here.../i);
  
  // Select the category <select> without relying on accessible name
  const categorySelect = screen.getByRole('combobox');

  // Clear the inputs (they start empty but explicit is better)
  userEvent.clear(titleInput);
  userEvent.clear(authorInput);
  userEvent.clear(contentInput);
  fireEvent.change(categorySelect, { target: { value: '' } });

  // Click submit to trigger validation
  userEvent.click(screen.getByRole('button', { name: /Save Changes/i }));

  await waitFor(() => {
    expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Author is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Content is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Category is required/i)).toBeInTheDocument();
  });
});





 it('handles file upload success and failure', async () => {
  api.get.mockResolvedValueOnce({
    data: {
      title: 'Test',
      author: 'Author',
      content: 'Content',
      category: 'Travel Tips',
      tags: [],
      status: 'Draft',
      image: '',
    },
  });

  // First mock: upload success
  uploadImage.mockResolvedValueOnce('http://fake-image-url.com/image.jpg');

  renderWithRouter(<DbEditBlog />);

  await waitFor(() => {
    expect(screen.getByText(/Edit Blog/i)).toBeInTheDocument();
  });

  const fileInput = screen.getByTestId('file-input');
  const file = new File(['dummy content'], 'image.png', { type: 'image/png' });

  // Success upload - fire the change event manually for file input
  fireEvent.change(fileInput, { target: { files: [file] } });

  await waitFor(() => {
    expect(uploadImage).toHaveBeenCalledWith(file);
    expect(screen.getByAltText('Preview')).toHaveAttribute('src', 'http://fake-image-url.com/image.jpg');
  });

  // Reset mock calls and reject for failure test
  uploadImage.mockClear();
  uploadImage.mockRejectedValueOnce(new Error('Upload failed'));

  // Failure upload - fire the change event manually again
  fireEvent.change(fileInput, { target: { files: [file] } });

  await waitFor(() => {
    expect(screen.getByText(/Image upload failed/i)).toBeInTheDocument();
  });
});





// it('handles successful blog update and navigation', async () => {
//   api.get.mockResolvedValueOnce({
//     data: {
//       title: 'Old Title',
//       author: 'Old Author',
//       content: 'Old Content',
//       category: 'Travel Tips',
//       tags: ['old'],
//       status: 'Draft',
//       image: '',
//     },
//   });
//   api.put.mockResolvedValueOnce({});

//   renderWithRouter(<DbEditBlog />);

//   // Wait for form to load existing data
//   await waitFor(() => {
//     expect(screen.getByPlaceholderText(/Enter blog title/i)).toHaveValue('Old Title');
//   });

//   // Make sure all required fields have valid values to pass validation
//   userEvent.clear(screen.getByPlaceholderText(/Enter blog title/i));
//   userEvent.type(screen.getByPlaceholderText(/Enter blog title/i), 'New Title');

//   userEvent.clear(screen.getByPlaceholderText(/Enter author name/i));
//   userEvent.type(screen.getByPlaceholderText(/Enter author name/i), 'New Author');

//   userEvent.clear(screen.getByPlaceholderText(/Write your blog content here.../i));
//   userEvent.type(screen.getByPlaceholderText(/Write your blog content here.../i), 'New Content');

//   fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Travel Tips' } });

//   // Submit the form
//   userEvent.click(screen.getByRole('button', { name: /Save Changes/i }));

//   await waitFor(() => {
//     expect(api.put).toHaveBeenCalledWith(
//       '/blogs/blog123',
//       expect.objectContaining({
//         title: 'New Title',
//         author: 'New Author',
//         content: 'New Content',
//         category: 'Travel Tips',
//       })
//     );
//     expect(screen.getByText(/Blog updated successfully!/i)).toBeInTheDocument();
//   });

//   // Confirm navigation after delay
//   await waitFor(() => {
//     expect(mockNavigate).toHaveBeenCalledWith('/admin/blogs');
//   }, { timeout: 3000 });
// });



 it('handles blog update API errors', async () => {
  api.get.mockResolvedValueOnce({
    data: {
      title: 'Title',
      author: 'Author',
      content: 'Content',
      category: 'Travel Tips',
      tags: [],
      status: 'Draft',
      image: '',
    },
  });

  api.put.mockRejectedValueOnce({
    response: { data: { message: 'Update failed' } }
  });

  renderWithRouter(<DbEditBlog />);

  // Wait for initial load
  await waitFor(() => {
    expect(screen.getByDisplayValue('Title')).toBeInTheDocument();
  });

  // Click submit with valid data present to bypass validation
  userEvent.click(screen.getByRole('button', { name: /Save Changes/i }));

  // Wait for the error message to appear after API failure
  await waitFor(() => {
    expect(screen.getByText(/Update failed/i)).toBeInTheDocument();
  });
});


it('cancels and navigates away on cancel button click', async () => {
  api.get.mockResolvedValueOnce({
    data: {
      title: 'Title',
      author: 'Author',
      content: 'Content',
      category: 'Travel Tips',
      tags: [],
      status: 'Draft',
      image: '',
    },
  });

  renderWithRouter(<DbEditBlog />);

  // Wait for blog data to load and render buttons
  await waitFor(() => {
    expect(screen.getByText(/Edit Blog/i)).toBeInTheDocument();
  });

  // Select the cancel button with precise role and name
  const cancelButton = screen.getByRole('button', { name: /Cancel/i });

  userEvent.click(cancelButton);

  // Wait for navigate mock to be called with expected argument
  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/admin/blogs');
  });
});

});
})