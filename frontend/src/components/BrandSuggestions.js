import React, { useState } from "react";
import BrandCard from "./BrandCard";

import milk1 from "../images/milk1.jpg";
import milk2 from "../images/milk2.jpg";
import milk3 from "../images/milk3.jpg";
import bread1 from "../images/bread1.jpg"
import detergant1 from "../images/detergant1.jpg"

const itemBrands = {
  Groceries: {
    Milk: [
      { id: 1, name: "DairyGold", price: "$3.99", image: milk1 },
      { id: 2, name: "FreshFarm", price: "$4.29", image: milk2 },
      { id: 3, name: "PureMilk", price: "$3.79", image: milk3 },
    ],
    Bread: [
      { id: 4, name: "WholeGrain", price: "$2.49", image: bread1 },
      { id: 5, name: "SoftBite", price: "$2.99", image: bread1 },
      { id: 6, name: "GoldenCrust", price: "$2.79", image: bread1 },
    ],
  },
  "Household Essentials": {
    Detergent: [
      { id: 7, name: "SparkleClean", price: "$6.99", image: detergant1 },
      { id: 8, name: "FreshWash", price: "$7.49", image: detergant1 },
      { id: 9, name: "PowerScrub", price: "$7.19", image: detergant1 },
    ],
    Soap: [
      { id: 10, name: "AquaFresh", price: "$1.99", image: "/soap1.jpg" },
      { id: 11, name: "GentleCare", price: "$2.29", image: "/soap2.jpg" },
      { id: 12, name: "SoftGlow", price: "$2.49", image: "/soap3.jpg" },
    ],
  },
};

const BrandSuggestions = () => {
  const [selectedCategory, setSelectedCategory] = useState("Groceries");
  const [selectedItem, setSelectedItem] = useState(
    Object.keys(itemBrands["Groceries"])[0]
  );


  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-accent  to-primary">
      <h1 className="text-4xl font-bold text-primary text-center mb-10">
        Top Brand Suggestions
      </h1>

      {/* Category Toggle Buttons */}
      <div className="flex justify gap-6 mb-8">
        {Object.keys(itemBrands).map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg text-lg font-semibold transition ${
              selectedCategory === category
                ? "bg-background  border-2 border-primary text-white shadow-md"
                : "bg-white border-2 border-accent text-accent "
            }`}
            onClick={() => {
            setSelectedCategory(category);
            setSelectedItem(Object.keys(itemBrands[category])[0]);
        }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Item Selection Dropdown */}
      <div className="flex justify-center mb-8">
        <select
          className="px-4 py-2 rounded-lg text-lg font-medium bg-primary text-background border-2 border-background shadow-md focus:outline-none focus:ring-2 focus:ring-accent"
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
        >
          {Object.keys(itemBrands[selectedCategory]).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Display Selected Category */}
      <div className="max-w-screen-lg mx-auto">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
         {itemBrands[selectedCategory][selectedItem].map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSuggestions;

