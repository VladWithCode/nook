'use server'

import { clerkClient } from '@clerk/nextjs/server'

/**
 * Server action to set admin role for a user
 * This is for development/testing purposes only
 * In production, you would manage roles through Clerk dashboard
 */
export async function setAdminRole(userId: string) {
  const client = await clerkClient()
  
  try {
    await client.users.updateUserMetadata(userId, {
      publicMetadata: { role: 'admin' }
    })
    return { success: true, message: 'Admin role assigned successfully' }
  } catch (error) {
    console.error('Error setting admin role:', error)
    return { success: false, message: 'Failed to assign admin role' }
  }
}

/**
 * Server action to remove admin role from a user
 */
export async function removeAdminRole(userId: string) {
  const client = await clerkClient()
  
  try {
    await client.users.updateUserMetadata(userId, {
      publicMetadata: { role: null }
    })
    return { success: true, message: 'Admin role removed successfully' }
  } catch (error) {
    console.error('Error removing admin role:', error)
    return { success: false, message: 'Failed to remove admin role' }
  }
}