import { Link } from 'react-router';
import { Wallet, TrendingUp, PieChart, Shield, Moon, Sun, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const HomePage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors flex flex-col">
      <nav className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 animate-fade-in">
              <Wallet className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Money Manager</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5 text-gray-600" />
                ) : (
                  <Sun className="h-5 w-5 text-gray-400" />
                )}
              </button>
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="grow">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Manage Your Finances
              <span className="block text-blue-600 dark:text-blue-400 mt-2 animate-gradient">
                Like Never Before
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto animate-fade-in-delay">
              Track your income and expenses, manage multiple accounts, and get insights into your spending habits with our intuitive money management platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-delay-2">
              <Link
                to="/register"
                className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Track Transactions',
                description: 'Record income and expenses with detailed categorization',
                color: 'blue',
                delay: '0'
              },
              {
                icon: PieChart,
                title: 'Visual Reports',
                description: 'Get insights with charts and spending breakdowns',
                color: 'green',
                delay: '100'
              },
              {
                icon: Wallet,
                title: 'Multiple Accounts',
                description: 'Manage cash, bank, credit card, and savings accounts',
                color: 'purple',
                delay: '200'
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                description: 'Your financial data is encrypted and protected',
                color: 'orange',
                delay: '300'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
                green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
                purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
                orange: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400'
              };
              
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${feature.delay}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${colorClasses[feature.color]} mb-4 transition-transform duration-300 hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-linear-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to take control of your finances?
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                Join thousands of users managing their money effectively
              </p>
              <Link
                to="/register"
                className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-flex items-center"
              >
                Start Managing Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">Money Manager</span>
            </div>
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p>&copy; 2026 Money Manager. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Add custom animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }

        .animate-gradient {
          background: linear-gradient(270deg, #3b82f6, #2563eb, #1d4ed8);
          background-size: 600% 600%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient 3s ease infinite;
        }

        .dark .animate-gradient {
          background: linear-gradient(270deg, #60a5fa, #3b82f6, #2563eb);
          background-size: 600% 600%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
};

export default HomePage;