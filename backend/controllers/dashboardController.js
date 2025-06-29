import Income from "../models/Income.js";
import Expenses from "../models/Expenses.js";
import mongoose from "mongoose";

const getDashboardData = async (req, res) => {
    const userId = req.user._id;
    const userObjectId = new mongoose.Types.ObjectId(String(userId));
    try {
        // Fetch total income
        const totalIncome = await Income.aggregate([
            { $match: { userId:userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

     console.log("Total Income:", totalIncome);
        // Fetch total expenses
        const totalExpenses = await Expenses.aggregate([
            { $match: {  userId:userObjectId  } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
console.log("Total Expenses:", totalExpenses);
        // Fetch last 5 incomes
        const last5Incomes = await Income.find({  userId:userObjectId  }).sort({ date: -1 }).limit(5);

        // Fetch last 5 expenses
        const last5Expenses = await Expenses.find({ userId }).sort({ date: -1 }).limit(5);
        const totaBalance = totalIncome[0]?.total - totalExpenses[0]?.total || 0;
        // last 30 days of income and expenses
        const last30DaysIncome = await Income.find({userId , date:{$gt:new Date(Date.now()- 30 * 24 * 60 * 60 * 1000)}}).sort({ date: -1 });
        const last30DaysExpenses = await Expenses.find({userId, date:{$gt: new Date(Date.now()-30*24*60*60*1000)}}).sort({date:-1})
         const formattedIncomes = last5Incomes.map(tx => ({ ...tx._doc, type: 'income' }));
    const formattedExpenses = last5Expenses.map(tx => ({ ...tx._doc, type: 'expense' }));

    const last5Transactions = [...formattedIncomes, ...formattedExpenses]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
        res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully",
            data: {
                totalIncome: totalIncome[0]?.total || 0,
                totalExpenses: totalExpenses[0]?.total || 0,
                last5Incomes,
                totaBalance,
                last5Expenses,
                last30DaysIncome,
                last30DaysExpenses, last5Transactions
            }
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export  {getDashboardData} ;