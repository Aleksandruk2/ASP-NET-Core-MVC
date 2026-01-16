import Header from "../Header/Header.tsx";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-21.5">
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;