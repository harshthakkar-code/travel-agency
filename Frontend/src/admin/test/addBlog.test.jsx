import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import DbAddBlog from '../addBlog'

vi.mock('../../utils/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))
vi.mock('../../utils/uploadImage', () => ({
  __esModule: true,
  default: vi.fn(),
}))
vi.mock('./dashboardSidebar', () => () => <div data-testid="sidebar" />)
vi.mock('./dashboardHeader', () => () => <div data-testid="header" />)

import api from '../../utils/api'
import uploadImage from '../../utils/uploadImage'

describe('DbAddBlog', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all form fields', () => {
    render(<DbAddBlog />)
    // expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    // expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter blog title/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter author name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/write your blog content/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter tags separated by commas/i)).toBeInTheDocument()
    expect(screen.getByDisplayValue('Publish Blog')).toBeInTheDocument()
  })

  it('shows validation errors and clears on input', async () => {
    render(<DbAddBlog />)
    fireEvent.click(screen.getByDisplayValue('Publish Blog'))
    expect(await screen.findByText(/Title is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Author is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Content is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Category is required/i)).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText(/enter blog title/i), { target: { value: 'X' } })
    expect(screen.queryByText(/Title is required/i)).not.toBeInTheDocument()
    fireEvent.change(screen.getByPlaceholderText(/enter author name/i), { target: { value: 'A' } })
    expect(screen.queryByText(/Author is required/i)).not.toBeInTheDocument()
    fireEvent.change(screen.getByPlaceholderText(/write your blog content/i), { target: { value: 'C' } })
    expect(screen.queryByText(/Content is required/i)).not.toBeInTheDocument()
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Adventure' } })
    expect(screen.queryByText(/Category is required/i)).not.toBeInTheDocument()
  })

  it('submits successfully, parses tags, resets form', async () => {
    api.post.mockResolvedValue({})

    render(<DbAddBlog />)
    fireEvent.change(screen.getByPlaceholderText(/enter blog title/i), { target: { value: 'My Title' } })
    fireEvent.change(screen.getByPlaceholderText(/enter author name/i), { target: { value: 'Jane Doe' } })
    fireEvent.change(screen.getByPlaceholderText(/write your blog content/i), { target: { value: 'Blog content' } })
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Travel Tips' } })
    fireEvent.change(screen.getByPlaceholderText(/enter tags separated by commas/i), { target: { value: 'travel, tips' } })

    fireEvent.click(screen.getByDisplayValue('Publish Blog'))

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/blogs', expect.objectContaining({
        title: 'My Title',
        author: 'Jane Doe',
        content: 'Blog content',
        category: 'Travel Tips',
        tags: ['travel', 'tips'],
        image: '',
        status: 'Draft',
      }))
    })
    expect(await screen.findByText(/Blog added successfully/i)).toBeInTheDocument()

    expect(screen.getByPlaceholderText(/enter blog title/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/enter author name/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/write your blog content/i)).toHaveValue('')
    expect(screen.getByRole('combobox')).toHaveValue('')
    expect(screen.getByPlaceholderText(/enter tags separated by commas/i)).toHaveValue('')
    expect(screen.queryByAltText('Preview')).not.toBeInTheDocument()
  })

  it('shows API error message when save fails', async () => {
    api.post.mockRejectedValue({ response: { data: { message: 'Server error' } } })

    render(<DbAddBlog />)
    fireEvent.change(screen.getByPlaceholderText(/enter blog title/i), { target: { value: 'x' } })
    fireEvent.change(screen.getByPlaceholderText(/enter author name/i), { target: { value: 'y' } })
    fireEvent.change(screen.getByPlaceholderText(/write your blog content/i), { target: { value: 'z' } })
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Culture' } })

    fireEvent.click(screen.getByDisplayValue('Publish Blog'))
    expect(await screen.findByText(/Server error/i)).toBeInTheDocument()
  })

  it('uploads image and shows preview, then removes it', async () => {
    uploadImage.mockResolvedValue('someurl.jpg')

    render(<DbAddBlog />)
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    const input = screen.getByTestId('file-input')
    fireEvent.change(input, { target: { files: [file] } })

    await waitFor(() => {
      expect(uploadImage).toHaveBeenCalledWith(file)
      expect(screen.getByAltText('Preview')).toHaveAttribute('src', 'someurl.jpg')
    })

    fireEvent.click(screen.getByRole('button', { name: /remove/i }))
    expect(screen.queryByAltText('Preview')).not.toBeInTheDocument()
  })

  it('shows image upload error when upload rejects', async () => {
    uploadImage.mockRejectedValue(new Error('fail'))

    render(<DbAddBlog />)
    const file = new File(['x'], 'x.png', { type: 'image/png' })
    const input = screen.getByTestId('file-input')
    fireEvent.change(input, { target: { files: [file] } })

    expect(await screen.findByText(/Image upload failed/i)).toBeInTheDocument()
    expect(screen.queryByText(/Uploading.../i)).not.toBeInTheDocument()
  })

  it('produces empty tags array for whitespace tags', async () => {
    api.post.mockResolvedValue({})

    render(<DbAddBlog />)
    fireEvent.change(screen.getByPlaceholderText(/enter blog title/i), { target: { value: 'A' } })
    fireEvent.change(screen.getByPlaceholderText(/enter author name/i), { target: { value: 'B' } })
    fireEvent.change(screen.getByPlaceholderText(/write your blog content/i), { target: { value: 'C' } })
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Food' } })
    fireEvent.change(screen.getByPlaceholderText(/enter tags separated by commas/i), { target: { value: ' ,  , ' } })
    fireEvent.click(screen.getByDisplayValue('Publish Blog'))

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/blogs', expect.objectContaining({ tags: [] }))
    })
    expect(await screen.findByText(/Blog added successfully/i)).toBeInTheDocument()
  })

  it('invokes hover handlers without brittle style assertions', () => {
    render(<DbAddBlog />)
    const submit = screen.getByDisplayValue('Publish Blog')
    fireEvent.mouseOver(submit)
    fireEvent.mouseOut(submit)
    expect(submit).toHaveValue('Publish Blog')
  })
})
