import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from '@/components/forms/LoginForm';
import { RegisterForm } from '@/components/forms/RegisterForm';
import { vi, describe, it, expect } from 'vitest';

// Mock server actions
vi.mock('@/actions/auth.actions', () => ({
  LoginserverAction: vi.fn(),
  RegisterserverAction: vi.fn(),
  OAuthServerAction: vi.fn(),
  ForgotPasswordAction: vi.fn(),
}));

describe('Auth Forms', () => {
  it('renders login form correctly', () => {
    render(<LoginForm />);
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders signup form correctly', () => {
    render(<RegisterForm />);
    expect(screen.getByRole('textbox', { name: /full name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('toggles password visibility and updates aria attributes', () => {
    render(<LoginForm />);

    // Initial state: password hidden
    const passwordInput = screen.getByLabelText(/^password/i) as HTMLInputElement;
    expect(passwordInput.type).toBe('password');

    const toggleButton = screen.getByRole('button', { name: /show password/i });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton).toHaveAttribute('title', 'Show password');

    // Click to show password
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');

    // The name changes because aria-label changed
    const hideButton = screen.getByRole('button', { name: /hide password/i });
    expect(hideButton).toBeInTheDocument();
    expect(hideButton).toHaveAttribute('aria-pressed', 'true');
    expect(hideButton).toHaveAttribute('title', 'Hide password');

    // Click again to hide password
    fireEvent.click(hideButton);
    expect(passwordInput.type).toBe('password');

    const showButtonAgain = screen.getByRole('button', { name: /show password/i });
    expect(showButtonAgain).toBeInTheDocument();
    expect(showButtonAgain).toHaveAttribute('aria-pressed', 'false');
    expect(showButtonAgain).toHaveAttribute('title', 'Show password');
  });
});
