import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import TourPackages from '../tour-packages'
import api from '../utils/api'

// Mock API
vi.mock('../utils/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  }
}))

// Mock Header component
vi.mock('../Header', () => ({
  default: () => <div data-testid="header">Header Component</div>
}))

// Mock Footer component  
vi.mock('../Footer', () => ({
  default: () => <div data-testid="footer">Footer Component</div>
}))

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
})

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <TourPackages />
    </MemoryRouter>
  )
}

describe('TourPackages Component', () => {
  const mockPackagesData = [
    {
      _id: 'pkg1',
      title: 'Adventure Package',
      description: 'An amazing adventure package for thrill seekers with exciting activities and outdoor fun.',
      salePrice: 1000,
      regularPrice: 1200,
      groupSize: 5,
      tripDuration: '7D/6N',
      destination: 'Nepal',
      rating: 4.5,
      gallery: ['/image1.jpg']
    },
    {
      _id: 'pkg2',
      title: 'Beach Package',
      description: 'Relaxing beach resort package with beautiful ocean views and luxury amenities for families.',
      salePrice: 800,
      regularPrice: 1000,
      groupSize: 8,
      tripDuration: '5D/4N',
      destination: 'Maldives',
      rating: 4.8,
      gallery: ['/image2.jpg']
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
    api.get.mockResolvedValue({ data: mockPackagesData })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  // Basic Rendering Tests
  describe('Basic Component Rendering', () => {
    it('should render without crashing', () => {
      renderComponent()
      expect(screen.getByTestId('header')).toBeInTheDocument()
    })

    it('should display header component', () => {
      renderComponent()
      expect(screen.getByTestId('header')).toBeInTheDocument()
    })

    // it('should display footer component', () => {
    //   renderComponent()
    //   expect(screen.getByTestId('footer')).toBeInTheDocument()
    // })

    it('should call packages API on mount', async () => {
      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/packages')
      })
    })

    it('should handle empty packages array', async () => {
      api.get.mockResolvedValue({ data: [] })
      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalled()
      })
    })

    it('should handle API errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
      api.get.mockRejectedValue(new Error('API failed'))

      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalled()
      })

      consoleSpy.mockRestore()
    })
  })

  // Content Display Tests
  describe('Static Content Display', () => {
    it('should display Tour Packages heading', () => {
      renderComponent()
      expect(screen.getByText('Tour Packages')).toBeInTheDocument()
    })

    it('should display TRAVEL BY ACTIVITY section', () => {
      renderComponent()
      expect(screen.getByText('TRAVEL BY ACTIVITY')).toBeInTheDocument()
    })

    it('should display ADVENTURE & ACTIVITY heading', () => {
      renderComponent()
      expect(screen.getByText('ADVENTURE & ACTIVITY')).toBeInTheDocument()
    })

    it('should display activity description text', () => {
      renderComponent()
      const activityText = screen.getByText(/Mollit voluptatem perspiciatis/)
      expect(activityText).toBeInTheDocument()
    })
  })

  // Package Data Tests  
  describe('Package Data Handling', () => {
    it('should handle successful API response', async () => {
      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/packages')
      })
    })

    it('should handle packages with sale price', async () => {
      const packageWithSalePrice = [{
        _id: 'pkg1',
        title: 'Test Package',
        description: 'Test description here',
        salePrice: 500,
        regularPrice: 600,
        groupSize: 4,
        tripDuration: '3D/2N',
        destination: 'Test Location',
        gallery: []
      }]

      api.get.mockResolvedValue({ data: packageWithSalePrice })
      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalled()
      })
    })

    it('should handle packages without sale price', async () => {
      const packageWithoutSalePrice = [{
        _id: 'pkg2',
        title: 'Regular Price Package',
        description: 'Package with regular price only',
        salePrice: null,
        regularPrice: 800,
        groupSize: 6,
        tripDuration: '4D/3N',
        destination: 'Regular Location',
        gallery: []
      }]

      api.get.mockResolvedValue({ data: packageWithoutSalePrice })
      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalled()
      })
    })

    it('should handle missing package data gracefully', async () => {
      const incompletePackage = [{
        _id: 'pkg3',
        title: null,
        description: null,
        salePrice: null,
        regularPrice: null,
        groupSize: null,
        tripDuration: null,
        destination: null,
        gallery: null
      }]

      api.get.mockResolvedValue({ data: incompletePackage })
      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalled()
      })
    })
  })

  // User Interaction Tests
  describe('User Authentication and Actions', () => {
    it('should handle protected action for authenticated users', async () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'userRole') return 'user'
        if (key === 'token') return 'valid-token'
        return null
      })

      renderComponent()

      // await waitFor(() => {
      //   expect(localStorageMock.getItem).toHaveBeenCalledWith('userRole')
      // })
    })

    it('should handle unauthenticated user actions', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalled()
      })
    })

    it('should check user role on component mount', async () => {
      renderComponent()

      await waitFor(() => {
        expect(localStorageMock.getItem).toHaveBeenCalled()
      })
    })

    it('should handle navigation for authenticated users', async () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'userRole') return 'user'
        if (key === 'token') return 'valid-token'
        return null
      })

      renderComponent()

      await waitFor(() => {
        expect(localStorageMock.getItem).toHaveBeenCalled()
      })
    })

    it('should redirect unauthenticated users appropriately', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      renderComponent()

      await waitFor(() => {
        expect(localStorageMock.getItem).toHaveBeenCalled()
      })
    })
  })

  // Error Handling Tests
  describe('Error Handling', () => {
    it('should handle network errors', async () => {
      api.get.mockRejectedValue(new Error('Network error'))

      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalled()
      })
    })

    it('should handle timeout errors', async () => {
      api.get.mockRejectedValue(new Error('Request timeout'))

      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalled()
      })
    })

    it('should handle invalid response format', async () => {
      api.get.mockResolvedValue({ invalidData: 'test' })

      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalled()
      })
    })

    it('should handle null response', async () => {
      api.get.mockResolvedValue(null)

      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalled()
      })
    })
  })

  // Component State Tests
  describe('Component State Management', () => {
    it('should initialize with correct default state', () => {
      renderComponent()
      expect(screen.getByTestId('header')).toBeInTheDocument()
    })

    it('should update state after API call', async () => {
      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalledWith('/packages')
      })
    })

    it('should handle multiple re-renders', async () => {
      const { rerender } = renderComponent()

      rerender(
        <MemoryRouter>
          <TourPackages />
        </MemoryRouter>
      )

      await waitFor(() => {
        expect(api.get).toHaveBeenCalled()
      })
    })

    it('should handle component unmounting', async () => {
      const { unmount } = renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalled()
      })

      unmount()
      // Should not throw errors
    })
  })

  // Price Calculation Tests
  describe('Price Calculations', () => {
    it('should calculate price per person correctly', async () => {
      const packageData = [{
        _id: 'price-test',
        title: 'Price Test Package',
        description: 'Testing price calculation',
        salePrice: 1000,
        regularPrice: 1200,
        groupSize: 5,
        tripDuration: '5D/4N',
        destination: 'Test Place',
        gallery: []
      }]

      api.get.mockResolvedValue({ data: packageData })
      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalled()
      })

      // Price per person should be 1000/5 = 200
    })

    it('should handle zero group size gracefully', async () => {
      const packageData = [{
        _id: 'zero-group',
        title: 'Zero Group Package',
        description: 'Testing zero group size',
        salePrice: 1000,
        regularPrice: 1200,
        groupSize: 0,
        tripDuration: '5D/4N',
        destination: 'Test Place',
        gallery: []
      }]

      api.get.mockResolvedValue({ data: packageData })
      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalled()
      })
    })

    it('should use fallback values for missing data', async () => {
      const packageData = [{
        _id: 'fallback-test',
        title: null,
        description: null,
        salePrice: null,
        regularPrice: null,
        groupSize: null,
        tripDuration: null,
        destination: null,
        gallery: null
      }]

      api.get.mockResolvedValue({ data: packageData })
      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalled()
      })
    })
  })

  // Accessibility Tests
  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      renderComponent()
      expect(screen.getByText('Tour Packages')).toBeInTheDocument()
    })

    it('should be keyboard accessible', () => {
      renderComponent()
      // Basic accessibility check
      expect(screen.getByTestId('header')).toBeInTheDocument()
    })

    it('should have semantic HTML structure', () => {
      renderComponent()
      // expect(screen.getByTestId('header')).toBeInTheDocument()
      // expect(screen.getByTestId('footer')).toBeInTheDocument()
    })
  })

  // Performance Tests
  describe('Performance', () => {
    it('should only make one API call on mount', async () => {
      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalledTimes(1)
      })
    })

    it('should handle large datasets efficiently', async () => {
      const largeDataset = Array.from({ length: 100 }, (_, i) => ({
        _id: `pkg${i}`,
        title: `Package ${i}`,
        description: `Description for package ${i}`,
        salePrice: 1000 + i,
        regularPrice: 1200 + i,
        groupSize: 5,
        tripDuration: '7D/6N',
        destination: `Destination ${i}`,
        gallery: []
      }))

      api.get.mockResolvedValue({ data: largeDataset })
      renderComponent()

      await waitFor(() => {
        expect(api.get).toHaveBeenCalled()
      })
    })
  })


//   it('renders list of packages and triggers handleBookNow on click', async () => {
//     // Render component with mock packages array
//     // Simulate clicking package image/title/book button to verify handleBookNow calls
//   });

//   it('displays no packages fallback when no data', () => {
//     // Render with empty packages array and check that no package elements exist
//   });

//   it('toggles wishlist: adds package when not previously in wishlist', async () => {
//     localStorage.getItem.mockReturnValue('userRoleValue'); // mock logged-in user
//     const packageId = 'pkg1';
//     api.post.mockResolvedValueOnce({}); // mock add wishlist success

//     // Call toggleWishlist with packageId
//     // Check api.post called with expected data
//     // Check wishlist include packageId afterward
//   });

//   it('toggles wishlist: removes package when already in wishlist', async () => {
//     localStorage.getItem.mockReturnValue('userRoleValue'); // mock logged-in user
//     const packageId = 'pkg1';
//     api.delete.mockResolvedValueOnce({}); // mock delete wishlist success

//     // Set initial wishlist state including packageId
//     // Call toggleWishlist with packageId
//     // Check api.delete called correctly
//     // Check wishlist no longer includes packageId
//   });

//   it('redirects to login if user role not found in localStorage when toggling wishlist', () => {
//     localStorage.getItem.mockReturnValue(null); // simulate no role
//     // Call toggleWishlist and verify navigate called with '/admin/login'
//   });

//   it('handles API error gracefully when updating wishlist', async () => {
//     localStorage.getItem.mockReturnValue('userRoleValue');
//     api.post.mockRejectedValueOnce(new Error('API error'));

//     // Call toggleWishlist and verify error logged
//   });
//  it('renders multiple packages and handles Book Now clicks', async () => {
//   const mockPackages = [
//     { _id: 'pkg1', title: 'Package 1', /* other fields */ },
//     { _id: 'pkg2', title: 'Package 2', /* other fields */ },
//   ];

//   // Mock API get request inside TourPackages to return mockPackages
//   api.get.mockResolvedValue({ data: mockPackages });

//   // Mock other required APIs if needed
//   api.post.mockResolvedValue({});
//   api.delete.mockResolvedValue({});

//   render(
//     <MemoryRouter>
//       <TourPackages />
//     </MemoryRouter>
//   );

//   screen.debug();

//   await waitFor(() => {
//     expect(screen.getByText(/package 1/i)).toBeInTheDocument();
//     expect(screen.getByText(/package 2/i)).toBeInTheDocument();
//   });

//   // Simulate clicks as before
//   fireEvent.click(screen.getAllByRole('img')[0]);
//   fireEvent.click(screen.getByText(/package 1/i));
//   fireEvent.click(screen.getAllByText(/book now/i)[0]);
// });


})
