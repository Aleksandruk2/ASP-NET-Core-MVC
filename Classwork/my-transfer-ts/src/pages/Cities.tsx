import {useEffect, useState} from "react";
import type {ICity} from "../Interfaces/ICity.ts";
import APP_ENV from "../env";
import CityModal from "../Modal/CityModal.tsx";

const Cities = () => {
    const [cities, setCities] = useState<ICity[]>([])

    useEffect(() => {
        const url = `${APP_ENV.API_BASE_URL}/api/Cities`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log("Server data", data)
                setCities(data);
            });
    },[]);

    return (
        <>
            <div className="mt-2 w-full flex justify-around flex-wrap">
                {cities.map(city => (
                    <div key={city.id} className="p-2 mt-5 border-gray-200 dark:border-gray-800">
                        <div className=" relative flex w-80 flex-col rounded-xl myBG bg-clip-border text-gray-200" style={{boxShadow: "0px 0px 20px -3px rgba(0, 0, 0, 0.3)"}} >
                            <div className="flex justify-center items-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl text-white shadow-lg myBGImage">
                                <img draggable={false} className="w-full" style={{boxShadow: "0px 0px 30px 5px rgba(0, 0, 0, 0.3)"}} src={`${APP_ENV.API_BASE_URL}/images/${city.image}`} alt={city.image}/>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between">
                                    <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal antialiased">
                                        {city.name}
                                    </h5>
                                    <h5 className="bg-emerald-500 border-2 border-emerald-700 rounded-lg px-1 mb-2 block font-sans font-semibold text-base leading-snug tracking-normal text-gray-100 antialiased">
                                        {city.country}
                                    </h5>
                                </div>
                                <p className="block font-sans text-base font-light leading-relaxed text-blue-200 antialiased">
                                    {city.slug}
                                </p>
                            </div>
                            <div className="m-1">
                                <CityModal city={city} onOpen={false} />
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Cities;