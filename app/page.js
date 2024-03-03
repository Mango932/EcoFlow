"use client";

import Navbar from "./Navbar";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import SoilDataForm from "./SoilDataForm";

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
            console.log(data);
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

    return (
        <main className="flex min-h-screen flex-col items-center  bg-green-100">
            <Navbar />
            <h1 className="text-green-700 text-4xl mt-10 font-bold">
                Enter inforation or click on the map
            </h1>
            <div className="flex items-center flex-wrap justify-center">
                <SoilDataForm onSubmit={handleSubmit} formData={formData} />

                <div style={{ height: "600px", width: "600px" }} ref={mapRef} />
            </div>
            <div className="w-full h-24 bg-green-100 mt-20"></div>
        </main>
    );
}
