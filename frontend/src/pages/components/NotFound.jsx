import { Link } from "react-router-dom";

export default function notFound() {
    
    return(
      <div className="flex justify-center items-center min-h-screen flex-col">
  <h1 className="text-center text-2xl font-bold">This page does not exist!</h1>
  <p>Go back to the <Link className="text-blue-600 underline" to={'/login'}>log in page </Link></p>
</div>

    )
}