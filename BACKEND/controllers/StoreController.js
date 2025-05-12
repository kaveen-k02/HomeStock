import Store from "../models/StoreModel.js"; 
import User from "../models/UserModel.js";

// Get nearby stores based on the user's location
export const getNearbyStores = async (req, res) => {
  const { userId, useCurrentLocation, currentLocation } = req.body;

  try {
    // Fetch user details
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Set location: Use current location if chosen, otherwise permanent location
    const location = useCurrentLocation
      ? { type: "Point", coordinates: currentLocation }
      : user.permanentLocation;

    // Find stores near the selected location (using geospatial queries)
    const nearbyStores = await Store.find({
      location: {
        $near: {
          $geometry: location,
          $maxDistance: 5000, // 5 km radius
        },
      },
    }).limit(10); // Limit to 10 stores

    res.status(200).json(nearbyStores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
