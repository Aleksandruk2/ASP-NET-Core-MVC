import {useEffect, useState} from "react";
import {SearchIcon} from "lucide-react";
import {UserSearchAsync} from "../../services/Search/UserSearchService.ts";
import * as React from "react";
import PageBreadcrumb from "../../admin/components/common/PageBreadCrumb.tsx";
import UserSearchTable from "./Tables/UserSearchTable.tsx";
import type {IUserSearchResult} from "../../Interfaces/ISearch/IUserSearchResult.ts";
import type {ISearchResult} from "../../Interfaces/ISearch/ISearchResult.ts";
import Pagination from "../../components/Pagination/Pagination.tsx";

const UserSearch = () => {
    const [value, setValue] = useState("");
    const [users, setUsers] = useState<IUserSearchResult[] | null>(null);
    const [page, setPage] = useState(1);
    const [result, setResult] = useState<ISearchResult<IUserSearchResult> | null>(null);

    useEffect(() => {
        (async () => {
            const data = await UserSearchAsync({
                name: value,
                startDate: undefined,
                endDate: undefined,
                page: page,
                itemsPerPage: undefined,
            });
            setResult(data);
            setUsers(data.items);
        })();

    }, [page]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPage(1);
        const data = await UserSearchAsync({
            name: value,
            startDate: undefined,
            endDate: undefined,
            page: page,
            itemsPerPage: undefined,
        });
        setResult(data);
        setUsers(data.items);
    }
    return(
        <>
            <PageBreadcrumb pageTitle="User Search" />
            <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
                <div className="flex items-center justify-start">
                    <form onSubmit={onSubmit} className="w-full max-w-xl">
                        <h2 className="text-base/7 font-semibold text-white">Пошук користувачів</h2>
                        <div className="mt-10">
                            <div className="sm:col-span-3 mb-2">
                                <div className="mt-2 flex space-x-1">
                                    <input
                                        placeholder="Пошук"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        type="text"
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                    <button
                                        type="submit"
                                        className="flex justify-center cursor-pointer rounded-md bg-indigo-500 hover:bg-indigo-400 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    >
                                        <SearchIcon className="w-5 h-5 me-1"/>
                                        Пошук
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <UserSearchTable users={users}/>
                {result && (
                    <>
                        <Pagination
                            pagination={result.pagination}
                            onPageChange={setPage}
                        />
                    </>
                )}
            </div>

        </>
    )
}

export default UserSearch;