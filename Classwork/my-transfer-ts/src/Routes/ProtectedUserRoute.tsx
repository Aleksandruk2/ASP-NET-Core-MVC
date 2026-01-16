import {useAuth} from "../hooks/useAuth.ts";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedGuestRoute = () => {
    const { isAuthenticated, isAuthChecked } = useAuth();

    if(!isAuthChecked) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="Login" />;
    }

    return <Outlet />;
};

export default ProtectedGuestRoute;
