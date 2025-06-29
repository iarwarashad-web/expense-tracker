import jwt from 'jsonwebtoken'; 
import User from '../models/User.js'; 

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
}

const loginUser= async (req, res) => {
    const {email, password} = req.body;
     if ( !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' , success: false });
        
    }
    try {
        const user = await User.findOne({email:email})
        if(!user ||!await user.comparePassword(password)){
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }
        res.status(200).json({
            success:true,
            message: "User logged in successfully",
            token: generateToken(user),
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        })
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
        
    }
}


const regitserUser= async (req, res) => {
    const {fullName, email, password} = req.body
    if (!fullName|| !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' , success: false });
        
    }
    try {
        const existingUser = await User.findOne({email: email});
        if (existingUser) {
            return res.status(400).json({message:"this email is already registered" , success: false});
        }
        
        const user = await User.create({
            fullName, 
            email,
            password
        })
        res.status(201).json({
            message:"user created successfully",
            success: true,
            token: generateToken(user._id)
        })
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}


const getUserInfo= async (req, res) => {
   try {
     const user =await User.findById(req.user.id).select("-password");
    if(!user){
        return res.status(400).json({
            success: false,
            message: "User not found"
        })
    }

    res.status(200).json({
        success:true,
        message:user
     
    })
   } catch (error) {
        console.error("Error getting user:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    
   }
}

export { loginUser, regitserUser , getUserInfo}
