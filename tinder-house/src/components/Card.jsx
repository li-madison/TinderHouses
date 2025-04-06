// Card.jsx
import React from 'react';
import { LuBedDouble } from 'react-icons/lu';
import { MdSquareFoot } from "react-icons/md";
import { FiMapPin } from 'react-icons/fi';

function Card({ 
  image, 
  city, 
  price, 
  rooms, 
  size, 
  address, 
  additionalDetails, 
  actionButton 
}) {
  return (
    <div className="bg-stone-300 rounded-2xl shadow-md overflow-hidden flex flex-col">
      <img src={image} alt={city} className="w-full h-64 object-cover" />
      <div className="p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <FiMapPin className="w-6 h-6" />
          <span className="text-xl font-bold text-[#2B1B12]">{city}</span>
        </div>
        {rooms && size && (
          <div className="pt-2 pb-2 text-xl">
            <div className="flex flex-row items-center">
              <LuBedDouble />
              <p className="pl-4">{rooms} Rooms</p>
            </div>
            <div className="flex flex-row items-center">
              <MdSquareFoot className="w-6 h-6" />
              <p className="pl-4">{size}</p>
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
