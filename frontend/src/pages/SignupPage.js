import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const userData = {
      userName: name,
      email,
      password,
    };

    console.log("Sending userData:", userData);

    try {
      await axios.post('http://localhost:8070/auth/signup', userData);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to sign up. Try again.");
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

