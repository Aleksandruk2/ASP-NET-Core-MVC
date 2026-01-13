import {Outlet} from "react-router-dom";
import AdminSidebar from "./AdminSidebar/AdminSidebar.tsx";

const AdminLayout = () => {
    return (
        <>
            <div className="flex min-h-screen bg-gray-700">
                <AdminSidebar/>

                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default AdminLayout;