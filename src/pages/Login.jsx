import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, loginUser, shouldRedirectToDashboard, getRoleDisplayName } from '../services/coreServices';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  useEffect(() => {
    const redirectPath = shouldRedirectToDashboard();
    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await login(email, password);
      
      if (response && response.data && response.data.data) {
        const { token, ...userData } = response.data.data;
        loginUser(userData, token);
        
        console.log('Login successful, user data:', userData);
        console.log('User role:', userData.role);
        console.log('Token:', token);
        
        setSuccess(`Welcome back, ${userData.name}! Redirecting to your ${getRoleDisplayName(userData.role)} dashboard...`);
        setTimeout(() => {
          const redirectPath = shouldRedirectToDashboard();
          console.log('Redirect path:', redirectPath);
          navigate(redirectPath || '/dashboard', { replace: true });
        }, 1500);
        
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Error message is already shown by the login function via antd message
      setError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-yellow-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Floating Grocery Icons */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Rice/Grains */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}>🌾</div>
        <div className="absolute top-40 right-20 text-4xl opacity-30 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>🍚</div>
        
        {/* Vegetables */}
        <div className="absolute top-60 left-1/4 text-5xl opacity-25 animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}>🥕</div>
        <div className="absolute bottom-40 right-10 text-4xl opacity-20 animate-bounce" style={{animationDelay: '2s', animationDuration: '4.5s'}}>🥬</div>
        <div className="absolute top-32 right-1/3 text-3xl opacity-30 animate-bounce" style={{animationDelay: '1.5s', animationDuration: '3s'}}>🍅</div>
        
        {/* Fruits */}
        <div className="absolute bottom-20 left-20 text-5xl opacity-25 animate-bounce" style={{animationDelay: '0.8s', animationDuration: '4s'}}>🍎</div>
        <div className="absolute top-1/2 left-10 text-4xl opacity-20 animate-bounce" style={{animationDelay: '2.5s', animationDuration: '3.5s'}}>🍌</div>
        
        {/* Cooking Oil & Spices */}
        <div className="absolute bottom-60 right-1/4 text-4xl opacity-30 animate-bounce" style={{animationDelay: '1.2s', animationDuration: '4s'}}>🛢️</div>
        <div className="absolute top-80 left-1/3 text-3xl opacity-25 animate-bounce" style={{animationDelay: '3s', animationDuration: '3.5s'}}>🌶️</div>
        
        {/* Dairy & Bread */}
        <div className="absolute bottom-32 left-1/2 text-4xl opacity-20 animate-bounce" style={{animationDelay: '0.3s', animationDuration: '4.5s'}}>🥛</div>
        <div className="absolute top-1/3 right-16 text-5xl opacity-25 animate-bounce" style={{animationDelay: '2.2s', animationDuration: '3s'}}>🍞</div>
        
        {/* Pulses & Lentils */}
        <div className="absolute bottom-80 left-1/4 text-3xl opacity-30 animate-bounce" style={{animationDelay: '1.8s', animationDuration: '4s'}}>🫘</div>
        <div className="absolute top-16 left-1/2 text-4xl opacity-20 animate-bounce" style={{animationDelay: '0.7s', animationDuration: '3.5s'}}>🌰</div>
        
        {/* Store & Shopping */}
        <div className="absolute bottom-16 right-1/3 text-5xl opacity-15 animate-bounce" style={{animationDelay: '2.8s', animationDuration: '4.5s'}}>🏪</div>
        <div className="absolute top-24 left-2/3 text-4xl opacity-25 animate-bounce" style={{animationDelay: '1.3s', animationDuration: '3s'}}>📦</div>
        
        {/* Additional Grocery Items */}
        <div className="absolute bottom-48 left-16 text-3xl opacity-20 animate-bounce" style={{animationDelay: '3.5s', animationDuration: '4s'}}>🧄</div>
        <div className="absolute top-48 right-8 text-4xl opacity-30 animate-bounce" style={{animationDelay: '0.9s', animationDuration: '3.5s'}}>🧅</div>
        <div className="absolute bottom-72 right-20 text-3xl opacity-25 animate-bounce" style={{animationDelay: '2.7s', animationDuration: '4.5s'}}>🥔</div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 via-transparent to-green-100/30"></div>

      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200/50 p-8 relative overflow-hidden">
          {/* Card Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg relative">
              <span className="text-white font-bold text-2xl">CF</span>
              <div className="absolute -top-1 -right-1 text-lg">🌾</div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent mb-2">Welcome Back!</h1>
            <p className="text-gray-600">Sign in to <span className="font-semibold text-orange-600">champaaran foods</span> wholesale dashboard</p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            {/* Email Field */}
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-orange-600 transition-colors">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-orange-50/30 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-300 focus:bg-white transition-all duration-300 pl-12 hover:border-orange-300"
                  placeholder="admin@champaaranfoods.com"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors group-focus-within:text-orange-500">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-orange-600 transition-colors">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-green-50/30 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-300 focus:bg-white transition-all duration-300 pl-12 hover:border-orange-300"
                  placeholder="••••••••"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors group-focus-within:text-orange-500">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button type="button" className="text-sm text-orange-600 hover:text-orange-500 font-medium">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-green-600 hover:from-orange-600 hover:via-orange-700 hover:to-green-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
            >
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2 relative z-10">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Sign In</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              )}
            </button>
          </form>
          {/* Footer */}
          {/* <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <button className="text-orange-600 hover:text-orange-500 font-medium">
                Contact Admin
              </button>
            </p>
          </div> */}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            © 2024 champaaran foods. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;


