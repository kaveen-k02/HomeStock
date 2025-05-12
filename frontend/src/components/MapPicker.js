import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const DraggableMarker = ({ onLocationChange }) => {
  const map = useMap();
  const [position, setPosition] = useState(map.getCenter());
  const [address, setAddress] = useState("");
  const markerRef = useRef(null);

  // Function to fetch address from coordinates
  const fetchAddress = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      if (data.display_name) {
        setAddress(data.display_name);
        onLocationChange({ lat, lng, address: data.display_name });
      }
    } catch (err) {
      console.error("Error fetching address:", err);
    }
  };

  useEffect(() => {
    fetchAddress(position.lat, position.lng);
  }, []);

  // Event handler for dragend to update position and address
  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const newPos = marker.getLatLng();
        setPosition(newPos);
        fetchAddress(newPos.lat, newPos.lng);
      }
    },
  };

  return (
    <>
      <Marker
        draggable
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={L.icon({
          iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png", // Corrected marker icon
          iconSize: [25, 41],
          iconAnchor: [12, 41], // Ensures the marker is placed correctly
          popupAnchor: [0, -41], // Popup will open above the marker
        })}
      />
      <div className="text-sm mt-2 bg-white p-2 rounded shadow max-w-md">
        <strong>Address:</strong> {address || "Fetching..."}
      </div>
    </>
  );
};

const MapPicker = ({ onLocationSelect }) => {
  return (
    <div>
      <MapContainer
        center={[7.8731, 80.7718]} // Default center (Sri Lanka)
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <DraggableMarker onLocationChange={onLocationSelect} />
      </MapContainer>
    </div>
  );
};

export default MapPicker;
