import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import AuthSuccess from "./components/Auth/AuthSuccess";
import AuthError from "./components/Auth/AuthError";
import LandingPage from "./components/LandingPage";

// Main App Component
const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  // Handle OAuth callback routes
  if (window.location.pathname === '/auth/success') {
    return <AuthSuccess />;
  }

  if (window.location.pathname === '/auth/error') {
    return <AuthError />;
  }

  // Show protected content (either dashboard or auth)
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;