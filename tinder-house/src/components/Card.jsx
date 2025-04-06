// Card.jsx
import React from 'react';

function Card({ 
  image, 
  title, 
  price, 
  rooms, 
  size, 
  address, 
  additionalDetails, 
  actionButton 
}) {
  return (
    <div className="bg-stone-300 rounded-2xl shadow-md overflow-hidden flex flex-col">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <img src="https://placehold.co/24x24" alt="" className="w-6 h-6" />
          <span className="text-xl font-bold text-[#2B1B12]">{title}</span>
        </div>
        {rooms && size && (
          <div className="flex items-center space-x-4 text-[#4F3527] text-lg font-semibold">
            <div className="flex items-center space-x-1">
              <img src="https://placehold.co/24x24" alt="" className="w-6 h-6 bg-white rounded" />
              <span>{rooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <img src="https://placehold.co/24x24" alt="" className="w-6 h-6 bg-white rounded" />
              <span>{size}</span>
            </div>
          </div>
        )}
        {address && (
          <p className="text-base text-stone-700">{address}</p>
        )}
        {price && (
          <div className="flex justify-between items-center pt-2">
            <div className="text-xl font-bold text-[#4F3527]">{price}</div>
            {actionButton}
          </div>
        )}
        {additionalDetails}
      </div>
    </div>
  );
}

export default Card;
