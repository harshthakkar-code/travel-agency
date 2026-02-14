import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import DashboardSidebar from '../dashboardSidebar';

// Mock the useAuth hook completely
const mockLogout = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    logout: mockLogout,
    currentUser: { uid: 'test-user' },
    loading: false,
  }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock Firebase
vi.mock('../../../firebase-config', () => ({
  auth: {
    currentUser: null,
    signOut: vi.fn(() => Promise.resolve()),
  },
}));

vi.mock('firebase/auth', () => ({
  signOut: vi.fn(() => Promise.resolve()),
}));

const TestWrapper = ({ children }) => {
  return <MemoryRouter>{children}</MemoryRouter>;
};

describe('DashboardSidebar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    delete window.location;
    window.location = { href: '', assign: vi.fn() };
  });

  it('renders the sidebar component', () => {
    render(
      <TestWrapper>
        <DashboardSidebar />
      </TestWrapper>
    );

    // Just verify the component renders without errors
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

  it('clears localStorage and redirects on logout click', async () => {
    // Set some test data in localStorage
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('userId', 'test-user-id');
    localStorage.setItem('userEmail', 'test@example.com');

    render(
      <TestWrapper>
        <DashboardSidebar />
      </TestWrapper>
    );

    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);

    await waitFor(() => {
      // Check that localStorage is cleared
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('userId')).toBeNull();
      expect(localStorage.getItem('userEmail')).toBeNull();
      
      // Check that logout function was called
      expect(mockLogout).toHaveBeenCalled();
      
      // Check that navigation occurred
      expect(mockNavigate).toHaveBeenCalledWith('/admin/login');
    });
  });

  it('handles logout error gracefully', async () => {
    // Mock console.error to avoid noise in test output
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Make logout throw an error
    mockLogout.mockRejectedValueOnce(new Error('Logout failed'));

    render(
      <TestWrapper>
        <DashboardSidebar />
      </TestWrapper>
    );

    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Logout error:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  it('renders navigation elements', () => {
    render(
      <TestWrapper>
        <DashboardSidebar />
      </TestWrapper>
    );

    // Check for any navigation links that exist
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('logout button is present and clickable', () => {
    render(
      <TestWrapper>
        <DashboardSidebar />
      </TestWrapper>
    );

    const logoutButton = screen.getByText(/logout/i);
    expect(logoutButton).toBeInTheDocument();
    
    // Verify button can be clicked
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });

  it('component renders without crashing', () => {
    const { container } = render(
      <TestWrapper>
        <DashboardSidebar />
      </TestWrapper>
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders dashboard navigation link', () => {
    render(
      <TestWrapper>
        <DashboardSidebar />
      </TestWrapper>
    );

    // Look for dashboard link or text
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

  it('localStorage is initially empty after beforeEach cleanup', () => {
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
  });
});
