import {NavLink, Outlet} from "react-router-dom";

const Header = () => {
    return (
        <>
            <header className="">
                <nav className="border-b border-gray-500 px-4 lx:px-6 py-2.5 dark:bg-gray-800">
                    <div className="flex flex-wrap justify-around items-center mx-auto max-w-screen-xl">
                        <div className="justify-around items-center w-full md:flex md:w-auto md:order-1">
                            <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
                                <li>
                                    <NavLink className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 md:bg-transparent md:text-primary-700 md:p-0 dark:text-white" aria-current="page" to="/">Країни</NavLink>
                                </li>
                                <li>
                                    <NavLink className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 md:bg-transparent md:text-primary-700 md:p-0 dark:text-white"
                                             to="cities">Міста</NavLink>
                                </li>
                                <li>
                                    <NavLink className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 md:bg-transparent md:text-primary-700 md:p-0 dark:text-white"
                                             to="createCity">Додати місто</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <Outlet/>
        </>
    );
}

export default Header;