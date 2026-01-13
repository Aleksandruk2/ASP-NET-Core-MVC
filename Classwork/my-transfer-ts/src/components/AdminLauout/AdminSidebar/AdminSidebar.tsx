import { NavLink } from "react-router-dom";
import linkClass from "../../LinkClass/IsActive.ts";

const AdminSidebar = () => {


    return (
        <aside className="w-64 bg-gray-900 text-white p-4">
            <h2 className="mb-6 text-xl font-bold">Адмін панель</h2>

            <nav className="space-y-2">
                <NavLink to="/AdminLayout" className={linkClass} end>
                    Dashboard
                </NavLink>

                <NavLink to="/AdminLayout/Countries" className={linkClass} end>
                    Countries
                </NavLink>

                <NavLink to="/AdminLayout/Cities" className={linkClass} end>
                    Cities
                </NavLink>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
