import Header from "../Header/Header.tsx";
import {Outlet} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";

const MainLayout = () => {
    const {isAuthenticated} = useAuth();

    return (
        <>
            <Header />
            <main className={`min-h-screen ${isAuthenticated ? 'md:pt-20.5' : 'md:pt-18.5'}`}>
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;