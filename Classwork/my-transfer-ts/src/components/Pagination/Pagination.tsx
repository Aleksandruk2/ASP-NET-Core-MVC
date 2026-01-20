import type {IPagination} from "../../Interfaces/ISearch/IPagination.ts";
import {ArrowBigLeft, ArrowBigRight} from "lucide-react";
import {getPages} from "../../services/Search/Pagination/PaginationService.ts";


interface IPaginationProps {
    pagination: IPagination;
    onPageChange: (page: number) => void;
}

const Pagination = ({ pagination, onPageChange }: IPaginationProps) => {
    const { currentPage, totalPages } = pagination;
    const pages = getPages(currentPage, totalPages, 4);

    if (totalPages <= 1) return null;

    return (
        <>
            <div className="flex justify-center mt-4 dark:text-gray-400">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className={
                        currentPage !== 1
                        ? "p-1 rounded hover:bg-gray-700 cursor-pointer block bg-primary-700"
                        : "p-1 dark:text-gray-700"
                    }
                >
                    <ArrowBigLeft size={20}/>
                </button>

                {pages.map((p, idx) =>
                    p === "..." ? (
                        <span key={`dots-${idx}`} className="font-bold p-1 px-2">
                        ...
                    </span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => onPageChange(p)}
                            className={
                                p === currentPage
                                    ? "font-bold text-gray-200 p-1 px-2 mx-1 rounded hover:bg-gray-700 cursor-pointer block bg-gray-800"
                                    : "p-1 px-2 rounded hover:bg-gray-700 cursor-pointer block bg-primary-700"
                            }
                        >
                            {p}
                        </button>
                    )
                )}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className={
                        currentPage !== totalPages
                            ? "p-1 rounded hover:bg-gray-700 cursor-pointer block bg-primary-700"
                            : "p-1 dark:text-gray-700"
                    }
                >
                    <ArrowBigRight size={20}/>
                </button>
            </div>
        </>
    )
};

export default Pagination;
