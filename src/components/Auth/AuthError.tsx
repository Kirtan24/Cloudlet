import React from 'react';
import { XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

const AuthError: React.FC = () => {
  const handleGoBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-6">
        <div className="relative">
          <XCircle className="h-16 w-16 text-red-400 mx-auto" />
          <div className="absolute inset-0 bg-red-400/20 rounded-full blur-lg"></div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
            Authentication Failed
          </h1>
          <p className="text-gray-400">
            Something went wrong during the authentication process. Please try again.
          </p>
        </div>

        <Button
          onClick={handleGoBack}
          className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 relative overflow-hidden group"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="relative z-10">Back to Home</span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </Button>
      </div>
    </div>
  );
};

export default AuthError;