import { useState, useEffect } from 'react';
import { Trash2, Edit, Filter } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    period: 'monthly',
    division: '',
    category: '',
    account: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const getCurrentDate = () => {
    const now = new Date();
    return {
      month: now.getMonth() + 1,
      year: now.getFullYear()
    };
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters.period, filters.division, filters.category, filters.account]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { month, year } = getCurrentDate();
      let url = `/transactions?period=${filters.period}`;
      
      if (filters.period === 'monthly') {
        url += `&month=${month}&year=${year}`;
      } else if (filters.period === 'yearly') {
        url += `&year=${year}`;
      }
      
      if (filters.division) url += `&division=${filters.division}`;
      if (filters.category) url += `&category=${filters.category}`;
      if (filters.account) url += `&account=${filters.account}`;

      const { data } = await api.get(url);
      if (data.success) {
        setTransactions(data.transactions);
      }
    } catch (error) {
      toast.error('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;

    try {
      const { data } = await api.delete(`/transactions/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchTransactions();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete transaction');
    }
  };

  const canEdit = (transaction) => {
    const hoursSinceCreation = (Date.now() - new Date(transaction.createdAt)) / (1000 * 60 * 60);
    return hoursSinceCreation <= 12;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-20 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilters({ ...filters, period: 'weekly' })}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filters.period === 'weekly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setFilters({ ...filters, period: 'monthly' })}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filters.period === 'monthly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setFilters({ ...filters, period: 'yearly' })}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filters.period === 'yearly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Yearly
          </button>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>

      {showFilters && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Division
              </label>
              <select
                value={filters.division}
                onChange={(e) => setFilters({ ...filters, division: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All</option>
                <option value="personal">Personal</option>
                <option value="office">Office</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All</option>
                <option value="food">Food</option>
                <option value="fuel">Fuel</option>
                <option value="movie">Movie</option>
                <option value="loan">Loan</option>
                <option value="medical">Medical</option>
                <option value="shopping">Shopping</option>
                <option value="utilities">Utilities</option>
                <option value="transport">Transport</option>
                <option value="salary">Salary</option>
                <option value="freelance">Freelance</option>
                <option value="investment">Investment</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Account
              </label>
              <select
                value={filters.account}
                onChange={(e) => setFilters({ ...filters, account: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All</option>
                <option value="cash">Cash</option>
                <option value="bank">Bank</option>
                <option value="credit-card">Credit Card</option>
                <option value="savings">Savings</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {transactions.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-12 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      transaction.type === 'income' || transaction.type === 'transfer-in'
                        ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                    }`}>
                      {transaction.type === 'transfer-in' ? 'Transfer In' : 
                       transaction.type === 'transfer-out' ? 'Transfer Out' : 
                       transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                      {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium rounded bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400">
                      {transaction.division.charAt(0).toUpperCase() + transaction.division.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium mb-1">
                    {transaction.description}
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <span>{formatDate(transaction.date)}</span>
                    <span>•</span>
                    <span>{transaction.account.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className={`text-xl font-bold ${
                      transaction.type === 'income' || transaction.type === 'transfer-in'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {transaction.type === 'income' || transaction.type === 'transfer-in' ? '+' : '-'}
                      ₹{transaction.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {canEdit(transaction) && (
                      <button
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        onClick={() => toast.info('Edit functionality coming soon')}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(transaction._id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;