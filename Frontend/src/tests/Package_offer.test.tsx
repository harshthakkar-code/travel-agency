// src/tests/Package_offer.test.tsx
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import Package_offer from '../Package-offer'
import api from '../utils/api'

// Mock API
vi.mock('../utils/api', () => ({
  default: {
    get: vi.fn(),
  }
}))

// Mock Header component
vi.mock('../Header', () => ({
  default: () => <div data-testid="header-mock">Header Component</div>
}))

const mockPackagesResponse = {
  packages: [
    {
      _id: '1',
      title: 'Amazing Canada Adventure',
      destination: 'CANADA',
      regularPrice: 1500,
      salePrice: 1200,
      gallery: ['/assets/images/canada1.jpg'],
    },
    {
      _id: '2',
      title: 'New Zealand Trek',
      destination: 'NEW ZEALAND',
      regularPrice: 1300,
      salePrice: 1105,
      gallery: ['/assets/images/newzealand1.jpg'],
    },
    {
      _id: '3',
      title: 'European Explorer',
      destination: 'EUROPE',
      regularPrice: 2000,
      salePrice: 1600,
      gallery: [],
    },
    {
      _id: '4',
      title: 'Full Price Package',
      destination: 'ASIA',
      regularPrice: 1000,
      salePrice: 1000, // No discount
      gallery: ['/assets/images/asia1.jpg'],
    },
    {
      _id: '5',
      title: 'No Sale Package',
      destination: 'AFRICA',
      regularPrice: 1800,
      // No salePrice property
      gallery: ['/assets/images/africa1.jpg'],
    }
  ]
}

const mockDiscountedPackages = mockPackagesResponse.packages.filter(pkg => 
  pkg.salePrice && 
  pkg.salePrice !== pkg.regularPrice && 
  pkg.salePrice < pkg.regularPrice
)

describe('Package_offer Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state initially', () => {
    api.get.mockImplementation(() => new Promise(() => {})) // Never resolves
    
    render(<Package_offer />)
    
    expect(screen.getByTestId('header-mock')).toBeInTheDocument()
    expect(screen.getByText('Package Offer')).toBeInTheDocument()
    expect(screen.getByText('Loading packages...')).toBeInTheDocument()
  })

  it('renders error state when API fails', async () => {
    const errorMessage = 'Network error'
    api.get.mockRejectedValue(new Error(errorMessage))
    
    render(<Package_offer />)
    
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch packages')).toBeInTheDocument()
    })
    
    expect(screen.getByTestId('header-mock')).toBeInTheDocument()
    expect(screen.getByText('Package Offer')).toBeInTheDocument()
  })

  it('renders discounted packages successfully', async () => {
    api.get.mockResolvedValue({ data: mockPackagesResponse })
    
    render(<Package_offer />)
    
    await waitFor(() => {
      expect(screen.getByText('Amazing Canada Adventure')).toBeInTheDocument()
      expect(screen.getByText('New Zealand Trek')).toBeInTheDocument()
      expect(screen.getByText('European Explorer')).toBeInTheDocument()
    })

    // Check that non-discounted packages are not displayed
    expect(screen.queryByText('Full Price Package')).not.toBeInTheDocument()
    expect(screen.queryByText('No Sale Package')).not.toBeInTheDocument()
  })


  it('displays correct pricing information', async () => {
    api.get.mockResolvedValue({ data: mockPackagesResponse })
    
    render(<Package_offer />)
    
    await waitFor(() => {
      // Check original prices (crossed out)
      expect(screen.getByText('$1500')).toBeInTheDocument()
      expect(screen.getByText('$1300')).toBeInTheDocument()
      expect(screen.getByText('$2000')).toBeInTheDocument()
      
      // Check sale prices
      expect(screen.getByText('$1200')).toBeInTheDocument()
      expect(screen.getByText('$1105')).toBeInTheDocument()
      expect(screen.getByText('$1600')).toBeInTheDocument()
    })
  })

  it('displays correct destinations', async () => {
    api.get.mockResolvedValue({ data: mockPackagesResponse })
    
    render(<Package_offer />)
    
    await waitFor(() => {
      expect(screen.getByText('CANADA')).toBeInTheDocument()
      expect(screen.getByText('NEW ZEALAND')).toBeInTheDocument()
      expect(screen.getByText('EUROPE')).toBeInTheDocument()
    })
  })

  it('uses correct images with fallback', async () => {
    api.get.mockResolvedValue({ data: mockPackagesResponse })
    
    render(<Package_offer />)
    
    await waitFor(() => {
      const images = screen.getAllByRole('img')
      
      // Check that images have correct src attributes
      const packageImages = images.filter(img => 
        img.getAttribute('alt') === 'Amazing Canada Adventure' ||
        img.getAttribute('alt') === 'New Zealand Trek' ||
        img.getAttribute('alt') === 'European Explorer'
      )
      
      expect(packageImages).toHaveLength(3)
      
      // Check fallback image for package without gallery
      const europeanExplorerImg = images.find(img => 
        img.getAttribute('alt') === 'European Explorer'
      )
      expect(europeanExplorerImg).toHaveAttribute('src', '/assets/images/img9.jpg')
    })
  })

  it('renders package links correctly', async () => {
    api.get.mockResolvedValue({ data: mockPackagesResponse })
    
    render(<Package_offer />)
    
    await waitFor(() => {
      const canadaLink = screen.getByRole('link', { name: 'Amazing Canada Adventure' })
      expect(canadaLink).toHaveAttribute('href', '/package-detail/1')
      
      const newZealandLink = screen.getByRole('link', { name: 'New Zealand Trek' })
      expect(newZealandLink).toHaveAttribute('href', '/package-detail/2')
      
      const europeLink = screen.getByRole('link', { name: 'European Explorer' })
      expect(europeLink).toHaveAttribute('href', '/package-detail/3')
    })
  })

  it('displays no packages message when no discounted packages available', async () => {
    const noDiscountPackages = {
      packages: [
        {
          _id: '1',
          title: 'Regular Package',
          destination: 'TEST',
          regularPrice: 1000,
          salePrice: 1000, // No discount
          gallery: []
        }
      ]
    }
    
    api.get.mockResolvedValue({ data: noDiscountPackages })
    
    render(<Package_offer />)
    
    await waitFor(() => {
      expect(screen.getByText('No discounted packages available at the moment.')).toBeInTheDocument()
      expect(screen.getByText('Please check back later for exciting offers!')).toBeInTheDocument()
    })
  })

  it('displays no packages message when packages array is empty', async () => {
    api.get.mockResolvedValue({ data: { packages: [] } })
    
    render(<Package_offer />)
    
    await waitFor(() => {
      expect(screen.getByText('No discounted packages available at the moment.')).toBeInTheDocument()
      expect(screen.getByText('Please check back later for exciting offers!')).toBeInTheDocument()
    })
  })

 it('renders back to top button and search form', async () => {
  api.get.mockResolvedValue({ data: mockPackagesResponse })
  
  const { container } = render(<Package_offer />)
  
  await waitFor(() => {
    // Back to top button
    const backToTopLink = container.querySelector('a.to-top-icon')
    expect(backToTopLink).toBeInTheDocument()
    expect(backToTopLink).toHaveAttribute('id', 'backTotop')
    
    // Verify it contains the chevron up icon
    const chevronIcon = backToTopLink.querySelector('i.fas.fa-chevron-up')
    expect(chevronIcon).toBeInTheDocument()
    
    // Search form elements
    expect(screen.getByPlaceholderText('Enter your text...')).toBeInTheDocument()
    
    // Search form container
    const searchForm = container.querySelector('.header-search-form')
    expect(searchForm).toBeInTheDocument()
    
    // Search close button
    const searchClose = container.querySelector('.search-close')
    expect(searchClose).toBeInTheDocument()
  })
})

  it('renders footer correctly', async () => {
    api.get.mockResolvedValue({ data: mockPackagesResponse })
    
    render(<Package_offer />)
    
    await waitFor(() => {
      expect(screen.getByText('About Travel')).toBeInTheDocument()
      expect(screen.getByText('CONTACT INFORMATION')).toBeInTheDocument()
      expect(screen.getByText('Latest Post')).toBeInTheDocument()
      expect(screen.getByText('SUBSCRIBE US')).toBeInTheDocument()
      
      // Check footer links
      expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Term & Condition' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'FAQ' })).toBeInTheDocument()
      
      // Check copyright
      expect(screen.getByText('Copyright © 2021 Travele. All rights reserveds')).toBeInTheDocument()
    })
  })


  it('handles packages without destination gracefully', async () => {
    const packagesWithoutDestination = {
      packages: [
        {
          _id: '1',
          title: 'Mystery Tour',
          regularPrice: 1000,
          salePrice: 800,
          gallery: []
        }
      ]
    }
    
    api.get.mockResolvedValue({ data: packagesWithoutDestination })
    
    render(<Package_offer />)
    
    await waitFor(() => {
      expect(screen.getByText('Mystery Tour')).toBeInTheDocument()
      expect(screen.getByText('DESTINATION')).toBeInTheDocument() // Fallback text
    })
  })

  it('calculates discount percentage correctly for edge cases', async () => {
    const edgeCasePackages = {
      packages: [
        {
          _id: '1',
          title: 'Zero Regular Price',
          regularPrice: 0,
          salePrice: 100,
          gallery: []
        },
        {
          _id: '2',
          title: 'Null Sale Price',
          regularPrice: 1000,
          salePrice: null,
          gallery: []
        }
      ]
    }
    
    api.get.mockResolvedValue({ data: edgeCasePackages })
    
    render(<Package_offer />)
    
    await waitFor(() => {
      // Should show no packages because these don't meet discount criteria
      expect(screen.getByText('No discounted packages available at the moment.')).toBeInTheDocument()
    })
  })

  it('makes API call with correct endpoint', async () => {
    api.get.mockResolvedValue({ data: mockPackagesResponse })
    
    render(<Package_offer />)
    
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/packages')
      expect(api.get).toHaveBeenCalledTimes(1)
    })
  })

  it('logs error when API call fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const error = new Error('API Error')
    api.get.mockRejectedValue(error)
    
    render(<Package_offer />)
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching packages:', error)
    })
    
    consoleSpy.mockRestore()
  })
})
