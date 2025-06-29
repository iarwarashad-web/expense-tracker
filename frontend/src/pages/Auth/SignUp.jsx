import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import axiosInstance from '../../utils/axioxInstance';
import { API_PATHS } from '../../utils/apiPath';
import { UserContext } from "../contexts/userContext.jsx";

export default function SignUp() {
  const{updateUser} = React.useContext(UserContext);
    const [fullName, setFullName] = React.useState('');
    const [loading, setLoading] = React.useState(false)
    const [email, setEmail] = React.useState('');       
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();
 const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {setError('Passwords do not match'); return;}else {
            setError(null);
        }
        if (password.length < 8 || confirmPassword.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }else{setError(null);}
        if(!fullName){setError('Full Name is required'); return;}
        if(!email){setError('Email is required'); return;}

        try {
          setLoading(true)
          const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
            fullName,
            email,
            password
          })
          const {token, user}= response.data
          if (token) {
            localStorage.setItem('token', token)
            updateUser(user)
            navigate('/dashboard');
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            setError(error.response.data.message || 'Bad Request');
            
          }else if (error.response && error.response.status === 500) {
            setError(error.response.data.message || 'Internal Server Error');
          
        }else if (error.code === 'ECONNABORTED') {
            setError('Request timed out - please try again later');
          }
       
      } finally{
        setLoading(false)
      }

    }
     return (
        <>
      <div
  className="
  
  
   bg-gradient-to-r from-blue-500 via-purple-400 to-purple-800 h-screen
   pt-20 h-96"
>
          <h1 className=" text-center text-5xl my-2">Welcome,</h1>
          <p className=" text-center text-xl">Please create an account to continue</p>

          <form method="POST" className=" w-11/12 mt-5 md:w-3/5 mx-auto bg-white p-6 rounded shadow-md bg-pink-600">
              <div className="mb-4 ">
              <label htmlFor="fullName" className="block text-left mb-2">Full Name</label>
              <input
              value={fullName}
              req
                onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe" type="string" id="fullName" name="fullName" required 
              className="w-full p-2 border border-gray-300 rounded" />
            
            </div>
            <div className="mb-4 ">
              <label htmlFor="email" className="block text-left mb-2">Email</label>
              <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@gmail.com" type="email" id="email" name="email" required className="w-full p-2 border border-gray-300 rounded" />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-left mb-2">Password</label>
              <input
              value={password}
                minLength={8}
                    onChange={(e) => setPassword(e.target.value)}
              placeholder='At least 8 character' type="password" id="password" name="password" required className="w-full p-2 border border-gray-300 rounded" />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-left mb-2">Confirm Password</label>
              <input
              value={confirmPassword}
                minLength={8}
                    onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='At least 8 character' type="password" id="confirmPassword" name="confirmPassword" required className="w-full p-2 border border-gray-300 rounded" />
              <p className='text-red-600'>{error}</p>
            </div>
          {loading && <p className='text-xl py-2 font-bold text-center'>loading...</p>}
            <button onClick={handleSignUp} type="submit" className=" w-full bg-purple-700 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
                                  <p className="text-left my-2 text-start"> <Link className="text-purple-700 underline" to={'/login'}>Log in</Link> if you already have an account</p>

         </form>
        </div>
        </>
    )
}