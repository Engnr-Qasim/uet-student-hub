// Clerk configuration constants

// You can replace this value with your real Clerk Publishable Key from Clerk Dashboard
// e.g., "pk_test_bGl0ZS16b25leS04OS5jbGVyay5hY2NvdW50cy5kZXYk"
export const CLERK_PUBLISHABLE_KEY = (import.meta as any).env.VITE_CLERK_PUBLISHABLE_KEY || '';

// Detect if we should use Mock Auth mode
// If no valid publisher key is supplied, we run in an incredibly fast and feature-rich offline "Mock Auth" mode,
// allowing users to switch roles instantly with a beautiful toggle widget.
export const IS_MOCK_AUTH = !CLERK_PUBLISHABLE_KEY || CLERK_PUBLISHABLE_KEY.trim() === '' || CLERK_PUBLISHABLE_KEY.includes('YOUR_CLERK_PUBLISHABLE_KEY') || CLERK_PUBLISHABLE_KEY.includes('placeholder');
