import {NavLink} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";
import LogOutModal from "../../Modal/LogOutModal.tsx";
import linkClass from "../LinkClass/IsActive.ts";
import {ThemeToggleButton} from "../../admin/components/common/ThemeToggleButton.tsx";

const Header = () => {
    const { user, isAdmin } = useAuth();

    const headerNavLink = ({isActive}: {isActive: boolean}) =>
        "p-1 md:p-4 md:px-2 rounded cursor-pointer block md:bg-transparent" + linkClass({isActive});

    return (
        <>
            <header className="md:fixed z-100 top-0 left-0 w-full">
                <nav className="border-b border-gray-500 px-2 lx:px-6 py-2 bg-gray-200 dark:bg-gray-800">
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
                                <li>
                                    <NavLink className={headerNavLink}
                                             to="transportations">Поїздки</NavLink>
                                </li>
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
                        <div className="md:pe-1 md:block hidden ">
                            <ThemeToggleButton />
                        </div>
                        { user ?
                            (<div className="w-full md:flex md:w-auto md:order-1 mt-1 md:mt-0 md:space-y-0 space-y-1 md:space-x-1">
                                <NavLink to="Profile"
                                    className={({isActive}) => `md:px-4 cursor-pointer items-center flex w-full ${linkClass({isActive})}`}>
                                    <div className="pe-3">
                                        <div className="rounded md:text-right">
                                            { user.firstName } {user.lastName }
                                        </div>
                                        {/*<div className="rounded md:text-right">*/}
                                        {/*    { user.email }*/}
                                        {/*</div>*/}
                                    </div>
                                    <div className="h-10 w-10 rounded-full overflow-hidden">
                                        <img src={user.image} alt={user.image} className="h-full object-cover"/>
                                    </div>
                                </NavLink>
                                <div className="md:block hidden ">
                                    <LogOutModal onOpen={false}></LogOutModal>
                                </div>
                                <div className="flex items-center justify-between space-x-1 px-3 py-1 md:hidden border border-gray-700 border-dashed rounded-lg">
                                    <ThemeToggleButton />
                                    <LogOutModal onOpen={false}></LogOutModal>
                                </div>
                            </div>)
                            :
                            (<div className="md:flex items-center w-full md:flex md:w-auto md:order-1 md:space-y-0 space-y-1 md:space-x-1">
                                <div>
                                    <NavLink
                                        className={({isActive}) => `${linkClass({isActive})} md:p-4 rounded cursor-pointer rounded md:bg-transparent hover:underline`}
                                        to="Register">Створити обліковий запис</NavLink>
                                </div>
                                <div>
                                    <NavLink
                                        className={({isActive}) => `${linkClass({isActive})} md:p-4 rounded cursor-pointer rounded md:bg-transparent hover:underline`}
                                        to="Login">Увійти</NavLink>
                                </div>
                                <div className="flex items-center justify-between space-x-1 px-3 py-1 md:hidden border border-gray-700 border-dashed rounded-lg">
                                    <ThemeToggleButton />
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