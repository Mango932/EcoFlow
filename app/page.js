"use client";

import DragAndDrop from "./DragAndDrop";
import Navbar from "./Navbar";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import SoilDataForm from "./SoilDataForm";

export default function Home() {
    const handleSubmit = (formData) => {
        // Handle form submission here, e.g., send data to backend
        console.log(formData);
    };

    const mapRef = useRef(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: "",
                version: "weekly",
            });

            const { Map } = await loader.importLibrary("maps");

            const position = {
                lat: 43,
                lng: -79,
            };

            const mapOptions = (google.maps.MapOptions = {
                center: position,
                zoom: 17,
                mapId: "MY_NEXTJS_MAPID",
            });

            const map = new Map(mapRef.current, mapOptions);

            map.addListener("click", (event) => {
                const newMarker = new google.maps.Marker({
                    position: event.latLng,
                    map: map,
                });

                setMarker(newMarker).then(console.log(marker));
            });
        };

        initMap();
    }, []);
    return (
        <main className="flex min-h-screen flex-col items-center  bg-green-100">
            <Navbar />
            <div className="flex items-center ">
                <SoilDataForm onSubmit={handleSubmit} />
                <div style={{ height: "600px", width: "600px" }} ref={mapRef} />
            </div>
        </main>
    );
}
