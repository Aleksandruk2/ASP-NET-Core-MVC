import {useState} from "react";
import {SearchIcon} from "lucide-react";
import {UserSearchAsync} from "../../services/Search/UserSearchService.ts";
import * as React from "react";

const UserSearch = () => {
    const [value, setValue] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await UserSearchAsync({
            name: value,
            startDate: undefined,
            endDate: undefined,
            page: undefined,
            itemsPerPage: undefined,
        })
    }
    return(
        <>
            <div className="flex items-center justify-center w-full">
                <form onSubmit={onSubmit}>
                    {/*<h2 className="text-base/7 font-semibold text-white">Відновленя паролю</h2>*/}
                    {/*<p className="mt-1 text-sm/6 text-gray-400">Будь ласка, введіть та підтвердіть ваш новий пароль.</p>*/}
                    <div className="mt-10">
                        <div className="sm:col-span-3 mb-2 min-w-104">
                            <div className="mt-2">
                                <input
                                    placeholder="Пошук"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    type="text"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="pb-3 mt-6 flex items-center justify-center gap-x-6">
                        <button
                            type="submit"
                            className="flex justify-center w-full cursor-pointer rounded-md bg-indigo-500 hover:bg-indigo-400 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            <SearchIcon className="w-5 h-5 me-1"/>
                            Пошук
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UserSearch;