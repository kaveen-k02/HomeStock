import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 6.9271, // Colombo
  lng: 79.8612,
};

function MapSelector() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [stores, setStores] = useState([]);
  const [error, setError] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const onMapClick = useCallback((event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  const fetchStores = async () => {
    if (!selectedLocation) return;

    try {
      const res = await axios.get("http://localhost:8070/nearby-stores/get", {
        params: selectedLocation,
      });
      setStores(res.data.sort((a, b) => a.distance - b.distance)); // sort by distance
      setError("");
    } catch (err) {
      setError("Failed to fetch nearby stores");
      console.error(err);
    }
  };

  return isLoaded ? (
    <div className="p-6 bg-gradient-to-br from-primary to-accent min-h-screen text-primary font-sans">
      <h2 className="text-2xl font-bold mb-4 text-accent">Select a Location on Map</h2>

      <div className="rounded-xl overflow-hidden shadow-lg mb-6">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={12}
          onClick={onMapClick}
        >
          {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
      </div>

      <button
        onClick={fetchStores}
        className="px-5 py-2 bg-accent text-white rounded-md hover:bg-teal-700 transition mb-6"
      >
        Find Nearby Stores
      </button>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store, index) => (
          <div
            key={index}
            className="bg-primary rounded-xl p-4 shadow-md border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800">{store.name}</h3>
            <p className="text-sm text-gray-600 mb-1">{store.vicinity}</p>
            <p className="text-sm text-yellow-600">
              ⭐ {store.rating} ({store.user_ratings_total} ratings)
            </p>
            <p className="text-sm text-blue-700 mt-1">
              📍 {store.distanceKm} km away

            </p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p className="text-center text-white">Loading map...</p>
  );
}

export default MapSelector;
