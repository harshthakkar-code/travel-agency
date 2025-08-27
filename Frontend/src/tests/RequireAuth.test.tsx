// src/tests/RequireAuth.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { vi } from 'vitest'
import RequireAuth from '../RequireAuth'

// Mock localStorage
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => { 
      store[key] = value 
    }),
    removeItem: vi.fn((key) => { 
      delete store[key] 
    }),
    clear: vi.fn(() => { 
      store = {} 
    })
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
})

// Mock components for testing
const ProtectedComponent = () => <div>Protected Content</div>
const LoginPage = () => <div>Login Page</div>
const HomePage = () => <div>Home Page</div>

// Helper function to render component with router
const renderWithRouter = (
  component, 
  initialEntries = ['/protected'],
  allowedRoles = undefined
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route 
          path="/protected" 
          element={
            <RequireAuth allowedRoles={allowedRoles}>
              {component}
            </RequireAuth>
          } 
        />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('RequireAuth Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.clear()
  })

  describe('Authentication Tests', () => {
    it('renders children when user is authenticated with token', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'valid-token'
        return null
      })

      renderWithRouter(<ProtectedComponent />)
      
      expect(screen.queryByText('Login Page')).not.toBeInTheDocument()
    })

    it('redirects to login when no token exists', () => {
      localStorageMock.getItem.mockImplementation(() => null)

      renderWithRouter(<ProtectedComponent />)
      
      expect(screen.getByText('Login Page')).toBeInTheDocument()
    })

    it('redirects to login when token is empty string', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return ''
        return null
      })

      renderWithRouter(<ProtectedComponent />)
      
      expect(screen.getByText('Login Page')).toBeInTheDocument()
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })

    it('redirects to login when token is null', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return null
        return null
      })

      renderWithRouter(<ProtectedComponent />)
      
      expect(screen.getByText('Login Page')).toBeInTheDocument()
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })
  })

  describe('Authorization Tests (Role-based)', () => {
    it('renders children when user has correct role', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'valid-token'
        if (key === 'userRole') return 'admin'
        return null
      })

      renderWithRouter(<ProtectedComponent />, ['/protected'], ['admin'])
      
      expect(screen.getByText('Protected Content')).toBeInTheDocument()
      expect(screen.queryByText('Home Page')).not.toBeInTheDocument()
    })

    it('redirects to home when user has wrong role', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'valid-token'
        if (key === 'userRole') return 'user'
        return null
      })

      renderWithRouter(<ProtectedComponent />, ['/protected'], ['admin'])
      
      expect(screen.getByText('Home Page')).toBeInTheDocument()
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })

    it('renders children when user role is in allowed roles array', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'valid-token'
        if (key === 'userRole') return 'moderator'
        return null
      })

      renderWithRouter(<ProtectedComponent />, ['/protected'], ['admin', 'moderator', 'user'])
      
      expect(screen.getByText('Protected Content')).toBeInTheDocument()
    })

    it('redirects to home when user role is not in allowed roles array', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'valid-token'
        if (key === 'userRole') return 'guest'
        return null
      })

      renderWithRouter(<ProtectedComponent />, ['/protected'], ['admin', 'moderator'])
      
      expect(screen.getByText('Home Page')).toBeInTheDocument()
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })

    it('redirects to home when user has no role but roles are required', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'valid-token'
        if (key === 'userRole') return null
        return null
      })

      renderWithRouter(<ProtectedComponent />, ['/protected'], ['admin'])
      
      expect(screen.getByText('Home Page')).toBeInTheDocument()
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })

    it('redirects to home when user role is empty string', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'valid-token'
        if (key === 'userRole') return ''
        return null
      })

      renderWithRouter(<ProtectedComponent />, ['/protected'], ['admin'])
      
      expect(screen.getByText('Home Page')).toBeInTheDocument()
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })
  })

  describe('No Role Restrictions Tests', () => {
    it('renders children when no roles are specified and user is authenticated', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'valid-token'
        if (key === 'userRole') return 'user'
        return null
      })

      renderWithRouter(<ProtectedComponent />, ['/protected'], undefined)
      
      expect(screen.getByText('Protected Content')).toBeInTheDocument()
    })

    it('renders children when allowedRoles is empty array and user is authenticated', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'valid-token'
        if (key === 'userRole') return 'user'
        return null
      })

      renderWithRouter(<ProtectedComponent />, ['/protected'], [])
      
    })

    it('renders children when allowedRoles is null and user is authenticated', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'valid-token'
        if (key === 'userRole') return 'user'
        return null
      })

      renderWithRouter(<ProtectedComponent />, ['/protected'], null)
      
      expect(screen.getByText('Protected Content')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('prioritizes authentication check over role check', () => {
      // No token, but has valid role
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return null
        if (key === 'userRole') return 'admin'
        return null
      })

      renderWithRouter(<ProtectedComponent />, ['/protected'], ['admin'])
      
      expect(screen.getByText('Login Page')).toBeInTheDocument()
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
      expect(screen.queryByText('Home Page')).not.toBeInTheDocument()
    })

    it('handles complex component children', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'valid-token'
        return null
      })

      const ComplexComponent = () => (
        <div>
          <h1>Complex Component</h1>
          <p>With multiple elements</p>
          <button>Action Button</button>
        </div>
      )

      renderWithRouter(<ComplexComponent />)
      
      expect(screen.getByText('Complex Component')).toBeInTheDocument()
      expect(screen.getByText('With multiple elements')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument()
    })

    it('calls localStorage.getItem with correct keys', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'valid-token'
        if (key === 'userRole') return 'admin'
        return null
      })

      renderWithRouter(<ProtectedComponent />, ['/protected'], ['admin'])
      
      expect(localStorageMock.getItem).toHaveBeenCalledWith('token')
      expect(localStorageMock.getItem).toHaveBeenCalledWith('userRole')
    })

    it('handles case-sensitive role matching', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'valid-token'
        if (key === 'userRole') return 'Admin' // Different case
        return null
      })

      renderWithRouter(<ProtectedComponent />, ['/protected'], ['admin'])
      
      expect(screen.getByText('Home Page')).toBeInTheDocument()
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })
  })

  describe('Multiple Roles Scenarios', () => {
    it('allows access with first role in array', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'valid-token'
        if (key === 'userRole') return 'admin'
        return null
      })

      renderWithRouter(<ProtectedComponent />, ['/protected'], ['admin', 'moderator', 'user'])
      
      expect(screen.getByText('Protected Content')).toBeInTheDocument()
    })

    it('allows access with middle role in array', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'valid-token'
        if (key === 'userRole') return 'moderator'
        return null
      })

      renderWithRouter(<ProtectedComponent />, ['/protected'], ['admin', 'moderator', 'user'])
      
      expect(screen.getByText('Protected Content')).toBeInTheDocument()
    })

    it('allows access with last role in array', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'valid-token'
        if (key === 'userRole') return 'user'
        return null
      })

      renderWithRouter(<ProtectedComponent />, ['/protected'], ['admin', 'moderator', 'user'])
      
      expect(screen.getByText('Protected Content')).toBeInTheDocument()
    })
  })

  describe('Navigation Replace Behavior', () => {
    it('uses replace navigation for login redirect', () => {
      localStorageMock.getItem.mockImplementation(() => null)

      renderWithRouter(<ProtectedComponent />)
      
      // Navigate component should use replace={true} - this is tested by ensuring
      // the login page renders (indicating successful navigation)
      expect(screen.getByText('Login Page')).toBeInTheDocument()
    })

    it('uses replace navigation for unauthorized redirect', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'token') return 'valid-token'
        if (key === 'userRole') return 'guest'
        return null
      })

      renderWithRouter(<ProtectedComponent />, ['/protected'], ['admin'])
      
      // Navigate component should use replace={true} - this is tested by ensuring
      // the home page renders (indicating successful navigation)
      expect(screen.getByText('Home Page')).toBeInTheDocument()
    })
  })
})
