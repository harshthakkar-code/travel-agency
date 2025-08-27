import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import DbAddPackage from '../db-add-package'
import api from '../../utils/api'
import uploadImage from '../../utils/uploadImage'

// Mock API and image uploader
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

// Mock layout elements
vi.mock('./dashboardSidebar', () => () => <div data-testid="sidebar" />)
vi.mock('./dashboardHeader', () => () => <div data-testid="header" />)

describe('DbAddPackage', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    const fillMinimalValidForm = () => {
        // Title & Description by name attributes
        const titleInput = document.querySelector('input[name="title"]')
        expect(titleInput).toBeTruthy()
        fireEvent.change(titleInput, { target: { value: 'Best Vietnam Tour' } })

        const descTextarea = document.querySelector('textarea[name="description"]')
        expect(descTextarea).toBeTruthy()
        fireEvent.change(descTextarea, { target: { value: 'Great trip across Vietnam' } })

        // Dates and Prices section
        const groupSize = document.querySelector('input[name="groupSize"]')
        expect(groupSize).toBeTruthy()
        fireEvent.change(groupSize, { target: { value: '10' } })

        const tripDay = document.querySelector('input[name="tripDay"]')
        const tripNight = document.querySelector('input[name="tripNight"]')
        expect(tripDay && tripNight).toBeTruthy()
        fireEvent.change(tripDay, { target: { value: '5' } })
        fireEvent.change(tripNight, { target: { value: '4' } })

        const category = document.querySelector('select[name="category"]')
        expect(category).toBeTruthy()
        fireEvent.change(category, { target: { value: 'Adult' } })

        const regularPrice = document.querySelector('input[name="regularPrice"]')
        expect(regularPrice).toBeTruthy()
        fireEvent.change(regularPrice, { target: { value: '999.99' } })

        // Location section
        const destination = document.querySelector('input[name="destination"]')
        const locationSel = document.querySelector('select[name="location"]')
        const mapUrl = document.querySelector('input[name="mapUrl"]')
        expect(destination && locationSel && mapUrl).toBeTruthy()
        fireEvent.change(destination, { target: { value: 'Hanoi' } })
        fireEvent.change(locationSel, { target: { value: 'Google Map' } })
        fireEvent.change(mapUrl, { target: { value: 'AIza...' } })

        // Right column: Status
        const status = document.querySelector('select[name="status"]')
        expect(status).toBeTruthy()
        fireEvent.change(status, { target: { value: 'Active' } })
    }


    it('renders layout and core sections', () => {
        render(<DbAddPackage />)

        // expect(screen.getByTestId('header')).toBeInTheDocument()
        // expect(screen.getByTestId('sidebar')).toBeInTheDocument()

        // Headings present
        expect(screen.getByText('Tour Program')).toBeInTheDocument()
        expect(screen.getByText('Dates and Prices')).toBeInTheDocument()
        expect(screen.getByText('Gallery')).toBeInTheDocument()
        expect(screen.getByText('Location')).toBeInTheDocument()
        // expect(screen.getByText('Publish')).toBeInTheDocument()
        expect(screen.getByText('Popular')).toBeInTheDocument()
        expect(screen.getByText('Keywords')).toBeInTheDocument()
        // expect(screen.getByText('Category')).toBeInTheDocument()
        expect(screen.getByText('Add image')).toBeInTheDocument()
    })

    it('shows validation errors when required fields are missing', async () => {
        render(<DbAddPackage />)

        fireEvent.click(screen.getByDisplayValue('Publish'))

        // Required field errors
        expect(await screen.findByText(/Title is required/i)).toBeInTheDocument()
        expect(screen.getByText(/Description is required/i)).toBeInTheDocument()
        expect(screen.getByText(/Group size is required/i)).toBeInTheDocument()
        expect(screen.getByText(/Days and nights are required/i)).toBeInTheDocument()
        expect(screen.getByText(/Category is required/i)).toBeInTheDocument()
        expect(screen.getByText(/Regular price is required/i)).toBeInTheDocument()
        expect(screen.getByText(/Destination is required/i)).toBeInTheDocument()
        expect(screen.getByText(/Location is required/i)).toBeInTheDocument()
        expect(screen.getByText(/API key is required/i)).toBeInTheDocument()
    })

   it('clears specific validation messages on input changes (live validation)', async () => {
  render(<DbAddPackage />)

  // Trigger validation
  fireEvent.click(screen.getByDisplayValue('Publish'))
  expect(await screen.findByText(/Title is required/i)).toBeInTheDocument()

  // Title clear
  const titleInput = document.querySelector('input[name="title"]')
  expect(titleInput).toBeTruthy()
  fireEvent.change(titleInput, { target: { value: 'Some Title' } })
  expect(screen.queryByText(/Title is required/i)).not.toBeInTheDocument()

  // Description clear
  const descTextarea = document.querySelector('textarea[name="description"]')
  expect(descTextarea).toBeTruthy()
  fireEvent.change(descTextarea, { target: { value: 'Some description' } })
  expect(screen.queryByText(/Description is required/i)).not.toBeInTheDocument()

  // Group size clear
  const groupSizeInput = document.querySelector('input[name="groupSize"]')
  expect(groupSizeInput).toBeTruthy()
  fireEvent.change(groupSizeInput, { target: { value: '3' } })
  expect(screen.queryByText(/Group size is required/i)).not.toBeInTheDocument()

  // Destination clear
  const destinationInput = document.querySelector('input[name="destination"]')
  expect(destinationInput).toBeTruthy()
  fireEvent.change(destinationInput, { target: { value: 'Goa' } })
  expect(screen.queryByText(/Destination is required/i)).not.toBeInTheDocument()

  // Category clear
  const categorySelect = document.querySelector('select[name="category"]')
  expect(categorySelect).toBeTruthy()
  fireEvent.change(categorySelect, { target: { value: 'Adult' } })
  expect(screen.queryByText(/Category is required/i)).not.toBeInTheDocument()

  // Regular Price clear
  const regularPriceInput = document.querySelector('input[name="regularPrice"]')
  expect(regularPriceInput).toBeTruthy()
  fireEvent.change(regularPriceInput, { target: { value: '500' } })
  expect(screen.queryByText(/Regular price is required/i)).not.toBeInTheDocument()

  // Location select
  const locationSelect = document.querySelector('select[name="location"]')
  expect(locationSelect).toBeTruthy()
  fireEvent.change(locationSelect, { target: { value: 'Google Map' } })
  expect(screen.queryByText(/Location is required/i)).not.toBeInTheDocument()

  // Map API key
  const mapKeyInput = document.querySelector('input[name="mapUrl"]')
  expect(mapKeyInput).toBeTruthy()
  fireEvent.change(mapKeyInput, { target: { value: 'key' } })
  expect(screen.queryByText(/API key is required/i)).not.toBeInTheDocument()

  // Trip duration live validation: set both and ensure no error
  const dayInput = document.querySelector('input[name="tripDay"]')
  const nightInput = document.querySelector('input[name="tripNight"]')
  expect(dayInput && nightInput).toBeTruthy()
  fireEvent.change(dayInput, { target: { value: '4' } })
  fireEvent.change(nightInput, { target: { value: '4' } })
  expect(screen.queryByText(/Days and nights/i)).not.toBeInTheDocument()
})


    it('shows tripDuration error when day-night diff > 1 and clears when valid', () => {
        render(<DbAddPackage />)
        const dayInput = screen.getByPlaceholderText('Days')
        const nightInput = screen.getByPlaceholderText('Nights')

        // Set invalid diff
        fireEvent.change(dayInput, { target: { value: '6' } })
        fireEvent.change(nightInput, { target: { value: '2' } })

        fireEvent.click(screen.getByDisplayValue('Publish'))
        expect(screen.getByText(/difference must be 0 or 1/i)).toBeInTheDocument()

        // Fix to valid
        fireEvent.change(nightInput, { target: { value: '5' } })
        // Now submit again to ensure no duration error
        fireEvent.click(screen.getByDisplayValue('Publish'))
        expect(screen.queryByText(/difference must be 0 or 1/i)).not.toBeInTheDocument()
    })

    it('lets user toggle Popular checkbox and type Keywords', () => {
        render(<DbAddPackage />)
        const popular = screen.getByLabelText(/Use Popular/i, { selector: 'input[type="checkbox"]' })
        expect(popular).not.toBeChecked()
        fireEvent.click(popular)
        expect(popular).toBeChecked()

        const keywords = screen.getByPlaceholderText('Keywords')
        fireEvent.change(keywords, { target: { value: 'beach, culture' } })
        expect(keywords).toHaveValue('beach, culture')
    })

    it('adds and removes city, and adds/removes activities dynamically', () => {
        render(<DbAddPackage />)

        // Add a city
        fireEvent.click(screen.getByRole('button', { name: /\+ Add City/i }))
        // City input appears
        const cityInput = screen.getByPlaceholderText(/Enter city name/i)
        expect(cityInput).toBeInTheDocument()

        // Update city name
        fireEvent.change(cityInput, { target: { value: 'Ahmedabad' } })
        expect(cityInput).toHaveValue('Ahmedabad')

        // There should be an initial activity input
        const firstActivity = screen.getByPlaceholderText(/Enter activity/i)
        expect(firstActivity).toBeInTheDocument()
        fireEvent.change(firstActivity, { target: { value: 'Visit Sabarmati Ashram' } })
        expect(firstActivity).toHaveValue('Visit Sabarmati Ashram')

        // Add another activity
        fireEvent.click(screen.getByRole('button', { name: /\+ Add Activity/i }))
        const activityInputs = screen.getAllByPlaceholderText(/Enter activity/i)
        expect(activityInputs.length).toBe(2)

        // Remove the second activity
        const removeButtons = screen.getAllByRole('button', { name: /Remove/i })
        // The first remove likely belongs to "Remove city", the next to activity remove
        // Click the last remove which should remove activity if multiple
        fireEvent.click(removeButtons[removeButtons.length - 1])

        // Now only one activity input remains
        expect(screen.getAllByPlaceholderText(/Enter activity/i).length).toBe(1)

        // Remove city
        const removeCityBtn = screen.getAllByRole('button', { name: /^Remove$/i })[0]
        fireEvent.click(removeCityBtn)
        expect(screen.queryByPlaceholderText(/Enter city name/i)).not.toBeInTheDocument()
    })

    it('uploads image and shows preview, then removes it', async () => {
        uploadImage.mockResolvedValue('https://cdn/img.jpg')
        render(<DbAddPackage />)

        const file = new File(['x'], 'img.png', { type: 'image/png' })
        // const inputs = screen.getAllByDisplayValue('Upload a image')
        const galleryInputs = Array.from(document.querySelectorAll('input[type="file"][accept="image/*"]'))
        expect(galleryInputs.length).toBeGreaterThan(0)
        // const galleryInput = galleryInputs[0]
        // fireEvent.change(galleryInput, { target: { files: [file] } })

        // There are two upload sections; pick the first input following the label
        const galleryFileInput = screen.getAllByRole('textbox', { hidden: true }).find(() => false) // placeholder to avoid confusion

        // Better: query the actual file input by accept attribute in Gallery section:
        const fileInputs = Array.from(document.querySelectorAll('input[type="file"][accept="image/*"]'))
        expect(fileInputs.length).toBeGreaterThan(0)
        const galleryInput = fileInputs[0]


        expect(galleryInput).toBeTruthy()
        fireEvent.change(galleryInput, { target: { files: [file] } })

        await waitFor(() => {
            expect(uploadImage).toHaveBeenCalledWith(file)
            expect(screen.getByAltText('Preview')).toHaveAttribute('src', 'https://cdn/img.jpg')
        })

        fireEvent.click(screen.getByRole('button', { name: /^Remove$/i }))
        expect(screen.queryByAltText('Preview')).not.toBeInTheDocument()
    })

    it('shows image upload error when uploader rejects', async () => {
        uploadImage.mockRejectedValue(new Error('fail'))
        render(<DbAddPackage />)

        const file = new File(['x'], 'img.png', { type: 'image/png' })

        // Find first file input in Gallery area (same approach as above)
        const fileInputs = Array.from(document.querySelectorAll('input[type="file"][accept="image/*"]'))
        expect(fileInputs.length).toBeGreaterThan(0)
        fireEvent.change(fileInputs[0], { target: { files: [file] } })

        expect(await screen.findByText(/Image upload failed/i)).toBeInTheDocument()
        expect(screen.queryByText(/Uploading/i)).not.toBeInTheDocument()
    })

    it('submits successfully with all fields, constructs payload with tripDuration and gallery', async () => {
        api.post.mockResolvedValue({})

        render(<DbAddPackage />)

        // Fill minimal valid form
        fillMinimalValidForm()

        // Make it popular and add keywords
        fireEvent.click(screen.getByLabelText(/Use Popular/i, { selector: 'input[type="checkbox"]' }))
        fireEvent.change(screen.getByPlaceholderText('Keywords'), { target: { value: 'vietnam, couple' } })

        // Add a tour program city and activity to ensure program array is included
        fireEvent.click(screen.getByRole('button', { name: /\+ Add City/i }))
        const cityInput = screen.getByPlaceholderText(/Enter city name/i)
        fireEvent.change(cityInput, { target: { value: 'Hanoi' } })
        const activityInput = screen.getByPlaceholderText(/Enter activity/i)
        fireEvent.change(activityInput, { target: { value: 'Street food tour' } })

        // Simulate uploaded image already present
        // Directly set through upload handler by calling uploadImage mock before:
        // Or simpler: upload now
        const file = new File(['x'], 'img.png', { type: 'image/png' })
        const fileInputs = Array.from(document.querySelectorAll('input[type="file"][accept="image/*"]'))
        uploadImage.mockResolvedValueOnce('https://cdn/tour.jpg')
        fireEvent.change(fileInputs[0], { target: { files: [file] } })
        await waitFor(() => expect(screen.getByAltText('Preview')).toBeInTheDocument())

        fireEvent.click(screen.getByDisplayValue('Publish'))

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith(
                '/packages',
                expect.objectContaining({
                    title: 'Best Vietnam Tour',
                    description: 'Great trip across Vietnam',
                    groupSize: 10, // number coercion for number input
                    tripDay: 5,
                    tripNight: 4,
                    category: 'Adult',
                    salePrice: '', // untouched optional field remains empty string
                    regularPrice: '999.99',
                    discount: '',
                    destination: 'Hanoi',
                    location: 'Google Map',
                    mapUrl: 'AIza...',
                    isPopular: true,
                    keywords: 'vietnam, couple',
                    status: 'Active',
                    program: [
                        { city: 'Hanoi', activities: ['Street food tour'] },
                    ],
                    tripDuration: '5 day / 4 night',
                    gallery: ['https://cdn/tour.jpg'],
                })
            )
        })

        expect(await screen.findByText(/Package added successfully/i)).toBeInTheDocument()

        // Ensure form reset occurred
        // expect(screen.getByLabelText('Title', { selector: 'input' })).toHaveValue('')
        const titleAfterReset = document.querySelector('input[name="title"]')
        expect(titleAfterReset).toBeTruthy()
        expect(titleAfterReset.value).toBe('')

        expect(screen.queryByAltText('Preview')).not.toBeInTheDocument()
    })

    it('shows API error when submit fails', async () => {
        api.post.mockRejectedValue({ response: { data: { message: 'Server error' } } })

        render(<DbAddPackage />)

        fillMinimalValidForm()

        fireEvent.click(screen.getByDisplayValue('Publish'))

        expect(await screen.findByText(/Server error/i)).toBeInTheDocument()
    })

    it('handles numeric inputs as numbers when not empty, otherwise empty string', () => {
        render(<DbAddPackage />)

        // Prefer scoping to the Dates and Prices section to avoid ambiguity
        const datesSection = screen.getByText(/Dates and Prices/i).closest('.dashboard-box')
        expect(datesSection).toBeTruthy()

        // Group Size numeric input by name attribute within the section
        const groupSize = datesSection.querySelector('input[name="groupSize"]')
        expect(groupSize).toBeTruthy()

        // Empty
        fireEvent.change(groupSize, { target: { value: '' } })
        expect(groupSize.value).toBe('')                 // raw DOM check for empty
        expect(groupSize).not.toHaveValue()              // jest-dom empty assertion

        // Number
        fireEvent.change(groupSize, { target: { value: '7' } })
        expect(groupSize).toHaveValue(7)                 // jest-dom number assertion

        // Discount numeric
        const discount = datesSection.querySelector('input[name="discount"]')
        expect(discount).toBeTruthy()

        fireEvent.change(discount, { target: { value: '' } })
        expect(discount.value).toBe('')
        expect(discount).not.toHaveValue()

        fireEvent.change(discount, { target: { value: '15' } })
        expect(discount).toHaveValue(15)
    })


})
