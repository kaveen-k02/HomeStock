import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FeedbackForm = ({ userId }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8070/Inventory").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return alert("Please select a product.");

    try {
      await axios.post("http://localhost:8070/api/feedback", {
        userId,
        productId: selectedProduct,
        rating,
        comment,
      });
      alert("Feedback submitted successfully");
      navigate('/feedback');
    } catch (error) {
      console.error(error);
      alert("Failed to submit feedback");
    }
  };

  return (
    <div className="bg-primary min-h-screen w-full flex flex-col font-sans px-4 md:px-6 lg:px-10">
      {/* Header Section */}
      <div className="w-full text-center mt-8 mb-6">
        <h2 className="text-5xl font-extrabold leading-tight text-background mb-4">Share Your Feedback</h2>
        <p className="text-xl text-background mb-6">Help us improve by sharing your experience with our products</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto w-full bg-white shadow-lg rounded-lg p-8 border-4 border-accent"
      >
        {/* Product Selection */}
        <div className="mb-6">
          <label className="block text-background font-bold mb-2 text-lg">Select Product</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full bg-primary text-background p-3 rounded-lg border-2 border-accent focus:border-background focus:ring-2 focus:ring-background focus:outline-none transition-colors"
          >
            <option value="">Choose a product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.productName} ({product.category})
              </option>
            ))}
          </select>
        </div>

        {/* Star Rating System */}
        <div className="mb-6">
          <label className="block text-background font-bold mb-2 text-lg">Rating</label>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <FaStar
                  key={index}
                  size={32}
                  className={`cursor-pointer transition-all duration-200 transform hover:scale-110 ${
                    currentRating <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(currentRating)}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                />
              );
            })}
            <span className="ml-2 text-sm text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
              {rating.toFixed(1)} out of 5
            </span>
          </div>
        </div>

        {/* Comment Input */}
        <div className="mb-6">
          <label className="block text-background font-bold mb-2 text-lg">Your Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows="4"
            className="w-full bg-primary text-background p-3 rounded-lg border-2 border-accent focus:border-background focus:ring-2 focus:ring-background focus:outline-none transition-colors"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate('/feedback')}
            className="bg-white text-accent font-bold border-4 border-accent px-6 py-3 rounded-full hover:bg-background hover:text-white transition shadow-lg text-lg"
          >
            Back to Feedback
          </button>
          
          <button
            type="submit"
            className="bg-accent text-white font-bold px-6 py-3 rounded-full hover:bg-background transition shadow-lg text-lg"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
