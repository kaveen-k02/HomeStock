import axios from 'axios';

export const getNearbyStores = async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ message: 'Latitude and longitude are required' });
  }

  // Function to calculate Haversine distance in meters
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Radius of Earth in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in meters
  };

  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      {
        params: {
          location: `${lat},${lng}`,
          radius: 4000,
          type: 'grocery_or_supermarket',
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      }
    );

    if (response.data.status !== 'OK') {
      console.error('Google Places API error:', response.data);
      return res.status(500).json({ message: 'Failed to fetch nearby places', error: response.data });
    }

    const stores = response.data.results.map((store) => {
      const storeLat = store.geometry.location.lat;
      const storeLng = store.geometry.location.lng;
      const distanceMeters = calculateDistance(parseFloat(lat), parseFloat(lng), storeLat, storeLng);

      return {
        name: store.name,
        vicinity: store.vicinity,
        rating: store.rating || 0,
        userRatingsTotal: store.user_ratings_total || 0,
        types: store.types,
        distance: Math.round(distanceMeters), // meters
        distanceKm: (distanceMeters / 1000).toFixed(2), // kilometers (string)
        location: { lat: storeLat, lng: storeLng },
      };
    });

    res.json(stores);
  } catch (error) {
    console.error('Error fetching nearby stores:', error.message);
    res.status(500).json({ message: 'Error fetching nearby stores', error: error.message });
  }
};
