import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AuthContainer from './AuthContainer';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <Loader2 className="h-12 w-12 text-blue-400 animate-spin mx-auto" />
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg"></div>
          </div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthContainer />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;