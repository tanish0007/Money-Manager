import Transaction from '../models/Transaction.js';

const getDateRange = (period, month, year, week, startDate, endDate) => {
  const now = new Date();
  let start, end;

  if (period === 'weekly') {
    const weekNum = week || getWeekNumber(now);
    const yearNum = year || now.getFullYear();
    const firstDayOfYear = new Date(yearNum, 0, 1);
    const daysOffset = (weekNum - 1) * 7;
    start = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + daysOffset));
    end = new Date(start);
    end.setDate(start.getDate() + 6);
  } else if (period === 'monthly') {
    const monthNum = month ? month - 1 : now.getMonth();
    const yearNum = year || now.getFullYear();
    start = new Date(yearNum, monthNum, 1);
    end = new Date(yearNum, monthNum + 1, 0);
  } else if (period === 'yearly') {
    const yearNum = year || now.getFullYear();
    start = new Date(yearNum, 0, 1);
    end = new Date(yearNum, 11, 31);
  } else if (period === 'custom' && startDate && endDate) {
    start = new Date(startDate);
    end = new Date(endDate);
  } else {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
    end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  }

  end.setHours(23, 59, 59, 999);
  return { start, end };
};

const getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

export const createTransaction = async (req, res) => {
  try {
    const { type, amount, category, division, account, description, date } = req.body;

    if (!type || !amount || !category || !division || !account || !description || !date) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    const transaction = await Transaction.create({
      userId: req.user._id,
      type,
      amount,
      category,
      division,
      account,
      description,
      date: new Date(date)
    });

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      transaction
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { 
      period, 
      month, 
      year, 
      week, 
      division, 
      category, 
      account, 
      startDate, 
      endDate,
      limit,
      sort 
    } = req.query;

    // Build base query
    const query = {
      userId: req.user._id
    };

    // Add date range filter only if period is specified
    if (period) {
      const { start, end } = getDateRange(period, month, year, week, startDate, endDate);
      query.date = { $gte: start, $lte: end };
    }

    // Add optional filters
    if (division) query.division = division;
    if (category) query.category = category;
    if (account) query.account = account;

    // Build the query
    let transactionQuery = Transaction.find(query);

    // Handle sorting
    if (sort) {
      // Support sort parameter like "-date" for descending or "date" for ascending
      transactionQuery = transactionQuery.sort(sort);
    } else {
      // Default sort by date descending
      transactionQuery = transactionQuery.sort({ date: -1 });
    }

    // Handle limit
    if (limit) {
      const limitNum = parseInt(limit);
      if (limitNum > 0) {
        transactionQuery = transactionQuery.limit(limitNum);
      }
    }

    const transactions = await transactionQuery;

    res.json({
      success: true,
      transactions,
      count: transactions.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transaction not found' 
      });
    }

    res.json({
      success: true,
      transaction
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transaction not found' 
      });
    }

    const hoursSinceCreation = (Date.now() - transaction.createdAt) / (1000 * 60 * 60);

    if (hoursSinceCreation > 12) {
      return res.status(403).json({ 
        success: false, 
        message: 'Cannot edit transaction after 12 hours' 
      });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Transaction updated successfully',
      transaction: updatedTransaction
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transaction not found' 
      });
    }

    await Transaction.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Transaction deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getDashboardSummary = async (req, res) => {
  try {
    const { period, month, year, week, startDate, endDate } = req.query;

    const { start, end } = getDateRange(period, month, year, week, startDate, endDate);

    const transactions = await Transaction.find({
      userId: req.user._id,
      date: { $gte: start, $lte: end }
    });

    let totalIncome = 0;
    let totalExpense = 0;
    const accountBalances = {
      cash: 0,
      bank: 0,
      'credit-card': 0,
      savings: 0
    };
    const categoryBreakdown = {};
    const divisionBreakdown = {
      personal: 0,
      office: 0
    };

    transactions.forEach(transaction => {
      if (transaction.type === 'income' || transaction.type === 'transfer-in') {
        totalIncome += transaction.amount;
        accountBalances[transaction.account] += transaction.amount;
      } else if (transaction.type === 'expense' || transaction.type === 'transfer-out') {
        totalExpense += transaction.amount;
        accountBalances[transaction.account] -= transaction.amount;
      }

      if (categoryBreakdown[transaction.category]) {
        categoryBreakdown[transaction.category] += transaction.amount;
      } else {
        categoryBreakdown[transaction.category] = transaction.amount;
      }

      divisionBreakdown[transaction.division] += transaction.amount;
    });

    const balance = totalIncome - totalExpense;

    res.json({
      success: true,
      summary: {
        totalIncome,
        totalExpense,
        balance,
        accountBalances,
        categoryBreakdown,
        divisionBreakdown
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getTransactionHistory = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const total = await Transaction.countDocuments({ userId: req.user._id });
    const transactions = await Transaction.find({ userId: req.user._id })
      .sort({ date: -1 })
      .limit(limit)
      .skip(skip);

    res.json({
      success: true,
      transactions,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const transferBetweenAccounts = async (req, res) => {
  try {
    const { fromAccount, toAccount, amount, description, date } = req.body;

    if (!fromAccount || !toAccount || !amount || !description || !date) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    if (fromAccount === toAccount) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot transfer to the same account' 
      });
    }

    const transferId = `TRF-${Date.now()}`;

    const transactionOut = await Transaction.create({
      userId: req.user._id,
      type: 'transfer-out',
      amount,
      category: 'transfer',
      division: 'personal',
      account: fromAccount,
      description,
      date: new Date(date),
      transferId
    });

    const transactionIn = await Transaction.create({
      userId: req.user._id,
      type: 'transfer-in',
      amount,
      category: 'transfer',
      division: 'personal',
      account: toAccount,
      description,
      date: new Date(date),
      transferId
    });

    res.status(201).json({
      success: true,
      message: 'Transfer completed successfully',
      transactions: [transactionOut, transactionIn]
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};