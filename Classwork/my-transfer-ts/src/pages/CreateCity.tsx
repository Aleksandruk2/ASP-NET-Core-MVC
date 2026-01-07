import {ChevronDown, Image} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import type {ICountry} from "../Interfaces/ICountry.ts";
import APP_ENV from "../env";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import type {IErrors} from "../Interfaces/IErrors/IError.ts";

const CreateCity = () => {
    const MAX_SIZE= 5 * 1024 * 1024; //5MB
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState<string | undefined>();
    const [slug, setSlug] = useState("");
    const [slugError, setSlugError] = useState<string | undefined>();
    const [countryId, setCountryId] = useState("");
    const [countryIdError, setCountryIdError] = useState<string | undefined>();
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imageError, setImageError] = useState<string | undefined>();
    const [preview, setPreview] = useState<string | undefined>();
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [error, setError] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleFiles = (files: FileList | null) => {
        if (!files || !files[0]) return;

        const f = files[0];
        if (!f.type.startsWith("image/")) return;

        if (f.size > MAX_SIZE) {
            setImage(null);
            setPreview(undefined);
            setError(true);
            return;
        }

        setError(false);
        setImage(f);
        setPreview(URL.createObjectURL(f));
    };

    useEffect(()  => {
        const url = `${APP_ENV.API_BASE_URL}/api/Countries`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setCountries(data);
                setCountryId(data[0].id);
            });
    },[]);

    const getErrors = (errors: IErrors) => {
        setNameError(undefined);
        setSlugError(undefined);
        setImageError(undefined);
        setCountryIdError(undefined);
        Object.entries(errors).forEach(([field, messages]) => {
            messages.forEach((msg: string) => {
                switch (field) {
                    case "Name":
                        setNameError(msg);
                        break;
                    case "Slug":
                        setSlugError(msg);
                        break;
                    case "Image":
                        setImageError(msg);
                        break;
                    case "CountryId":
                        setCountryIdError(msg);
                        break;
                }
            });
        });
    }

    const sendData = async () => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("slug", slug);
            formData.append("countryId", countryId);
            formData.append("description", description);
            if (image)
                formData.append("image", image);
            const response = await fetch(`${APP_ENV.API_BASE_URL}/api/Cities/Create`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            console.log(data);
            const errors: IErrors = data.errors;
            if (errors)
                getErrors(errors);

            if (response.ok)
                navigate("/CreateCitySuccess");
        } catch (error) {
            console.error("Create City Error:", error);
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(name, slug, countryId, description, image);
        await sendData();
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
                            {nameError && (<div className="text-red-400 max-w-72">{nameError}</div>)}
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
                            {slugError && (<div className="text-red-400 max-w-72">{slugError}</div>)}
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="country" className="block text-sm/6 font-medium text-white">
                                До якої країни належить місто
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    value={countryId}
                                    onChange={(e) => setCountryId(e.target.value)}
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                >
                                    {countries.map((country) => (
                                        <option key={country.id} value={country.id}>{country.name}</option>
                                    ))}
                                </select>
                                <ChevronDown
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                                />
                            </div>
                            {countryIdError && (<div className="text-red-400 max-w-72">{countryIdError}</div>)}
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-white">
                                Зображення міста
                            </label>
                            <div onDragOver={e => {
                                    e.preventDefault();
                                }}
                                onDrop={e => {
                                    e.preventDefault();
                                    handleFiles(e.dataTransfer.files);
                                }}
                                className={`mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 ${ image ? "py-4" : "py-10"}`}>
                                <div className="text-center">
                                    { image ? <div className="rounded p-1 border-dashed border-white/25 border">
                                        <img
                                        className="w-96 mx-auto rounded object-cover"
                                        src={preview} alt={preview}/>
                                        </div>  : <Image aria-hidden="true" className="mx-auto size-12 text-gray-600" /> }

                                    <div className="flex justify-center mt-4 text-sm/6 text-gray-400">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300"
                                        >
                                            { !image ? <span>Завантажте файл</span> : <span>{image.name}</span> }
                                            <input
                                                ref={inputRef}
                                                id="file-upload"
                                                accept="image/*"
                                                onChange={e => handleFiles(e.target.files)}
                                                type="file"
                                                className="sr-only" />
                                        </label>
                                        {!image && <p className="pl-1">або перетягніть</p> }
                                    </div>
                                    {!image && <p className={`text-xs/5 text-gray-400`}>PNG, JPG, GIF <span className={ error ? "text-red-400 underline" : ""}>розміром до 5MB</span></p> }
                                </div>
                            </div>
                            {imageError && (<div className="text-red-400 max-w-md">{imageError}</div>)}
                        </div>

                        <div className="sm:col-span-full">
                            <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                            Опис
                            </label>
                            <div className="mt-2">
                                {/*<textarea*/}
                                {/*    value={description}*/}
                                {/*    onChange={(e) => setDescription(e.target.value)}*/}
                                {/*    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"*/}
                                {/*/>*/}
                                <SimpleMDE value={description} onChange={setDescription} />
                            </div>
                        </div>
                    </div>
                    <div className="pb-3 mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Додати
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateCity;