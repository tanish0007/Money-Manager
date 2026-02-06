import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { TrendingUp, TrendingDown, Wallet, CreditCard, Building, PiggyBank } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Overview = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('monthly');
  const [customRange, setCustomRange] = useState({
    startDate: '',
    endDate: ''
  });

  const getCurrentDate = () => {
    const now = new Date();
    return {
      month: now.getMonth() + 1,
      year: now.getFullYear()
    };
  };

  useEffect(() => {
    fetchSummary();
  }, [period]);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const { month, year } = getCurrentDate();
      let url = `/transactions/summary?period=${period}`;
      
      if (period === 'monthly') {
        url += `&month=${month}&year=${year}`;
      } else if (period === 'yearly') {
        url += `&year=${year}`;
      } else if (period === 'custom' && customRange.startDate && customRange.endDate) {
        url += `&startDate=${customRange.startDate}&endDate=${customRange.endDate}`;
      }

      const { data } = await api.get(url);
      if (data.success) {
        setSummary(data.summary);
      }
    } catch (error) {
      toast.error('Failed to fetch summary');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomRangeSubmit = () => {
    if (customRange.startDate && customRange.endDate) {
      fetchSummary();
    } else {
      toast.error('Please select both start and end dates');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  const accounts = [
    { name: 'Cash', key: 'cash', icon: Wallet, color: 'text-green-600 dark:text-green-400' },
    { name: 'Bank', key: 'bank', icon: Building, color: 'text-blue-600 dark:text-blue-400' },
    { name: 'Credit Card', key: 'credit-card', icon: CreditCard, color: 'text-purple-600 dark:text-purple-400' },
    { name: 'Savings', key: 'savings', icon: PiggyBank, color: 'text-orange-600 dark:text-orange-400' }
  ];

  const categoryData = {
    labels: Object.keys(summary?.categoryBreakdown || {}),
    datasets: [{
      data: Object.values(summary?.categoryBreakdown || {}),
      backgroundColor: [
        '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
        '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'
      ]
    }]
  };

  const divisionData = {
    labels: ['Personal', 'Office'],
    datasets: [{
      data: [
        summary?.divisionBreakdown?.personal || 0,
        summary?.divisionBreakdown?.office || 0
      ],
      backgroundColor: ['#3b82f6', '#10b981']
    }]
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setPeriod('weekly')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              period === 'weekly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              period === 'monthly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setPeriod('yearly')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              period === 'yearly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Yearly
          </button>
          <button
            onClick={() => setPeriod('custom')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              period === 'custom'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Custom
          </button>
        </div>
      </div>

      {period === 'custom' && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="date"
              value={customRange.startDate}
              onChange={(e) => setCustomRange({ ...customRange, startDate: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="date"
              value={customRange.endDate}
              onChange={(e) => setCustomRange({ ...customRange, endDate: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={handleCustomRangeSubmit}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Income</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                ₹{summary?.totalIncome?.toLocaleString() || 0}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Expense</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                ₹{summary?.totalExpense?.toLocaleString() || 0}
              </p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
              <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Balance</p>
              <p className={`text-2xl font-bold ${
                (summary?.balance || 0) >= 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                ₹{summary?.balance?.toLocaleString() || 0}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {accounts.map(account => {
          const Icon = account.icon;
          const balance = summary?.accountBalances?.[account.key] || 0;
          return (
            <div key={account.key} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700 ${account.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{account.name}</p>
                  <p className={`text-lg font-bold ${balance >= 0 ? 'text-gray-900 dark:text-white' : 'text-red-600 dark:text-red-400'}`}>
                    ₹{balance.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Category Breakdown</h3>
          <div className="h-64 flex items-center justify-center">
            {Object.keys(summary?.categoryBreakdown || {}).length > 0 ? (
              <Doughnut data={categoryData} options={{ maintainAspectRatio: false }} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No data available</p>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Division Breakdown</h3>
          <div className="h-64 flex items-center justify-center">
            {(summary?.divisionBreakdown?.personal || 0) + (summary?.divisionBreakdown?.office || 0) > 0 ? (
              <Doughnut data={divisionData} options={{ maintainAspectRatio: false }} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;