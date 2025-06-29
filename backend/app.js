import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import incomeRoutes from './routes/incomeRoute.js';
import expensesRoute from './routes/expensesRoutes.js';
import dashboadRoutes from './routes/dashboardRoutes.js';
const app = express();

dotenv.config()
app.use(express.json());
connectDB();

app.use(cors());

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/income', incomeRoutes);
app.use('/api/v1/expenses', expensesRoute);
app.use('/api/v1/dashboard', dashboadRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT,(req, res)=>{
    console.log(`Server is running on port ${PORT}`);
})