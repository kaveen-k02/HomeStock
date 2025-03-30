import { useEffect, useState } from "react";

const NearbyStores = () => {
  const [stores, setStores] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const radius = 2000; // 2km radius for nearby stores

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    // Fetch user's location using geolocation API with high accuracy
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        try {
          // Overpass API query to find nearby grocery stores, supermarkets, and home goods stores
          const overpassQuery = `
            [out:json];
            (
              node["shop"="grocery"](around:${radius},${latitude},${longitude});
              node["shop"="supermarket"](around:${radius},${latitude},${longitude});
              node["shop"="home_improvement"](around:${radius},${latitude},${longitude});
            );
            out body;
          `;
          
          const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`);
          const data = await response.json();

          if (data.elements.length === 0) {
            setError("No nearby stores found.");
          } else {
            // Filter out the stores and display relevant information
            const filteredStores = data.elements.map(store => ({
              name: store.tags.name || "Unnamed Store",
              lat: store.lat,
              lon: store.lon,
              distance: getDistance(latitude, longitude, store.lat, store.lon),
              imageUrl: "https://via.placeholder.com/150", // Placeholder image for testing
              storeLink: `https://www.google.com/maps?q=${store.lat},${store.lon}`, // Google Maps link with store coordinates
            }));
            setStores(filteredStores);
          }
        } catch (err) {
          console.error("Error fetching data:", err);
          setError("Failed to fetch store data.");
        }
        setLoading(false);
      },
      (geoError) => {
        console.error("Geolocation Error:", geoError);
        setError("Location access denied. Please enable location services.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true, // Ensures better accuracy
        timeout: 10000, // Timeout after 10 seconds
        maximumAge: 0, // Don't use a cached position
      }
    );
  }, []);

  // Function to calculate distance between two lat/lon points (Haversine formula)
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance * 1000; // Convert to meters
  };

  return (
    <div className="p-6 bg text-background min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Nearby Stores (Supermarkets, Home Goods, Groceries)</h2>
      {loading && <p className="text-lg">Loading stores...</p>}
      {error && <p className="text-red-500 text-lg">{error}</p>}
      {userLocation ? (
        <ul className="space-y-4">
          {stores.length > 0 ? (
            stores.map((store, index) => (
              <li key={index} className="flex items-center space-x-4 bg-primary border-accent border-2 p-4 rounded-lg shadow-md hover:bg-background hover:text-accent transition-colors">
              {/* Store Image */}
              <div className="w-20 h-20 bg-gray-200 flex justify-center items-center rounded-full">
                {store.imageUrl ? (
                  <img
                    src={store.imageUrl}
                    alt={store.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/150" // Default image if no store image
                    alt="No Image Available"
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </div>
              
              {/* Store Info */}
              <div className="flex-1">
                <p className="text-lg font-semibold">{store.name}</p>
                <p className="text-sm text-accent">{(store.distance / 1000).toFixed(2)} km away</p>
                
                {/* Store Link */}
                <a
                  href={store.storeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 mt-2 inline-block"
                  aria-label={`View ${store.name} on map`}
                >
                  View Store on Map
                </a>
              </div>
            </li>
            
            ))
          ) : (
            <p>No nearby stores found within {radius / 1000} km.</p>
          )}
        </ul>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default NearbyStores;
