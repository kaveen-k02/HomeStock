import React from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-primary">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <input type="text" placeholder="Name" className="w-full p-3 border rounded mb-3" />
        <input type="email" placeholder="Email" className="w-full p-3 border rounded mb-3" />
        <input type="password" placeholder="Password" className="w-full p-3 border rounded mb-3" />
        <button className="w-full bg-accent text-white py-3 rounded">Sign Up</button>
        <p className="text-center mt-3">Already have an account? <Link to="/login" className="text-accent">Login</Link></p>
      </div>
    </div>
  );
};

export default SignupPage;
