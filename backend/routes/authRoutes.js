import express from 'express';
import { protect } from '../middlewares/authMW.js';
const router = express.Router();
import { loginUser, regitserUser , getUserInfo} from '../controllers/authController.js';

// Route for user sign-up

router.post('/register', regitserUser);

router.post('/login', loginUser)

router.get('/getUser',protect , getUserInfo);

export default router;