import express from 'express';
import { protect } from '../middlewares/authMW.js';
import { getAllIncomes, deleteIncome, addIncome, downloadIncomeReport } from '../controllers/incomeController.js';
const router = express.Router();

router.get('/get', protect, getAllIncomes)
router.delete('/:id', protect, deleteIncome
)
router.post('/add', protect, addIncome)
router.get('/download', protect, downloadIncomeReport)

export default router;