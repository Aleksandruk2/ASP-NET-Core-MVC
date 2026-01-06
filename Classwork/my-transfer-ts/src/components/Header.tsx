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
                            (<div className="font-medium flex items-center w-full md:flex md:w-auto md:order-1">
                                <div className="p-1 rounded hover:bg-gray-700 cursor-pointer">
                                    <div className="flex justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                             className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 md:bg-transparent md:text-primary-700 md:p-0 dark:text-white bi bi-box-arrow-right" viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                            <path fillRule="evenodd"
                                                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <NavLink
                                            className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 md:bg-transparent md:text-primary-700 md:p-0 dark:text-white"
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