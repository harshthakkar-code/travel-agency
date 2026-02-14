/* eslint-disable no-undef */
import '@testing-library/jest-dom'
import { vi } from 'vitest'

// ✅ Set global timeout for all tests
vi.setConfig({ testTimeout: 10000 })

// Mock window.scrollY
Object.defineProperty(window, 'scrollY', {
  writable: true,
  value: 0,
})

// Enhanced localStorage mock
const localStorageMock = {
  _storage: {},
  getItem: vi.fn((key) => localStorageMock._storage[key] || null),
  setItem: vi.fn((key, value) => {
    localStorageMock._storage[key] = value.toString()
  }),
  removeItem: vi.fn((key) => {
    delete localStorageMock._storage[key]
  }),
  clear: vi.fn(() => {
    localStorageMock._storage = {}
  }),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
})

// Mock window.location
delete window.location
window.location = { href: '', assign: vi.fn(), replace: vi.fn() }

// Mock console methods to avoid noise in tests
global.console = {
  ...console,
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
}
