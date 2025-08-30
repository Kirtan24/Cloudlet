import React, { useState } from 'react';
import AuthLayout from './AuthLayout';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthContainer: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthLayout
      title={isLogin ? 'Welcome Back' : 'Create Account'}
      subtitle={
        isLogin
          ? 'Sign in to your CloudBox account'
          : 'Join thousands of developers using CloudBox'
      }
    >
      {isLogin ? (
        <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </AuthLayout>
  );
};

export default AuthContainer;