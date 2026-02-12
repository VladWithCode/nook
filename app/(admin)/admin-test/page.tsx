import { AdminOnly } from '@/components/auth/admin-only'
import { Button } from '@/components/ui/button'

/**
 * Test page to demonstrate AdminOnly component usage
 */
export default function AdminTestPage() {
  return (
    <div className="container mx-auto p-6 space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold">Admin Access Test</h1>
      
      {/* Public content - visible to everyone */}
      <div className="p-4 border border-white/20 rounded-lg bg-black/50">
        <h2 className="text-lg font-semibold mb-2">Public Content</h2>
        <p>Anyone can see this content.</p>
      </div>

      {/* Admin-only content - only visible to admins */}
      <AdminOnly>
        <div className="p-4 border border-green-500/50 rounded-lg bg-green-950/20">
          <h2 className="text-lg font-semibold mb-2 text-green-400">Admin Only Content</h2>
          <p>Only admins can see this content!</p>
          <Button className="mt-2" variant="default">Admin Action</Button>
        </div>
      </AdminOnly>

      {/* Admin-only content with custom fallback */}
      <AdminOnly fallback={
        <div className="p-4 border border-red-500/50 rounded-lg bg-red-950/20">
          <h2 className="text-lg font-semibold mb-2 text-red-400">Access Denied</h2>
          <p>You need admin privileges to view this content.</p>
          <p className="text-sm text-current/60 mt-2">
            Note: In a real application, this would redirect to sign-in.
          </p>
        </div>
      }>
        <div className="p-4 border border-blue-500/50 rounded-lg bg-blue-950/20">
          <h2 className="text-lg font-semibold mb-2 text-blue-400">Admin Dashboard</h2>
          <p>This is admin dashboard content with custom fallback.</p>
        </div>
      </AdminOnly>
    </div>
  )
}