import React, { useState, useEffect } from "react";
import axios from "axios";
import BrandCard from "./BrandCard";

import milk1 from "../images/milk1.jpg";
import bread1 from "../images/bread1.jpg";
import detergant1 from "../images/detergant1.jpg";

// Fallback image based on product name
const getImageForProduct = (productName) => {
  const name = productName.toLowerCase();
  if (name.includes("milk")) return milk1;
  if (name.includes("bread")) return bread1;
  if (name.includes("detergent")) return detergant1;
  return milk1;
};

const BrandSuggestions = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8070/Inventory");
      const uniqueCategories = [...new Set(res.data.map((item) => item.category))];
      setCategories(uniqueCategories);
      if (uniqueCategories.length > 0) setSelectedCategory(uniqueCategories[0]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  fetchCategories();
}, []);

  useEffect(() => {
    // Fetch top products for selected category
    const fetchTopProducts = async () => {
      if (!selectedCategory) return;
      try {
        const res = await axios.get("http://localhost:8070/BestProducts/top-products");
        const categoryData = res.data.find((item) => item._id === selectedCategory);
        const products = categoryData?.topProducts || [];

        const mapped = products.map((p) => ({
          id: p.productId,
          name: p.productName,
          price: p.purchasePrice,
          image: getImageForProduct(p.productName),
          avgRating: p.avgRating,
          ratingCount: p.ratingCount,
        }));

        setTopProducts(mapped);
      } catch (error) {
        console.error("Error fetching top-rated products:", error);
      }
    };

    fetchTopProducts();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-accent to-primary">
      <h1 className="text-4xl font-bold text-primary text-center mb-10">
        Top Brand Suggestions
      </h1>

      {/* Category Dropdown */}
      <div className="flex justify-center mb-8">
        <select
          className="px-4 py-2 rounded-lg text-lg font-medium bg-primary text-background border-2 border-background shadow-md focus:outline-none"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Top Products Display */}
      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {topProducts.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSuggestions;
