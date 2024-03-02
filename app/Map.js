import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export function Map() {
    const mapRef = useRef(null);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_API_KEY,
                version: "weekly",
            });

            const { Map } = await loader.importLibrary("maps");

            const position = {
                lat: 43,
                long: -79,
            };

            const mapOptions = (google.maps.MapOptions = {
                center: position,
                zoom: 17,
                mapId: "MY_NEXTJS_MAPID",
            });

            const map = new Map(mapRef.current, mapOptions);
        };

        initMap();
    }, []);
    return <div style={{ height: "400px" }} ref={mapRef} />;
}
