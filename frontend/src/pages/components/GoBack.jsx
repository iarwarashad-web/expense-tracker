import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
export default function GoBack() {
    
    return(
        <Link to={'/dashboard'} className="flex  items-center bg-purple-800 text-white rounded-md w-21">
      <IoMdArrowBack className="" />  <p> 
Go Back</p>
</Link>
    )
}