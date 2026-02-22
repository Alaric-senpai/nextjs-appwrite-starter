import { render, screen } from '@testing-library/react';
import { LoginForm } from '@/components/forms/LoginForm';
import { SignupForm } from '@/components/forms/RegisterForm';
import { vi, describe, it, expect } from 'vitest';

// Mock server actions
vi.mock('@/actions/auth.actions', () => ({
  LoginserverAction: vi.fn(),
  RegisterserverAction: vi.fn(),
  OAuthServerAction: vi.fn(),
}));

describe('Auth Forms', () => {
  it('renders login form correctly', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders signup form correctly', () => {
    render(<SignupForm />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });
});
