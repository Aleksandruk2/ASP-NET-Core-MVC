import {useEffect, useState} from "react";
import type {ICountry} from "../Interfaces/ICountry.ts";
import APP_ENV from "../env";
import CountryModal from "../Modal/CountryModal.tsx";

const  Country = () => {
    const [countries, setCountries] = useState<ICountry[]>([]);

    useEffect(()  => {
        const url = `${APP_ENV.API_BASE_URL}/api/Countries`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log("Server data", data)
                setCountries(data);
            });
    },[]);

    return (
        <>
            <div className="mt-2 w-full flex justify-around flex-wrap">
                {countries.map(country => (
                    <div key={country.id} className="transition-transform duration-300 ease-out hover:scale-102 p-2 mt-5 border-gray-200 dark:border-gray-800">
                        <div className="relative flex w-80 flex-col rounded-xl myBG bg-clip-border text-gray-200" style={{boxShadow: "0px 0px 20px -3px rgba(0, 0, 0, 0.3)"}} >
                            <div className="relative">
                                <div className="border border-gray-500 flex justify-center items-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl text-white shadow-lg myBGImage">
                                    <img draggable={false} className="w-full" style={{boxShadow: "0px 0px 30px 5px rgba(0, 0, 0, 0.3)"}} src={`${APP_ENV.API_BASE_URL}/images/${country.image}`} alt={country.image}/>
                                </div>
                                <div className="absolute mx-4 bottom-0">
                                    <div className="px-2 pb-2 p-1 m-1 bg-black/50 rounded-md">
                                        <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal antialiased">
                                            {country.name}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 pb-0">
                                <div className="flex justify-between">
                                    <p className="block font-sans text-base font-light leading-relaxed text-blue-200 antialiased">
                                        {country.slug}
                                    </p>
                                    <h5 className="bg-emerald-600 border-2 border-gray-700 rounded-lg px-1 mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-gray-100 antialiased">
                                        {country.code}
                                    </h5>
                                </div>

                            </div>
                            <div className="m-1">
                                <CountryModal country={country} onOpen={false} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Country;