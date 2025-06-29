
import * as XLSX from 'xlsx';
import Expenses from '../models/Expenses.js';


const getAllExpenses =async (req, res) => {
    const userId = req.user._id
    try {
        const allExpenses = await Expenses.find({userId}).sort({date:-1})
        if (!allExpenses) {
            res.status(400).json({ message: 'No expenses found', success: false });
        }
        res.status(200).json({
            message: 'Expenses fetched successfully',
            success: true,
            data: allExpenses
        })
        
    } catch (error) {
        console.error("Error fetching expenses:", error);
        return res.status(500).json({ message: 'Internal server error', success: false });
        
    }
}

const deleteExpenses =async (req, res) => {
    const userId = req.user._id
    try {
        const id = req.params.id;
        const foundExpense = await Expenses.findById(id);
        if (!foundExpense) {
            return res.status(404).json({ message: 'Expense not found', success: false });}

        const deletedExpenses = await Expenses.findOneAndDelete({_id:id})      
        if (!deletedExpenses) {
            return res.status(400).json({ message: 'Expense not found', success: false });
            
        } 
        res.status(200).json({
            message: 'Expense deleted successfully',
            success: true,
           
        })
    } catch (error) {
        console.error("Error deleting expense:", error);
        return res.status(500).json({ message: 'Internal server error', success: false });
        
    }
}

const addExpenses =async (req, res) => {
    const userId = req.user._id; // Assuming user ID is stored in req.user by the auth middleware
try {
    const {amount,date, category}= req.body
    if (!amount || !date || !category) {
        return res.status(400).json({ message: 'Some fields are missing', success: false });
    }
    const newExpense = new Expenses({
        userId,
        amount,
        date,
        category
    })
    await newExpense.save();
    res.status(200).json({
        message: 'Expense added successfully',
        success: true,
        data: newExpense
    })
} catch (error) {
    console.error("Error adding expense:", error);
    return res.status(500).json({ message: 'Internal Server error', success: false });
  }
    
}




const downloadExpensesReport = async (req, res) => {
    const userId = req.user._id;
    try {
        const expenses = await Expenses.find({ userId }).sort({ date: -1 });
        if (!expenses || expenses.length === 0) {
            return res.status(400).json({ message: 'No expenses found', success: false });
        }

        const data = expenses.map(expense => ({
            amount: expense.amount,
            category: expense.category,
            date: expense.date.toISOString().split('T')[0]
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Expenses');
        XLSX.writeFile(wb, 'expenses_report.xlsx');

        res.download('expenses_report.xlsx', (err) => {
            if (err) {
                console.error("Error downloading expenses report:", err);
                return res.status(500).json({ message: 'Internal server error', success: false });
            }

            // Optional cleanup
            // fs.unlinkSync('expenses_report.xlsx');
        });

    } catch (error) {
        console.error("Error downloading expenses report:", error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};


export {getAllExpenses, deleteExpenses, addExpenses, downloadExpensesReport}