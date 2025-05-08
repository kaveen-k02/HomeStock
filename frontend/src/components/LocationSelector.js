import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, useLoadScript } from "@react-google-maps/api";
import axios from 'axios';

const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

const center = {
  lat: 6.9271,  // Default coordinates (Kandy, Sri Lanka)
  lng: 80.7718,
};

const LocationSelector = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_API_KEY", // Replace with your Google Maps API Key
    libraries: ["places"],
  });

  // Handle the map click event to select the location
  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });
  };

  // Fetch nearby stores whenever the selected location changes
  useEffect(() => {
    if (selectedLocation) {
      fetchNearbyStores(selectedLocation.lat, selectedLocation.lng);
    }
  }, [selectedLocation]);

  // Fetch stores from the backend API
  const fetchNearbyStores = async (lat, lng) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/nearby-stores", {
        params: {
          lat,
          lng,
        },
      });
      setStores(response.data);
    } catch (error) {
      console.error("Error fetching nearby stores:", error);
    } finally {
      setLoading(false);
    }
  };

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        onClick={handleMapClick}
      >
        {selectedLocation && <Marker position={selectedLocation} />}
      </GoogleMap>

      {loading ? (
        <p>Loading stores...</p>
      ) : (
        <div>
          <h3>Nearby Stores (Within 5km)</h3>
          {stores.length > 0 ? (
            <ul>
              {stores.map((store, index) => (
                <li key={index}>
                  {store.name} - {store.vicinity}
                </li>
              ))}
            </ul>
          ) : (
            <p>No stores found nearby</p>
          )}
        </div>
      )}
    </div>
  ) : (
    <p>Loading map...</p>
  );
};

export default LocationSelector;
