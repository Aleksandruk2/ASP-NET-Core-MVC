import {NavLink} from "react-router-dom";12

const CreateCitySuccess = () => {
    return (
        <>
            <div className="text-center flex items-center justify-center h-screen">
                <div>
                    <div className="text-green-500 mb-3 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor"
                             className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold text-white">
                        Місто успішно додано.
                    </h1>
                    <NavLink className="block py-2 pr-4 pl-3 text-blue-300 rounded bg-primary-700 md:bg-transparent md:text-primary-700 md:p-0 dark:text-blue-300"
                             to="/cities">Перейти до сиписку міст</NavLink>
                </div>
            </div>
        </>
    );
}

export default CreateCitySuccess;