import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Login from './Login';
import { LoginUserApi } from '../../services';

// Mock the dependencies
vi.mock('../../services');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Login Component', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders login form', () => {
    render(<Login />, { wrapper: MemoryRouter });
    expect(screen.getByRole('heading', { name: 'Log In' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g John419@gmail.com')).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
  });

  it('displays link to registration page', () => {
    render(<Login />, { wrapper: MemoryRouter });
    const registerLink = screen.getByText('Register');
    expect(registerLink).toBeInTheDocument();
    expect(registerLink.getAttribute('href')).toBe('/register');
  });

  it('shows error messages for invalid inputs', async () => {
    render(<Login />, { wrapper: MemoryRouter });
    
    fireEvent.click(screen.getByRole('button', { name: 'Log In' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });
  });

  it('submits the form with valid inputs', async () => {
    vi.mocked(LoginUserApi).mockResolvedValue({ token: 'fake-token' } as {token: string});
    // (LoginUserApi as jest.Mock).mockResolvedValue({ token: 'fake-token' });

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password@123' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Log In' }));
const data ={
        email: 'test@example.com',
        password: 'Password@123'
      }
    await waitFor(() => {
      expect(LoginUserApi).toHaveBeenCalledWith(data);
      expect(mockNavigate).toHaveBeenCalledWith('/');
      expect(localStorage.getItem('token')).toBe('fake-token');
    });
  });


  it('disables submit button while loading', async () => {
    vi.mocked(LoginUserApi).mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ token: 'fake-token' }), 1000)));

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password@123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Log In' }));

// expect(screen.getByRole('button', { name: 'Log In' })).not.toBeDisabled()

    await waitFor(() => {
    expect(screen.getByRole('button', { name: 'Log In' })).toBeDisabled();
    });
  });
});