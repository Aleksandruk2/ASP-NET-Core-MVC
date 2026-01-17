import {useAuth} from "../hooks/useAuth.ts";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedAdminRoute = () => {
    const { isAuthenticated, isAuthChecked, isAdmin } = useAuth();

    if(!isAuthChecked) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="*" />;
    }

    if (!isAdmin) {
        return <Navigate to="*" />;
    }

    return <Outlet />;
};

export default ProtectedAdminRoute;
