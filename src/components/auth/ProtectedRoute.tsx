
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();

  console.log('ProtectedRoute - Loading:', loading, 'User:', user?.id, 'Profile:', profile, 'RequireAdmin:', requireAdmin);

  // Show loading while authentication is being checked
  if (loading) {
    console.log('ProtectedRoute - Showing loading state');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Redirect to auth if no user
  if (!user) {
    console.log('ProtectedRoute - No user, redirecting to /auth');
    return <Navigate to="/auth" replace />;
  }

  // If admin is required, check role
  if (requireAdmin) {
    console.log('ProtectedRoute - Admin required, checking role...');
    
    if (!profile) {
      console.log('ProtectedRoute - No profile found, treating as regular user');
      return <Navigate to="/dashboard" replace />;
    }

    if (profile.role !== 'admin') {
      console.log('ProtectedRoute - User is not admin, redirecting to /dashboard');
      return <Navigate to="/dashboard" replace />;
    }

    console.log('ProtectedRoute - User is admin, granting access');
  }

  console.log('ProtectedRoute - Access granted, rendering children');
  return <>{children}</>;
};
