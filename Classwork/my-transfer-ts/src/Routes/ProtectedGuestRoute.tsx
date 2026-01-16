import {useAuth} from "../hooks/useAuth.ts";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedGuestRoute = () => {
    const { isAuthenticated, isAuthChecked } = useAuth();

    if(!isAuthChecked) {
        return null;
    }

    console.log("Check is:",isAuthChecked, "isAuthenticated is", isAuthenticated,);
    if (isAuthenticated) {
        return <Navigate to="Profile" />;
    }

    return <Outlet />;
};

export default ProtectedGuestRoute;
