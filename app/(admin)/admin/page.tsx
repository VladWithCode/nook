import { AdminOnly } from '@/components/auth/admin-only'

/**
 * Protected admin dashboard page
 * Only users with admin role can access this content
 */
export default function AdminPage() {
    return (
        <AdminOnly fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold">Access Denied</h1>
                    <p>You need admin privileges to access this page.</p>
                    <p className="text-sm text-current/60">
                        Please sign in with an admin account or contact your administrator.
                    </p>
                </div>
            </div>
        }>
            <div className="min-h-screen p-6">
                <div className="max-w-6xl mx-auto space-y-8">
                    <div className="border-b border-white/10 pb-4">
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-current/70 mt-2">Welcome to the Nook admin control panel</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-6 border border-white/20 rounded-lg bg-black/50">
                            <h2 className="text-xl font-semibold mb-3">Contact Forms</h2>
                            <p className="text-current/70 mb-4">View and manage contact form submissions</p>
                            <div className="text-2xl font-bold text-current/50">0</div>
                        </div>
                        
                        <div className="p-6 border border-white/20 rounded-lg bg-black/50">
                            <h2 className="text-xl font-semibold mb-3">Analytics</h2>
                            <p className="text-current/70 mb-4">Website traffic and user statistics</p>
                            <div className="text-2xl font-bold text-current/50">Coming Soon</div>
                        </div>
                        
                        <div className="p-6 border border-white/20 rounded-lg bg-black/50">
                            <h2 className="text-xl font-semibold mb-3">Content Management</h2>
                            <p className="text-current/70 mb-4">Update website content and pages</p>
                            <div className="text-2xl font-bold text-current/50">Coming Soon</div>
                        </div>
                    </div>
                    
                    <div className="mt-12 p-6 border border-green-500/30 rounded-lg bg-green-950/10">
                        <h2 className="text-xl font-semibold mb-3 text-green-400">Quick Actions</h2>
                        <div className="space-y-2">
                            <p className="text-current/80">• View recent contact form submissions</p>
                            <p className="text-current/80">• Manage admin users</p>
                            <p className="text-current/80">• Update website settings</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminOnly>
    );
}
