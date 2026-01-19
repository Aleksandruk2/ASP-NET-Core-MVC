import {useAuth} from "../hooks/useAuth.ts";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedAdminRoute = () => {
    const { isAuthenticated, isAuthChecked, isAdmin } = useAuth();

    if(!isAuthChecked) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="*" replace/>;
    }

    if (!isAdmin) {
        return <Navigate to="*" replace/>;
    }

    return <Outlet />;
};

export default ProtectedAdminRoute;
