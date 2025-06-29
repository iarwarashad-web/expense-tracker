import express from 'express';
import { protect } from '../middlewares/authMW.js';
import { getAllExpenses, deleteExpenses, addExpenses, downloadExpensesReport } from '../controllers/expensesController.js';
const router = express.Router();

router.get('/get', protect, getAllExpenses)
router.delete('/:id', protect, deleteExpenses
)
router.post('/add', protect, addExpenses)
router.get('/download', protect, downloadExpensesReport)

export default router;