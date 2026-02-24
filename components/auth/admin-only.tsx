'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import type { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

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
export function AdminOnly({ children, fallback }: AdminOnlyProps) {
    const { isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();
    
    // Show loading while auth state is being determined
    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center p-4">
                <Loader2 className="h-4 w-4 animate-spin text-current/60" />
                <span className="ml-2 text-current/60">Cargando...</span>
            </div>
        )
    }
    
    // Check if user is signed in and has admin role from publicMetadata
    const isAdmin = isSignedIn && user?.publicMetadata?.role === 'admin';
    
    if (!isAdmin) {
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
