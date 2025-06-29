
import Income from '../models/Income.js';
import User from '../models/User.js'; 
import * as XLSX from 'xlsx';


const getAllIncomes =async (req, res) => {
    const userId = req.user._id
    try {
        const allIncomes = await Income.find({userId}).sort({date:-1})
        if (!allIncomes) {
            res.status(400).json({ message: 'No incomes found', success: false });
        }
        res.status(200).json({
            message: 'Incomes fetched successfully',
            success: true,
            data: allIncomes
        })
        
    } catch (error) {
        console.error("Error fetching incomes:", error);
        return res.status(500).json({ message: 'Internal server error', success: false });
        
    }
}


 // Controller
const deleteIncome = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  try {
    const deleted = await Income.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
      return res.status(404).json({ message: 'Income not found', success: false });
    }
    return res.status(200).json({ message: 'Income deleted', success: true });
  } catch (error) {
    return res.status(400).json({ message: 'Bad Request', success: false });
  }
};

const addIncome =async (req, res) => {
    const userId = req.user._id; // Assuming user ID is stored in req.user by the auth middleware
try {
    const {amount,date, source}= req.body
    if (!amount || !date || !source) {
        return res.status(400).json({ message: 'Some fields are missing', success: false });
    }
    const newIncome = new Income({
        userId,
        amount,
        date,
        source
    })
    await newIncome.save();
    res.status(200).json({
        message: 'Income added successfully',
        success: true,
        data: newIncome
    })
} catch (error) {
    console.error("Error adding income:", error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
    
}





const downloadIncomeReport =async (req, res) => {
    const userId = req.user._id;
    try {
        const incomes = await Income.find({userId}).sort({date:-1});
        if (!incomes) {
            return res.status(400).json({ message: 'No incomes found', success: false });
        }
        const data = incomes.map(income =>(
            { 
                amount: income.amount,
                source: income.source,
                date: income.date.toISOString().split('T')[0] // Format date to YYYY
            }

        )
    )
    
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(data);
            XLSX.utils.book_append_sheet(wb, ws, 'Incomes');
            XLSX.writeFile(wb, 'incomes_report.xlsx');
            res.download('incomes_report.xlsx', (err) => {
                if (err) {
                    console.error("Error downloading income report:", err);
                    return res.status(500).json({ message: 'Internal server error', success: false });
                }
            });
        
    } catch (error) {
        console.error("Error downloading income report:", error);
        return res.status(500).json({ message: 'Internal server error', success: false });
        
    }
}




export { getAllIncomes, deleteIncome, addIncome, downloadIncomeReport }