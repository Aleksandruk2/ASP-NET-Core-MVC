import type {IUserSearchResult} from "../../../Interfaces/ISearch/IUserSearchResult.ts";
import {Table,
    TableBody,
    TableCell, TableHeader,
    TableRow
} from "../../../admin/components/ui/table";
import Badge from "../../../admin/components/ui/badge/Badge.tsx";
import React from "react";


// Define the table data using the interface
// const tableData: IUserSearchResult[] = [
//     {
//         id: 1,
//         fullName: "Петрович Іван",
//         email: "user@gmail.com",
//         image: "/images/user/user-18.jpg",
//         roles: ["User"]
//     },
//     {
//         id: 2,
//         fullName: "Трясун Потап",
//         email: "Potap@gmail.com",
//         image: "/images/user/user-17.jpg",
//         roles: ["User"]
//     },
//     {
//         id: 3,
//         fullName: "Сідляк Борислава",
//         email: "Borislava@gmail.com",
//         image: "/images/user/user-21.jpg",
//         roles: ["User", "Admin"]
//     },
//     {
//         id: 4,
//         fullName: "Янюк Мечислав",
//         email: "Mechislav@gmail.com",
//         image: "/images/user/user-27.jpg",
//         roles: ["User"]
//     },
//     {
//         id: 5,
//         fullName: "Коцюбиньска Юлія",
//         email: "Yuliya@gmail.com",
//         image: "/images/user/user-12.jpg",
//         roles: ["User"]
//     },
// ];

interface IUserSearchTableProps {
    users: IUserSearchResult[] | null;
}

const UserSearchTable: React.FC<IUserSearchTableProps> = (props) => {
    return (
        <>
            {props.users && (
                <div>
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                        <div className="max-w-full overflow-x-auto">
                            <Table>
                                {/* Table Header */}
                                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                    <TableRow>
                                        <TableCell
                                            isHeader
                                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                        >
                                            User
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                        >
                                            Email
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                        >
                                            Roles
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                        >
                                            ID
                                        </TableCell>
                                    </TableRow>
                                </TableHeader>

                                {/* Table Body */}
                                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                    {props.users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="px-5 py-4 sm:px-6 text-start">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 overflow-hidden rounded-full">
                                                        <img
                                                            width={40}
                                                            height={40}
                                                            src={user.image}
                                                            alt={user.fullName}
                                                        />
                                                    </div>
                                                    <div>
                                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {user.fullName}
                                          </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {user.email}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                <div className="space-x-1">
                                                    {
                                                        user.roles.map((role) => (
                                                            <Badge
                                                                key={user.id}
                                                                size="sm"
                                                                color={
                                                                    role === "Admin"
                                                                        ? "success"
                                                                        : role === "User"
                                                                            ? "warning"
                                                                            : "error"
                                                                }
                                                            >
                                                                {role}
                                                            </Badge>
                                                        ))
                                                    }
                                                </div>

                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                {user.id}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserSearchTable;