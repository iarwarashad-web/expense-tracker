import { UserContext } from "./userContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({children}) {
    const {user} = useContext(UserContext)

    if (!user) {
        return <Navigate to={'/login'} replace/>
    }

    return(
        {children}
    )
}