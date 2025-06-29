import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const protect = async (req,res, next) => {
    let token= req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' }); 
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //returns the decoded payload
        req.user = await User.findById(decoded.id).select('-password'); // Exclude
        next();
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        return res.status(500).json({ message: 'Internal server error' });
        
    }
}

export { protect };