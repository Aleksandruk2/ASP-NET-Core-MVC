import {useEffect, useState} from "react";
import {TransportationsList} from "../../services/TransportationsService/TransportationsService.ts";
import type {ITransportationsItem} from "../../Interfaces/ITransportations/ITransportationsItem.ts";
import TransportationsTable from "./Tables/TransportationsTable.tsx";

const Transportations = () => {
    const [list, setList] = useState<ITransportationsItem[] | null>(null);

    useEffect(() => {
        (async () => {
            const data = await TransportationsList();
            setList(data);
        })();
    }, []);

    return (
        <>
            <div className="p-4 md:p-6 mx-auto max-w-(--breakpoit-2xl)">
                <div className="min-h-[calc(100vh-122px)] p-20.5 rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
                    <h2 className="text-gray-800 dark:text-white font-semibold ">Поїздки</h2>
                    <div className="mt-10">
                        <div className="sm:col-span-3 mb-2">
                            <TransportationsTable transportations={list} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Transportations;