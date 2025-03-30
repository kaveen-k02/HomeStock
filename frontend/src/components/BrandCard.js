import React from 'react';

const BrandCard = ({ brand }) => (
  <div className="bg-primary border-4 border-background shadow-lg rounded-2xl p-5 space-y-4 transition-all hover:shadow-xl">
    <img 
      src={brand.image} 
      alt={brand.name} 
      className="w-full h-44 object-cover rounded-md"
    />
    <div className="space-y-2 text-center">
      <h3 className="text-xl font-bold text-gray-800">{brand.name}</h3>
      <p className="text-lg text-gray-700 font-medium">${brand.price}</p>
      <button className="w-full py-2 bg-background text-white rounded-lg hover:bg-teal-600 transition-all">
        View Reviews
      </button>
      <button className="w-full py-2 bg-primary border-4 border-background text-background rounded-lg hover:bg-teal-600 transition-all">
        Add to Shopping List
      </button>
    </div>
  </div>
);

export default BrandCard;

