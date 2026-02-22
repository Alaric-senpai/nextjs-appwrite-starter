import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  redirect: vi.fn(),
}))

// Mock next-safe-action
vi.mock('next-safe-action/hooks', () => ({
  useAction: () => ({
    execute: vi.fn(),
    isExecuting: false,
    hasSucceeded: false,
    result: {},
  }),
}))
