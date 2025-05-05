import React from "react";
import { Link } from "react-router-dom";

import inventoryImage from "../images/inventoryImage.jpg";
import shoppingImage from "../images/shopping.jpg";
import feedbackImage from "../images/feedback.jpg";
import trackingImage from "../images/tracking.jpg";
import brandImage from "../images/brand.jpg";
import storeImage from "../images/store.jpg";

const LandingPage = () => {
  return (
    <div className="bg-primary min-h-screen w-full flex flex-col font-sans px-4 md:px-6 lg:px-10">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center py-3 px-6 md:px-10 bg-background shadow-md rounded-lg mt-4">
        <h1 className="text-3xl font-bold text-white">SmartShopper</h1>
        <div className="space-x-4">
          <Link to="/login">
            <button className="bg-accent text-white font-bold px-5 py-3 rounded-full hover:bg-primaryDark transition shadow-lg text-lg">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-white text-accent font-bold border-4 border-accent px-5 py-3 rounded-full hover:bg-primaryDark transition shadow-lg text-lg">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center w-full px-6 mt-6">
        <h2 className="text-5xl font-extrabold leading-tight text-white">
          Smart Inventory Tracking for Your Home
        </h2>
        <p className="text-xl text-background mt-3 max-w-4xl">
          Keep track of groceries, home essentials, and more with HomeStock.
          Never run out of what you need!
        </p>
        <Link to="/signup">
          <button className="mt-5 bg-background border-4 border-accent text-primary px-6 py-4 rounded-full hover:bg-primaryDark transition shadow-lg text-xl">
            Get Started
          </button>
        </Link>
      </section>

      {/* About the App */}
      <section className="w-full text-center mt-10 px-4 md:px-6">
        <h3 className="text-3xl font-bold text-white mb-3">Why SmartShopper?</h3>
        <p className="text-xl text-background max-w-3xl mx-auto">
          Managing home inventory has never been easier! HomeStock helps
          you track product usage, automate shopping lists, and find the
          best deals—all in one place.
        </p>
      </section>

      {/* Features Section */}
      <section className="w-full px-6 pb-12 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 border-4 border-accent rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-xl transform hover:-translate-y-2 duration-300 w-full h-auto hover:bg-background hover:text-white"
          >
            <img src={feature.image} alt={feature.title} className="w-28 h-28 mb-4 rounded-lg" />
            <h4 className="text-accent font-bold text-xl">{feature.title}</h4>
            <p className="text-accent font-bold mt-2">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Scrollbar Styling */}
      <style>
        {`
          ::-webkit-scrollbar {
            height: 6px;
          }
          ::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>
    </div>
  );
};

const features = [
  {
    title: "Home Inventory",
    description: "Track home essentials and get reminders before items expire or run low.",
    image: inventoryImage,
  },
  {
    title: "Shopping List Generator",
    description: "Automatically generate shopping lists based on past purchases.",
    image: shoppingImage,
  },
  {
    title: "Feedback",
    description: "Provide feedback on products to improve recommendations.",
    image: feedbackImage,
  },
  {
    title: "Usage Tracking & Predictions",
    description: "Monitor item usage and get predictions on when to restock.",
    image: trackingImage,
  },
  {
    title: "Alternative Brand Suggestions",
    description: "Discover alternative brands based on your preferences.",
    image: brandImage,
  },
  {
    title: "Nearby Store Recommendations",
    description: "Find the best stores near you for your needs.",
    image: storeImage,
  },
];

export default LandingPage;
