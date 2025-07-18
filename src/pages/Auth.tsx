
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AuthForm } from '@/components/auth/AuthForm';
import SEO from '@/components/SEO';

const Auth = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log('Auth page - user:', user?.id || 'No user', 'loading:', loading);
  }, [user, loading]);

  if (loading) {
    console.log('Auth page - showing loading state');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    console.log('Auth page - user authenticated, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('Auth page - showing auth form');
  return (
    <>
      <SEO 
        title="Sign In - TaxConsult Pro"
        description="Sign in to your TaxConsult Pro account to access your dashboard and manage your tax services."
        keywords="login, sign in, tax dashboard, authentication"
      />
      <AuthForm />
    </>
  );
};

export default Auth;
