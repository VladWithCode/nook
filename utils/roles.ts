import { Roles } from '@/types/globals'
import { auth } from '@clerk/nextjs/server'

/**
 * Check if the current user has a specific role (server-side)
 * @param role - The role to check for
 * @returns Promise<boolean> - True if user has the role, false otherwise
 */
export const checkRole = async (role: Roles): Promise<boolean> => {
    const { sessionClaims } = await auth()
    return sessionClaims?.metadata?.role === role
}

/**
 * Check if the current user is an admin (server-side)
 * @returns Promise<boolean> - True if user is an admin, false otherwise
 */
export const isAdmin = async (): Promise<boolean> => {
    return checkRole('admin')
}

/**
 * Simple helper for server-side admin checks
 * @returns Promise<boolean> - Admin status
 */
export const requireAdmin = async (): Promise<boolean> => {
    return isAdmin()
}

/**
 * Client-side helper to check admin role
 * @param user - Clerk user object
 * @returns boolean - True if user has admin role, false otherwise
 */
export const isAdminClient = (user: any): boolean => {
    return user?.publicMetadata?.role === 'admin'
}
