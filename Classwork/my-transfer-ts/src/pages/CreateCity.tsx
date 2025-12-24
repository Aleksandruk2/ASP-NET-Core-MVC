import {ChevronDown, Image} from "lucide-react";
import {useEffect, useState} from "react";
import type {ICountry} from "../Interfaces/ICountry.ts";
import APP_ENV from "../env";

const CreateCity = () => {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [countries, setCountries] = useState<ICountry[]>([]);

    useEffect(()  => {
        const url = `${APP_ENV.API_BASE_URL}/api/Countries`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setCountries(data);
            });
    },[]);

    const onSubmit = () => {
        console.log(name, slug, country, description, file?.name);
    }


    return (
        <>
            <div className="flex items-center justify-center w-full">
                <form onSubmit={onSubmit}>
                    <h2 className="text-base/7 font-semibold text-white">Додавання міста</h2>
                    <p className="mt-1 text-sm/6 text-gray-400">Будь ласка, додавайте лише міста, які дійсно існують.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-white">
                                Назва міста
                            </label>
                            <div className="mt-2">
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm/6 font-medium text-white">
                                Slug
                            </label>
                            <div className="mt-2">
                                <input
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    type="text"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="country" className="block text-sm/6 font-medium text-white">
                                До якої країни належить місто
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                >
                                    {countries.map((country) => (
                                        <option>{country.name}</option>
                                    ))}
                                    {/*<option>United States</option>*/}
                                    {/*<option>Canada</option>*/}
                                    {/*<option>Mexico</option>*/}
                                </select>
                                <ChevronDown
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-white">
                                Зображення міста
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                                <div className="text-center">
                                    <Image aria-hidden="true" className="mx-auto size-12 text-gray-600" />
                                    <div className="mt-4 flex text-sm/6 text-gray-400">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                onChange={(e) => {
                                                    if(e.target.files && e.target.files[0]) {
                                                        setFile(e.target.files[0]);
                                                    }
                                                }}
                                                type="file"
                                                className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs/5 text-gray-400">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-full">
                            <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                            Опис
                            </label>
                            <div className="mt-2">
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Додати
                        </button>
                    </div>
                </form>
            </div>
            <button
                onClick={onSubmit}
                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                log
            </button>
        </>
    );
}

export default CreateCity;