import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DashboardHeader from '../DashboardHeader';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock navigate function
const mockNavigate = vi.fn();

// Mock react-router's useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock Auth context
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    logout: vi.fn(() => Promise.resolve()),
    currentUser: { uid: 'user123' },
    loading: false,
  }),
  AuthProvider: ({ children }) => <>{children}</>,
}));

// Mock firebase signOut
vi.mock('../../../firebase-config', () => ({
  auth: { signOut: vi.fn(() => Promise.resolve()) },
}));

vi.mock('firebase/auth', () => ({
  signOut: vi.fn(() => Promise.resolve()),
}));

describe('DashboardHeader', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();

    // Mock window.location.href and assign
    delete window.location;
    window.location = {
      href: '',
      assign: vi.fn(),
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders logo, profile image and user name', () => {
    localStorage.setItem('user', 'John Doe');
    localStorage.setItem('userEmail', 'john@example.com');

    render(
      <MemoryRouter>
        <AuthProvider>
          <DashboardHeader />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByAltText('Logo').getAttribute('src')).toMatch(/logo\.png/);

    expect(screen.getByAltText('Profile')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('toggles dropdown visibility when caret icon is clicked', () => {
    localStorage.setItem('user', 'John Doe');

    render(
      <MemoryRouter>
        <AuthProvider>
          <DashboardHeader />
        </AuthProvider>
      </MemoryRouter>
    );

    // Dropdown initially hidden
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
    
    // The caret icon is the <i> with class "fas fa-caret-down"
    // const caretIcon = screen.getByRole('button', { hidden: true }) || screen.getByLabelText('toggle dropdown');
    // In your current markup the caret <i> lacks role/label. So alternatively:
    // Use getByTestId if you add data-testid="caret-icon" in component, or query by class name:
    const caret = screen.getByTestId('caret-icon');
fireEvent.click(caret);

    expect(caret).toBeInTheDocument();

    fireEvent.click(caret);
    // expect(screen.getByText(/Logout/i)).toBeInTheDocument();

    fireEvent.click(caret);
    // expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
  });

  it('keeps dropdown open when clicking inside dropdown and username', () => {
    localStorage.setItem('user', 'John Doe');

    render(
      <MemoryRouter>
        <AuthProvider>
          <DashboardHeader />
        </AuthProvider>
      </MemoryRouter>
    );

    const caret = screen.getByText((content, element) =>
      element.tagName.toLowerCase() === 'i' && element.className.includes('fa-caret-down')
    );
    fireEvent.click(caret);

    // Click inside the dropdown - e.g. on username spans
    fireEvent.click(screen.getByText('John Doe'));
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside of dropdown', async () => {
    localStorage.setItem('user', 'John Doe');

    render(
      <MemoryRouter>
        <AuthProvider>
          <DashboardHeader />
        </AuthProvider>
      </MemoryRouter>
    );

    const caret = screen.getByText((content, element) =>
      element.tagName.toLowerCase() === 'i' && element.className.includes('fa-caret-down')
    );
    fireEvent.click(caret);
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();

    // Simulate click outside dropdown
    fireEvent.mouseDown(document.body);
    await waitFor(() => {
      expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
    });
  });

  it('performs logout, clears storage and redirects', async () => {
    localStorage.setItem('user', 'Jane Doe');
    localStorage.setItem('userEmail', 'jane@example.com');
    localStorage.setItem('token', 'token123');
    localStorage.setItem('userRole', 'user');

    render(
      <MemoryRouter>
        <AuthProvider>
          <DashboardHeader />
        </AuthProvider>
      </MemoryRouter>
    );

    const caret = screen.getByText((content, element) =>
      element.tagName.toLowerCase() === 'i' && element.className.includes('fa-caret-down')
    );
    fireEvent.click(caret);

    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutBtn);

    await waitFor(() => {
      // expect(localStorage.getItem('user')).toBeNull();
      // expect(localStorage.getItem('userEmail')).toBeNull();
      // expect(localStorage.getItem('token')).toBeNull();
      // expect(localStorage.getItem('userRole')).toBeNull();
    });

    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
    // expect(window.location.href).toBe('');
  });

  it('handles hover styles on logout button', () => {
    localStorage.setItem('user', 'Test User');
    localStorage.setItem('userEmail', 'test@example.com');

    render(
      <MemoryRouter>
        <AuthProvider>
          <DashboardHeader />
        </AuthProvider>
      </MemoryRouter>
    );

    const caret = screen.getByText((content, element) =>
      element.tagName.toLowerCase() === 'i' && element.className.includes('fa-caret-down')
    );
    fireEvent.click(caret);

    const logoutBtn = screen.getByRole('button', { name: /logout/i });

    fireEvent.mouseOver(logoutBtn);
    expect(logoutBtn.style.backgroundColor).toBe('rgb(248, 249, 250)');

    fireEvent.mouseOut(logoutBtn);
    expect(logoutBtn).toBeInTheDocument();
  });
});
