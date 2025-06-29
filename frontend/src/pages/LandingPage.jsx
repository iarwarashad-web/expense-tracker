import NavBar from "../layouts/NavBar";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <NavBar />

      <div className="relative h-screen">
        {/* Background Image with opacity */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-80 z-0"></div>

        {/* Gradient Overlay if needed */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-400 to-purple-800 opacity-80 z-1"></div>

        {/* Foreground Content */}
        <main className="w-4/5 mx-auto flex flex-col justify-center items-center h-full relative z-10">
          <h1 className="text-white text-4xl font-bold mb-6 text-center">
            Manage Your Income and Expenses
          </h1>

          <div className="flex gap-4">
            <Link className="bg-purple-800 text-white rounded-md px-4 py-2" to="/login">
              Log In
            </Link>
            <Link className="bg-purple-800 text-white rounded-md px-4 py-2" to="/signup">
              Sign Up
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
