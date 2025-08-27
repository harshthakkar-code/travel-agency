import { render, screen, fireEvent } from '@testing-library/react';
import DashboardSidebar from '../dashboardSidebar';

describe('DashboardSidebar Component', () => {
beforeEach(() => {
  // Clear localStorage before each test
  localStorage.clear();

  // Reset window.location mock
  delete window.location;
  window.location = { href: '', assign: vi.fn() };
});


  it('renders all main navigation links', () => {
    render(<DashboardSidebar />);

    // Check main links present in sidebar navigation
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/user details/i)).toBeInTheDocument();
    expect(screen.getByText(/add new user/i)).toBeInTheDocument();
    expect(screen.getByText(/add package/i)).toBeInTheDocument();
    expect(screen.getByText(/active packages/i)).toBeInTheDocument();
    expect(screen.getByText(/pending packages/i)).toBeInTheDocument();
    expect(screen.getByText(/expired packages/i)).toBeInTheDocument();
    expect(screen.getByText(/booking & enquiry/i)).toBeInTheDocument();
    expect(screen.getByText(/comments/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('clears localStorage and redirects on logout click', () => {
    // Set some keys to simulate logged in state
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('user', 'test-user');

    render(<DashboardSidebar />);

    // The logout list item has an onClick on <li>, so get it by role or text and then find closest <li>
    // Since there is no role for <li>, we can get the logout link and get parent <li> or directly select the logout li

    const logoutLi = screen.getByText(/logout/i).closest('li');

    // Click on the logout <li>
    fireEvent.click(logoutLi);

    // localStorage should be cleared
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();

    // window.location href should be set to '/admin/login'
    expect(window.location.href).toBe('/admin/login');
  });
});
