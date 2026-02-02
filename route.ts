/**
 * Protected Routes - Require user authentication
 * These routes can only be accessed by authenticated users and will redirect
 * unauthorized visitors to the login page. Includes user account management,
 * shopping cart, and personal settings.
 */
export const protectedRoutes = ["/adress", "/cart", "/setting"]

/**
 * Authentication Routes - Login and registration pages
 * These routes are used for user authentication flows. If an authenticated user
 * visits these routes, they should be redirected to the dashboard or home page
 * to prevent unnecessary auth page access.
 */
export const authRoutes = ["/login", "/sign-in"]

/**
 * Unprotected Routes - Public access routes
 * These routes are publicly accessible to all visitors regardless of authentication status.
 * Includes product collections, general information pages, about section, contact page,
 * and the landing/home page. No authentication is required to view these routes.
 */
export const unprotectedRoutes = ["/collections", "/about", "/contact", "/"]

/**
 * API Authentication Route - NextAuth API endpoint prefix
 * This is the base path for all NextAuth authentication API routes including
 * session management, token validation, and provider callbacks.
 */
export const API_AURH_ROUTE = "/api"
