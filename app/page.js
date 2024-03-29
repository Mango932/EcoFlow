"use client";

import Navbar from "./Navbar";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import SoilDataForm from "./SoilDataForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
    const handleSubmit = async (formData) => {
        try {
            const response = await fetch("http://localhost:8000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit data");
            }

            const data = await response.json();
            setResult(data.recommendations);
            setBestMonth(data.best_month);
            console.log(data.recommendations);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmitLocation = async (position) => {
        try {
            const response = await fetch("http://localhost:8000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(position),
            });

            if (!response.ok) {
                throw new Error("Failed to submit data");
            }

            const data = await response.json();
            console.log(data);
            setFormData((prevState) => ({
                ...prevState,
                temperature: data.location.temperature,
                humidity: data.location.humidity,
                rainfall: data.location.rainfall,
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const mapRef = useRef(null);
    let marker;

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
                version: "weekly",
            });

            const { Map } = await loader.importLibrary("maps");

            const position = {
                lat: 23,
                lng: 81,
            };

            const mapOptions = (google.maps.MapOptions = {
                center: position,
                zoom: 5,
                mapId: "MY_NEXTJS_MAPID",
            });

            const map = new Map(mapRef.current, mapOptions);

            map.addListener("click", (event) => {
                if (marker != null) {
                    marker.setMap(null);
                }

                const newMarker = new google.maps.Marker({
                    position: event.latLng,
                    map: map,
                });
                marker = newMarker;

                const position = {
                    lat: newMarker.getPosition().lat(),
                    lng: newMarker.getPosition().lng(),
                };
                console.log(position.lat);
                console.log(position.lng);
                handleSubmitLocation(position);
            });
        };

        initMap();
    }, []);

    const [formData, setFormData] = useState({
        N: "",
        P: "",
        K: "",
        temperature: "",
        humidity: "",
        ph: "",
        rainfall: "",
    });

    const handleFormChange = (newFormData) => {
        setFormData(newFormData);
    };

    const [result, setResult] = useState([]);
    const [bestMonth, setBestMonth] = useState(null);

    return (
        <main className="flex min-h-screen flex-col items-center  bg-green-100">
            <Navbar />
            <ToastContainer autoClose={1500} />
            <div className="flex items-center flex-wrap justify-center">
                <SoilDataForm
                    onSubmit={handleSubmit}
                    formData={formData}
                    handleChanges={handleFormChange}
                />

                <div style={{ height: "600px", width: "600px" }} ref={mapRef} />
            </div>

            {result.length != 0 ? (
                <h1 className="text-green-700 text-4xl font-bold mb-10">
                    Recommended Crops
                </h1>
            ) : (
                <></>
            )}
            {result.map(([crop, percent], index) =>
                percent > 0 ? (
                    <div>
                    <div key={index} className="text-black  mb-2 p-3 w-[400px]">
                        <div className="flex justify-between bg-green-200 p-2  items-center border border-black rounded-md">
                            <div className="flex">
                                <div className="">{crop}</div>
                            </div>
                            <div className="text-black  mb-2 p-3">
                    {crop === "best_month"
                        ? percent
                        : `${percent}%`}
                    
                </div>
                        </div>
                    </div>
                    
                {bestMonth && index == 0 ? (
                                <div className="flex justify-between bg-green-200 p-2  items-center border border-black rounded-md text-black w-[400px]">
                                    <div>{bestMonth}</div>
                                </div>
                            ) : null}
                    </div>
                    
                ) : null
            )}

            <div className="w-full h-24 bg-green-100 mt-20"></div>
        </main>
    );
}
