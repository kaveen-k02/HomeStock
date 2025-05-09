import React from 'react';
import { Link } from 'react-router-dom';

const BrandCard = ({ brand }) => (
  <div className="bg-primary border-4 border-background shadow-lg rounded-2xl p-5 space-y-4 transition-all hover:shadow-xl">
    
    <div className="space-y-3 text-center">
      <h3 className="text-xl font-bold text-gray-800">{brand.name}</h3>
      <p className="text-lg text-gray-700 font-medium">${brand.price}</p>
      <div className="flex flex-col space-y-4 mt-auto">
      <Link to ={'/feedback'}>
      <button className="w-full py-2 bg-background text-white rounded-lg hover:bg-teal-600 transition-all">
        View Reviews
      </button>
      </Link>
      <Link to = {'/shopping-list'}>
      <button className="w-full py-2 bg-primary border-4 border-background text-background rounded-lg hover:bg-teal-600 transition-all">
        Add to Shopping List
      </button>
      </Link>
      </div>
    </div>
  </div>
);

export default BrandCard;

