"use client";

// Importing Mapbox and its CSS styles
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { Building } from "../types/types";
import "../styles/mapStyles.css";
import { buildings } from "../data/buildings";

if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
  throw new Error("Mapbox API key is not defined in the environment variables.");
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const MAP_STYLE = "mapbox://styles/abdulsamadolagunju1/cm51v0ygf00fa01su03ykf6kr";
const INITIAL_LATITUDE = 51.0443;
const INITIAL_LONGTITUDE = -114.0631;
const INITIAL_ZOOM = 15.5;

const Map = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const currentPopup = useRef<mapboxgl.Popup | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize Mapbox map
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: MAP_STYLE,
      center: [INITIAL_LONGTITUDE, INITIAL_LATITUDE],
      zoom: INITIAL_ZOOM,
      pitch: 60,
      bearing: -17.6,
    });

    map.current.on("load", () => {
      setIsLoading(false);
      buildings.features.forEach(addBuildingMarker);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const addBuildingMarker = (building: any) => {
    const { coordinates } = building.geometry;
    const { name, address, developer, image } = building.properties;
  
    const markerElement = document.createElement("div");
    markerElement.className = "marker";
    markerElement.style.backgroundImage = `url('${image}')`;
    markerElement.style.width = "25px";
    markerElement.style.height = "25px";
    markerElement.style.backgroundSize = "cover";
    markerElement.style.borderRadius = "50%";
  
    const popup = createPopup(name, address, developer);
  
    const marker = new mapboxgl.Marker(markerElement)
      .setLngLat(coordinates)
      .setPopup(popup)
      .addTo(map.current!);
  
    // Show popup on hover
    markerElement.addEventListener("mouseenter", () => {
      popup.addTo(map.current!); // Display the popup when hovering over the marker
    });
  
    // Hide popup when the mouse leaves the marker
    markerElement.addEventListener("mouseleave", () => {
      popup.remove(); // Hide the popup when the mouse leaves the marker
    });
  };

  const createPopup = (name: string, address: string, developer: string) => {
    return new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <h3>${name}</h3>
      <p>${address}</p>
      <p>${developer}</p>
    `);
  };

  const handleBuildingClick = (building: Building) => {
    if (map.current) {
      if (currentPopup.current) {
        currentPopup.current.remove();
      }

      map.current.flyTo({
        center: building.geometry.coordinates,
        essential: true, // Ensures that the flyTo is always triggered
        zoom: 16,
      });

      const popup = createPopup(
        building.properties.name,
        building.properties.address,
        building.properties.developer
      );

      popup.setLngLat(building.geometry.coordinates).addTo(map.current!);
      currentPopup.current = popup;
    }
  };

  return (
    <div className="flex h-screen flex-wrap md:flex-nowrap">
      {isLoading && (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading map...</p>
        </div>
      )}
      <div className="sidebar p-4 bg-white shadow-lg rounded-md overflow-y-auto">
        <a href="https://www.calgary.ca/development/downtown-incentive.html" target="_blank">
        <img src="/office_conversions-removebg-preview.png" alt="office conversions" className="w-25 h-14" />
          <h2 className="text-2xl font-bold mb-4 hover:underline">Calgary Conversions Map</h2>
        </a>
        <ul>
          {buildings.features.map((building) => (
            <li
              key={building.properties.id}
              className="sidebar-item mb-2 p-4 rounded-lg custom-border cursor-pointer hover:bg-gray-100"
              onClick={() => handleBuildingClick(building)}
            >
              <h3 className="text-lg font-semibold">{building.properties.name}</h3>
              <p>{building.properties.address}</p>
              <p>{building.properties.developer}</p>
            </li>
          ))}
        </ul>
        <footer className="mt-auto text-center">
          <a href="https://www.linkedin.com/in/abdul-samad-olagunju-727877167/" target="_blank" className="inline-flex items-center ml-1">
            <p className="text-sm mr-2">Developed by</p>
            <img src="/aurrin.png" alt="Aurrin" className="w-5 h-5" />
          </a>
        </footer>
      </div>
      <div id="mapContainer" ref={mapContainer} className="flex-grow rounded-md overflow-hidden" />
    </div>
  );
};

export default Map;
