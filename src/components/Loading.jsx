import { useEffect, useState } from 'react';

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [currentStep, setCurrentStep] = useState(0);
  const [showPulse, setShowPulse] = useState(true);

  const loadingSteps = [
    { text: 'Initializing champaaran foods...', icon: '🏪', duration: 1000 },
    { text: 'Loading fresh products...', icon: '🥬', duration: 1200 },
    { text: 'Preparing wholesale rates...', icon: '💰', duration: 1000 },
    { text: 'Setting up inventory...', icon: '📦', duration: 800 },
    { text: 'Connecting to suppliers...', icon: '🚚', duration: 1100 },
    { text: 'Finalizing dashboard...', icon: '📊', duration: 900 },
    { text: 'Almost ready...', icon: '✨', duration: 800 }
  ];

  useEffect(() => {
    let progressInterval;
    let stepTimeout;

    const startProgress = () => {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 100;
          return prev + Math.random() * 8 + 2;
        });
      }, 150);
    };

    const nextStep = () => {
      if (currentStep < loadingSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
        setLoadingText(loadingSteps[currentStep + 1].text);
        
        stepTimeout = setTimeout(() => {
          nextStep();
        }, loadingSteps[currentStep + 1].duration);
      }
    };

    // Start initial step
    setLoadingText(loadingSteps[0].text);
    startProgress();
    
    stepTimeout = setTimeout(() => {
      nextStep();
    }, loadingSteps[0].duration);

    // Pulse effect
    const pulseInterval = setInterval(() => {
      setShowPulse(prev => !prev);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
      clearInterval(pulseInterval);
    };
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-yellow-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Grocery Icons */}
        <div className="absolute top-20 left-10 text-4xl opacity-10 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}>🌾</div>
        <div className="absolute top-40 right-20 text-3xl opacity-15 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>🥕</div>
        <div className="absolute bottom-40 left-20 text-4xl opacity-10 animate-bounce" style={{animationDelay: '2s', animationDuration: '3.5s'}}>🍎</div>
        <div className="absolute bottom-20 right-10 text-3xl opacity-15 animate-bounce" style={{animationDelay: '0.5s', animationDuration: '4.5s'}}>🥛</div>
        <div className="absolute top-1/2 left-1/4 text-2xl opacity-10 animate-bounce" style={{animationDelay: '1.5s', animationDuration: '3s'}}>🍞</div>
        <div className="absolute top-1/3 right-1/3 text-3xl opacity-15 animate-bounce" style={{animationDelay: '2.5s', animationDuration: '4s'}}>🌶️</div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Loading Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200/50 p-8 text-center relative overflow-hidden">
          {/* Card Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

          {/* Logo */}
          <div className="relative z-10 mb-8">
            <div className={`w-24 h-24 bg-gradient-to-r from-orange-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl relative transition-all duration-500 ${showPulse ? 'scale-110 shadow-orange-200' : 'scale-100'}`}>
              <span className="text-white font-bold text-3xl">CF</span>
              <div className="absolute -top-2 -right-2 text-2xl animate-spin" style={{animationDuration: '3s'}}>🌾</div>
              
              {/* Rotating Ring */}
              <div className="absolute inset-0 border-2 border-orange-300 rounded-3xl animate-spin opacity-30" style={{animationDuration: '4s'}}></div>
              <div className="absolute inset-2 border-2 border-green-300 rounded-2xl animate-spin opacity-20" style={{animationDuration: '6s', animationDirection: 'reverse'}}></div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent mb-2">
              champaaran foods
            </h2>
            <p className="text-gray-600 text-sm font-medium">Wholesale Supplier Dashboard</p>
          </div>

          {/* Step Indicators */}
          <div className="relative z-10 mb-6">
            <div className="flex justify-center space-x-2">
              {loadingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    index <= currentStep 
                      ? 'bg-gradient-to-r from-orange-500 to-green-500 scale-125' 
                      : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
            <div className="mt-3 text-xs text-gray-500">
              Step {currentStep + 1} of {loadingSteps.length}
            </div>
          </div>

          {/* Advanced Loading Spinner */}
          <div className="relative z-10 mb-10">
            <div className="relative w-40 h-40 mx-auto">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 border-4 border-orange-200 rounded-full animate-pulse-glow"></div>
              <div className="absolute inset-3 border-3 border-green-200 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              
              {/* Multiple Animated Rings */}
              <div className="absolute inset-0 border-4 border-transparent border-t-orange-500 border-r-orange-400 rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-3 border-transparent border-b-green-500 border-l-green-400 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
              <div className="absolute inset-8 border-2 border-transparent border-t-yellow-400 border-r-yellow-300 rounded-full animate-spin" style={{animationDuration: '2s'}}></div>
              
              {/* Inner Gradient Circle */}
              <div className="absolute inset-12 bg-gradient-to-br from-orange-400 via-green-400 to-yellow-400 rounded-full animate-pulse opacity-40"></div>
              
              {/* Center Icon with Enhanced Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2 animate-bounce transform hover:scale-110 transition-transform duration-300">
                    {loadingSteps[currentStep]?.icon}
                  </div>
                  <div className="text-sm font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                    Loading...
                  </div>
                </div>
              </div>
              
              {/* Enhanced Orbiting Elements */}
              <div className="absolute inset-0 animate-spin" style={{animationDuration: '3s'}}>
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full -translate-x-1/2 -translate-y-2 shadow-lg"></div>
              </div>
              <div className="absolute inset-0 animate-spin" style={{animationDuration: '4s', animationDirection: 'reverse'}}>
                <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full -translate-x-1/2 translate-y-2 shadow-lg"></div>
              </div>
              <div className="absolute inset-0 animate-spin" style={{animationDuration: '5s'}}>
                <div className="absolute left-0 top-1/2 w-2 h-2 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full -translate-x-1 -translate-y-1/2 shadow-md"></div>
              </div>
              <div className="absolute inset-0 animate-spin" style={{animationDuration: '6s', animationDirection: 'reverse'}}>
                <div className="absolute right-0 top-1/2 w-2 h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full translate-x-1 -translate-y-1/2 shadow-md"></div>
              </div>
            </div>
          </div>


          {/* Loading Text */}
          <div className="relative z-10">
            <div className="mb-4">
              <div className="flex items-center justify-center mb-2">
                <div className="text-2xl mr-2 animate-pulse">
                  {loadingSteps[currentStep]?.icon}
                </div>
                <p className="text-gray-700 font-semibold text-lg transition-all duration-500 animate-fade-in">
                  {loadingText}
                </p>
              </div>
              <div className="text-xs text-gray-500 mb-3">
                Processing your wholesale experience...
              </div>
            </div>
            
            {/* Enhanced Bouncing Dots */}
            <div className="flex justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0s'}}></div>
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.15s'}}></div>
              <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.3s'}}></div>
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.45s'}}></div>
            </div>

            {/* Enhanced Loading Stats */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3 border border-orange-200 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in">
                <div className="text-2xl mb-1">📦</div>
                <div className="font-bold text-orange-600 text-lg">500+</div>
                <div className="text-gray-600 font-medium">Products</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 border border-green-200 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in" style={{animationDelay: '0.1s'}}>
                <div className="text-2xl mb-1">🚚</div>
                <div className="font-bold text-green-600 text-lg">50+</div>
                <div className="text-gray-600 font-medium">Suppliers</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
                <div className="text-2xl mb-1">⏰</div>
                <div className="font-bold text-blue-600 text-lg">24/7</div>
                <div className="text-gray-600 font-medium">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 animate-pulse">
            🚀 Preparing your wholesale experience...
          </p>
          <div className="mt-2 text-xs text-gray-400">
            champaaran foods • Trusted Wholesale Partner
          </div>
        </div>
      </div>

      {/* Enhanced Floating Indicators */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl px-5 py-3 shadow-xl border border-green-200/50 animate-slide-in-right hover:scale-105 transition-transform duration-300">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-pulse shadow-sm"></div>
            <span className="text-gray-700 font-semibold">✅ System Online</span>
          </div>
        </div>
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl px-5 py-3 shadow-xl border border-orange-200/50 animate-slide-in-right hover:scale-105 transition-transform duration-300" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-pulse shadow-sm"></div>
            <span className="text-gray-700 font-semibold">⚡ Loading Data</span>
          </div>
        </div>
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl px-5 py-3 shadow-xl border border-blue-200/50 animate-slide-in-right hover:scale-105 transition-transform duration-300" style={{animationDelay: '0.6s'}}>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse shadow-sm"></div>
            <span className="text-gray-700 font-semibold">🔒 Secure Connection</span>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -468px 0 }
          100% { background-position: 468px 0 }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) }
          50% { transform: translateY(-10px) }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px) }
          100% { opacity: 1; transform: translateY(0) }
        }
        
        @keyframes slide-in-right {
          0% { opacity: 0; transform: translateX(100px) }
          100% { opacity: 1; transform: translateX(0) }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(249, 115, 22, 0.3) }
          50% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.6) }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;


