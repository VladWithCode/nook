import type { ReactNode } from 'react'
import { isAdmin } from '@/utils/roles';

interface AdminOnlyProps {
    children: ReactNode
    fallback?: ReactNode
}

/**
 * AdminOnly wrapper component that checks custom metadata role
 * Uses client-side auth hooks to check if user has admin role in metadata
 * 
 * @param children - Content to render for admin users
 * @param fallback - Optional fallback content (defaults to loading spinner)
 */
export async function AdminOnly({ children, fallback }: AdminOnlyProps) {
    if (!(await isAdmin())) {
        return (
            fallback || (
                <div className="flex items-center justify-center p-4">
                    <span className="text-current/60">Admin access required</span>
                </div>
            )
        )
    }

    return <>{children}</>
}
