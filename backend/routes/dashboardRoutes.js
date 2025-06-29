import {getDashboardData} from "../controllers/dashboardController.js";
import express from 'express';
import { protect } from '../middlewares/authMW.js';
const router = express.Router();

router.get('/', protect, getDashboardData);

export default router;