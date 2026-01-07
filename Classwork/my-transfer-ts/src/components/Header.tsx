import {NavLink, Outlet} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";
import LogOutModal from "../Modal/LogOutModal.tsx";

const Header = () => {
    const { user } = useAuth();
    return (
        <>
            <header className="">
                <nav className="border-b border-gray-500 px-4 lx:px-6 py-2 dark:bg-gray-800">
                    <div className="flex flex-wrap justify-around items-center mx-auto max-w-screen-xl">
                        <div className="justify-around items-center w-full md:flex md:w-auto md:order-1">
                            <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
                                <li>
                                    <NavLink className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 md:bg-transparent md:text-primary-700 md:p-0 dark:text-white" aria-current="page" to="/">Країни</NavLink>
                                </li>
                                <li>
                                    <NavLink className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 md:bg-transparent md:text-primary-700 md:p-0 dark:text-white"
                                             to="Cities">Міста</NavLink>
                                </li>
                                <li>
                                    <NavLink className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 md:bg-transparent md:text-primary-700 md:p-0 dark:text-white"
                                             to="CreateCity">Додати місто</NavLink>
                                </li>
                            </ul>
                        </div>
                        { user ?
                            (<div className="flex items-center w-full md:flex md:w-auto md:order-1">
                                <div className="px-3">
                                    <div className="text-gray-400 rounded md:text-right">
                                        { user.firstName } {user.lastName }
                                    </div>
                                    <div className="text-gray-400 rounded md:text-right">
                                        { user.email }
                                    </div>
                                </div>
                                <div className="h-12 w-12 rounded-full overflow-hidden">
                                    <img src={user.image} width={100} alt=""/>
                                </div>
                                <LogOutModal onOpen={false}></LogOutModal>
                            </div>)
                            :
                            (<div className=" flex items-center w-full md:flex md:w-auto md:order-1">
                                <div className="p-1 px-2 rounded hover:bg-gray-700 cursor-pointer">
                                    <div>
                                        <NavLink
                                            className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 md:bg-transparent md:text-primary-700 md:p-0 dark:text-white hover:underline"
                                            to="RegisterPage">Створити обліковий запис</NavLink>
                                    </div>
                                </div>
                                <div className="p-1 px-2 rounded hover:bg-gray-700 cursor-pointer">
                                    <div>
                                        <NavLink
                                            className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 md:bg-transparent md:text-primary-700 md:p-0 dark:text-white hover:underline"
                                            to="LoginPage">Увійти</NavLink>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </nav>
            </header>

            <Outlet/>
        </>
    );
}

export default Header;