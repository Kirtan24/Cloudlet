import React from 'react';
import { Cloud } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="orbital-ring orbital-ring-1"></div>
          <div className="orbital-ring orbital-ring-2"></div>
          <div className="orbital-ring orbital-ring-3"></div>
        </div>

        {/* Floating Particles */}
        <div className="particles-container">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 20}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Dynamic Gradient Orbs */}
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>

        {/* Grid Pattern */}
        <div className="grid-pattern"></div>
      </div>

      {/* Auth Container */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <Cloud className="h-12 w-12 text-blue-400" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg"></div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Cloudlet
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-gray-400">{subtitle}</p>
        </div>

        {/* Auth Form Container */}
        <div className="glass-card-large p-8">
          {children}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            By continuing, you agree to our{' '}
            <button className="text-blue-400 hover:text-blue-300 underline">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="text-blue-400 hover:text-blue-300 underline">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;