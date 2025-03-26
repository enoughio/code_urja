'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // TODO: Implement actual login logic 
      // For now, we'll just log the credentials
      console.log('Login attempt:', { email, password });

      // Example of potential login validation
      // You would replace this with your actual authentication logic
      // For instance, calling an API endpoint to verify credentials
      // if (loginSuccessful) {
      //   router.push('/dashboard');
      // }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSignupRedirect = () => {
    router.push('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={handleSignupRedirect}
                className="text-blue-500 hover:underline focus:outline-none"
              >
                Sign Up
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;