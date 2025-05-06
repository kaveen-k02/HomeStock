import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MapPicker from "../components/MapPicker";

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState(null); // { lat, lng, address }
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !location) {
      setError("Please fill in all fields and select a location.");
      return;
    }

    const userData = {
      userName: name,
      email,
      password,
      permanentLocation: {
        type: "Point",
        coordinates: [location.lng, location.lat],
      },
      address: location.address, // Optional: nice to store for display
    };

    console.log("Sending userData:", userData);

    try {
      // Uncomment this once your backend is ready
      // await axios.post('/api/auth/signup', userData);
      navigate("/nearby-stores");
    } catch (err) {
      console.error(err);
      setError("Failed to sign up. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border rounded mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="mb-2 font-medium">Pick your permanent location:</p>
          <MapPicker onLocationSelect={setLocation} />
          {location && (
            <div className="text-sm text-gray-700 mt-2">
              <p><strong>Lat:</strong> {location.lat.toFixed(5)}, <strong>Lng:</strong> {location.lng.toFixed(5)}</p>
              <p className="mt-1"><strong>Address:</strong> {location.address}</p>
            </div>
          )}
          <button
            className="w-full bg-accent text-white py-3 mt-4 rounded hover:bg-accent-dark transition"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
