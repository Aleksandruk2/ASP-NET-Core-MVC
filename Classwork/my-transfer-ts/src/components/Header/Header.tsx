import {NavLink} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";
import LogOutModal from "../../Modal/LogOutModal.tsx";
import linkClass from "../LinkClass/IsActive.ts";

const Header = () => {
    const { user, isAdmin } = useAuth();

    const headerNavLink = ({isActive}: {isActive: boolean}) =>
        "p-1 md:p-4 md:px-2 rounded hover:bg-gray-700 cursor-pointer block rounded bg-primary-700 md:bg-transparent" + linkClass({isActive});

    return (
        <>
            <header className="fixed z-99999 top-0 left-0 w-full">
                <nav className="border-b border-gray-500 px-2 lx:px-6 py-2 dark:bg-gray-800">
                    <div className="text-gray-300 flex flex-wrap justify-around items-center mx-auto max-w-screen-xl">
                        <div className="justify-around items-center w-full md:flex md:w-auto md:order-1">
                            <ul className={"flex flex-col mt-4 font-medium md:flex-row md:space-x-1 md:space-y-0 space-y-1 md:mt-0"}>
                                <li>
                                    <NavLink className={headerNavLink}
                                             aria-current="page"
                                             to="/">Країни</NavLink>
                                </li>
                                <li>
                                    <NavLink className={headerNavLink}
                                             to="Cities">Міста</NavLink>
                                </li>
                                {/*<li>*/}
                                {/*    <NavLink className={headerNavLink}*/}
                                {/*             to="CreateCity">Додати місто</NavLink>*/}
                                {/*</li>*/}
                                { isAdmin && (
                                    <li>
                                        <NavLink className={headerNavLink}
                                                 to="Admin">Моя Адмін панель</NavLink>
                                    </li>
                                )}
                                { isAdmin && (
                                    <li>
                                        <NavLink className={headerNavLink}
                                                 to="adminPanel">Адмін панель</NavLink>
                                    </li>
                                )}
                            </ul>
                        </div>
                        { user ?
                            (<div className="flex items-center justify-between w-full md:flex md:w-auto md:order-1 mt-1 md:mt- md:space-y-0 space-y-1 md:space-x-1">
                                <NavLink to="Profile"
                                    className={({isActive}) => `md:px-4 cursor-pointer items-center flex w-full ${linkClass({isActive})}`}>
                                    <div className="pe-3">
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
                                </NavLink>

                                <LogOutModal onOpen={false}></LogOutModal>
                            </div>)
                            :
                            (<div className="md:flex items-center w-full md:flex md:w-auto md:order-1 md:space-y-0 space-y-1 md:space-x-1">
                                <div>
                                    <NavLink
                                        className={({isActive}) => `${linkClass({isActive})} md:p-4 rounded hover:bg-gray-700 cursor-pointer text-white rounded bg-primary-700 md:bg-transparent md:text-primary-700 dark:text-white hover:underline`}
                                        to="Register">Створити обліковий запис</NavLink>
                                </div>
                                <div>
                                    <NavLink
                                        className={({isActive}) => `${linkClass({isActive})} md:p-4 rounded hover:bg-gray-700 cursor-pointer text-white rounded bg-primary-700 md:bg-transparent md:text-primary-700 dark:text-white hover:underline`}
                                        to="Login">Увійти</NavLink>
                                </div>
                            </div>)
                        }
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Header;