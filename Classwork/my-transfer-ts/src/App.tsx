import './App.css'
import {useEffect, useState} from "react";

function App() {

    interface Country {
        id: number;
        name: string;
        code: string;
        slug: string;
        image: string;
    }

    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        const url = "https://karapus.itstep.click/api/Countries";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("Server data", data)
                setCountries(data);
            });
    },[]);

    return (
        <>
            {/*<div className="flex flex-col">*/}
            {/*    <div className="-m-1.5 overflow-x-auto">*/}
            {/*        <div className="p-1.5 min-w-full inline-block align-middle">*/}
            {/*            <div className="overflow-hidden">*/}
            {/*                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">*/}
            {/*                    <thead>*/}
            {/*                    <tr>*/}
            {/*                        <th scope="col"*/}
            {/*                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">*/}
            {/*                            Назва*/}
            {/*                        </th>*/}
            {/*                        <th scope="col"*/}
            {/*                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">*/}
            {/*                            Код*/}
            {/*                        </th>*/}
            {/*                        <th scope="col"*/}
            {/*                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">*/}
            {/*                            Slug*/}
            {/*                        </th>*/}
            {/*                        <th scope="col"*/}
            {/*                            className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">*/}
            {/*                            Action*/}
            {/*                        </th>*/}
            {/*                    </tr>*/}
            {/*                    </thead>*/}
            {/*                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">*/}
            {/*                    /!*<tr>*!/*/}
            {/*                    /!*    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-500">*!/*/}
            {/*                    /!*        -*!/*/}
            {/*                    /!*    </td>*!/*/}
            {/*                    /!*    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-500">*!/*/}
            {/*                    /!*        -*!/*/}
            {/*                    /!*    </td>*!/*/}
            {/*                    /!*    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-500">*!/*/}
            {/*                    /!*        -*!/*/}
            {/*                    /!*    </td>*!/*/}
            {/*                    /!*    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">*!/*/}
            {/*                    /!*        <button type="button"*!/*/}
            {/*                    /!*                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">Delete*!/*/}
            {/*                    /!*        </button>*!/*/}
            {/*                    /!*    </td>*!/*/}
            {/*                    /!*</tr>*!/*/}
            {/*                    {countries.map(country => (*/}
            {/*                        <tr key={country.id}>*/}
            {/*                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-500">*/}
            {/*                                {country.name}*/}
            {/*                            </td>*/}
            {/*                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-500">*/}
            {/*                                {country.code}*/}
            {/*                            </td>*/}
            {/*                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-500">*/}
            {/*                                {country.image}*/}
            {/*                            </td>*/}
            {/*                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">*/}
            {/*                                <button type="button"*/}
            {/*                                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">Delete*/}
            {/*                                </button>*/}
            {/*                            </td>*/}
            {/*                        </tr>*/}
            {/*                    ))}*/}
            {/*                    </tbody>*/}
            {/*                </table>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="w-full flex justify-around flex-wrap">
                {countries.map(country => (
                    <div className="p-2 mt-5 border-gray-200 dark:border-gray-800">
                        <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700" style={{boxShadow: "0px 0px 20px -3px rgba(0, 0, 0, 0.3)"}} >
                            <div className="flex justify-center items-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg bg-gradient-to-r from-blue-500 to-blue-600">
                                <img style={{boxShadow: "0px 0px 30px 5px rgba(0, 0, 0, 0.3)"}} src={'https://karapus.itstep.click/images/' + country.image} alt={country.image} height="100%"/>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between">
                                    <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal antialiased">
                                        {country.name}
                                    </h5>
                                    <h5 className="bg-emerald-600 border-2 border-gray-700 rounded-lg px-1 mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-gray-100 antialiased">
                                        {country.code}
                                    </h5>
                                </div>

                                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                    {country.slug}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default App