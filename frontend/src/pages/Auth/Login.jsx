import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axiosInstance from "../../utils/axioxInstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../contexts/userContext.jsx";
import { use } from "react";
export default function Login() {
  const {updateUser, user} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const[password, setPassword] = useState('');
    const[error, setError] = useState(null);
  const navigate = useNavigate();
    const handleLogIn = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN ,{
        email,
        password
      })
      console.log('RESPONSE:', response.data); // Add this

      const{token , user} = response.data;
      if (token) {
        localStorage.setItem('token', token)
        updateUser(user); // Update user context with the logged-in user
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
        
      }else{
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
    }

  
    return (
        <>
      <div
  className="
  
   text-center
   bg-gradient-to-r from-blue-500 via-purple-400 to-purple-800 h-screen
   pt-20 h-96"
>
          <h1 className="text-5xl my-2">Welcome Back</h1>
          <p className="text-xl">Please log in to continue</p>

          <form  method="POST" className="  mt-5 w-4/5 mx-auto bg-white p-6 rounded shadow-md bg-pink-600">
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
              placeholder="at least 8 characters" type="password" id="password" name="password" required className="w-full p-2 border border-gray-300 rounded" />
            </div>
            {error && <p className=" text-start text-red-600 mt-2">{error}</p>}
      {loading && <p className="text-start mt-2">Logging in...</p>}
            <button onClick={handleLogIn} type="submit" className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
                  <p className="text-start mt-4"> <Link className="text-purple-700 underline" to={'/signup'}>Sign Up</Link> if you don't have an account</p>

         </form>
        </div>
        </>
    )
}