import React, { useEffect } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AuthSuccess: React.FC = () => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Redirect to dashboard after successful OAuth
    if (user && !isLoading) {
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }
  }, [user, isLoading]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
          <div className="absolute inset-0 bg-green-400/20 rounded-full blur-lg"></div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
            Authentication Successful!
          </h1>
          <p className="text-gray-400">
            {isLoading ? 'Setting up your account...' : 'Redirecting to dashboard...'}
          </p>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
          <span className="text-sm text-gray-400">Please wait</span>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccess;