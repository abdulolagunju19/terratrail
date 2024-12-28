"use client";

// Importing Mapbox and its CSS styles
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect, useRef } from "react";
import { Building } from "../types/types";
import "../styles/mapStyles.css";

if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
    throw new Error("Mapbox API key is not defined in the environment variables.");
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const buildings: { type: string; features: Building[] } = {
    type: 'FeatureCollection',
    features: [
        {
            geometry: {
            type: 'Point',
            coordinates: [-114.08154397092198, 51.04868473783537],
            },
            properties: {
            id: '1',
            name: 'The Cornerstone',
            address: '909 5 Avenue S.W.',
            developer: 'Peoplefirst Developments',
            image: 'https://raw.githubusercontent.com/abdulolagunju19/terratrail/refs/heads/main/public/peoplefirst-developments.jpg',
            },
        },
        {
            geometry: {
            type: 'Point',
            coordinates: [-114.08033584469766, 51.04960108253357],
            },
            properties: {
            id: '2',
            name: 'Element Hotel',
            address: '833 4 Avenue S.W.',
            developer: 'PBA Group of Companies',
            image: 'https://raw.githubusercontent.com/abdulolagunju19/terratrail/refs/heads/main/public/pba-group-of-companies.jpg',
            },
        },
        {
            geometry: {
            type: 'Point',
            coordinates: [-114.0615292092156, 51.04430067700774],
            },
            properties: {
            id: '3',
            name: 'Palliser One',
            address: '125 9 Avenue S.E.',
            developer: 'Aspen Properties',
            image: 'https://raw.githubusercontent.com/abdulolagunju19/terratrail/refs/heads/main/public/aspen.jpg',
            },
        },
        {
            geometry: {
            type: 'Point',
            coordinates: [-114.06002350740891, 51.04443937875622],
            },
            properties: {
            id: '4',
            name: 'Teck Place',
            address: '205 9 Avenue S.E.',
            developer: 'Cidex Group of Companies',
            image: 'https://raw.githubusercontent.com/abdulolagunju19/terratrail/refs/heads/main/public/cidex.jpg',
            },
        },
        {
            geometry: {
            type: 'Point',
            coordinates: [-114.0782577062078, 51.05007511557982],
            },
            properties: {
            id: '5',
            name: 'The Loft',
            address: '744 4 Avenue S.W.',
            developer: 'Institutional Mortgage Capital',
            image: 'https://raw.githubusercontent.com/abdulolagunju19/terratrail/refs/heads/main/public/institutional_mortgage_capital_logo.jpg',
            },
        },
        {
            geometry: {
            type: 'Point',
            coordinates: [-114.07319829110197, 51.050465444627434],
            },
            properties: {
            id: '6',
            name: 'Eau Claire Place I',
            address: '525 3 Avenue S.W.',
            developer: 'Cidex Group of Companies',
            image: 'https://raw.githubusercontent.com/abdulolagunju19/terratrail/refs/heads/main/public/cidex.jpg',
            },
        },
        {
            geometry: {
            type: 'Point',
            coordinates: [-114.07256813158169, 51.05042685063221],
            },
            properties: {
            id: '7',
            name: 'Eau Claire Place II',
            address: '521 3 Avenue S.W.',
            developer: 'Pacific Reach Properties Development',
            image: 'https://raw.githubusercontent.com/abdulolagunju19/terratrail/refs/heads/main/public/pacific-reach-properties.jpg',
            },
        },
        {
            geometry: {
            type: 'Point',
            coordinates: [-114.07915495474073, 51.045774167092894],
            },
            properties: {
            id: '8',
            name: 'Taylor Building',
            address: '805 8 Avenue S.W.',
            developer: 'Cressey Development Group',
            image: 'https://raw.githubusercontent.com/abdulolagunju19/terratrail/refs/heads/main/public/cressey.jpg',
            },
        },
        {
            geometry: {
            type: 'Point',
            coordinates: [-114.07832427391098, 51.0462445150538],
            },
            properties: {
            id: '9',
            name: 'Petro Fina Building',
            address: '736 8 Avenue S.W.',
            developer: 'Peoplefirst Developments',
            image: 'https://raw.githubusercontent.com/abdulolagunju19/terratrail/refs/heads/main/public/peoplefirst-developments.jpg',
            },
        },
        {
            geometry: {
            type: 'Point',
            coordinates: [-114.07596903200698, 51.045770521407],
            },
            properties: {
            id: '10',
            name: 'Dominion Centre',
            address: '665 8 Avenue S.W.',
            developer: 'Alston Properties/Slate Asset Management',
            image: 'https://raw.githubusercontent.com/abdulolagunju19/terratrail/refs/heads/main/public/alston-properties.png',
            },
        },
        {
            geometry: {
            type: 'Point',
            coordinates: [-114.07905780380149, 51.0483135584794],
            },
            properties: {
            id: '11',
            name: 'Place 800',
            address: '800 6 Avenue S.W.',
            developer: 'Peoplefirst Developments',
            image: 'https://raw.githubusercontent.com/abdulolagunju19/terratrail/refs/heads/main/public/peoplefirst-developments.jpg',
            },
        },
    ],
};

const Map = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
    const currentPopup = useRef<mapboxgl.Popup | null>(null); // Store reference to current popup

    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        // Initialize Mapbox map
        map.current = new mapboxgl.Map({
            container: mapContainer.current as HTMLDivElement,
            style: 'mapbox://styles/abdulsamadolagunju1/cm51v0ygf00fa01su03ykf6kr',
            center: [-114.0631, 51.0443],
            zoom: 15.5,
            pitch: 60,
            bearing: -17.6,
        });

        // Add markers for each building
        buildings.features.forEach((building) => {
            const { coordinates } = building.geometry;
            const { name, address, developer, image } = building.properties;

            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage = `url('${image}')`;
            el.style.width = '25px';
            el.style.height = '25px';
            el.style.backgroundSize = 'cover';
            el.style.borderRadius = '50%';

            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <h3>${name}</h3>
                <p>${address}</p>
                <p>${developer}</p>
            `);

            new mapboxgl.Marker(el)
                .setLngLat(coordinates)
                .setPopup(popup)
                .addTo(map.current!);
        });

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

    // Handle building selection from sidebar
    const handleBuildingClick = (building: Building) => {
        setSelectedBuilding(building);

        if (map.current) {
            // Close the current popup if it exists
            if (currentPopup.current) {
                currentPopup.current.remove();
            }

            // Fly to the selected building
            map.current.flyTo({
                center: building.geometry.coordinates,
                essential: true, // Ensures that the flyTo is always triggered
                zoom: 18, // Set a zoom level that focuses on the building
            });

            // Create and open a new popup
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <h3>${building.properties.name}</h3>
                <p>${building.properties.address}</p>
                <p>${building.properties.developer}</p>
            `);

            currentPopup.current = popup; // Store reference to the new popup
            popup.setLngLat(building.geometry.coordinates).addTo(map.current!); // Add popup to map
        }
    };

    return (
        <div className="flex h-screen">
        <div id="mapContainer" ref={mapContainer} />
        <div className="sidebar p-4 bg-gray-100 overflow-y-auto" >
            <a href="https://www.calgary.ca/development/downtown-incentive.html" target="_blank"><h2 className="text-lg font-bold mb-4">Calgary Conversions</h2></a>
            <ul>
                {buildings.features.map((building) => (
                    <li
                        key={building.properties.id}
                        className="sidebar-item mb-2 p-2 rounded cursor-pointer"
                        onClick={() => handleBuildingClick(building)}
                    >
                        <h3 className="text-lg font-semibold">{building.properties.name}</h3>
                        <p>{building.properties.address}</p>
                        <p>{building.properties.developer}</p>
                    </li>
                ))}
            </ul>
            <footer className="mt-auto text-center rounded">
            <a href="https://www.linkedin.com/in/abdul-samad-olagunju-727877167/" target="_blank" className="inline-block ml-1">
                <img src="/linkedin.png" alt="LinkedIn" className="w-5 h-5 inline-block" />
            </a>
            </footer>
        </div>
    </div>
    );
};

export default Map;