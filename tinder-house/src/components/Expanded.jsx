// Expanded.jsx
import React from 'react';
import { LuBedDouble } from 'react-icons/lu';
import { MdSquareFoot } from "react-icons/md";
import { FiMapPin } from 'react-icons/fi';

function Expanded({ 
  image, 
  city, 
  price, 
  rooms, 
  size, 
  address, 
  risks, 
  downPayment, 
  state, 
  zipCode, 
  bathroomCount, 
  actionButton,
  additionalDetails 
}) {
  return (
    <div className="bg-stone-300 rounded-2xl shadow-md overflow-hidden flex flex-col">
      <img src={image} alt={city} className="w-full h-64 object-cover" />
      <div className="p-4 space-y-2">
        {/* City Section */}
        <div className="flex items-center space-x-2">
          <FiMapPin className="w-6 h-6" />
          <span className="text-xl font-bold text-[#2B1B12]">{city}</span>
        </div>

        {/* Rooms and Size Section */}
        {rooms && size && (
          <div className="pt-2 pb-2 text-xl">
            <div className="flex flex-row items-center">
              <LuBedDouble />
              <p className="pl-4">{rooms} Rooms</p>
            </div>
            <div className="flex flex-row items-center">
              <MdSquareFoot className="w-6 h-6" />
              <p className="pl-4">{size} sq ft</p>
            </div>
          </div>
        )}

        {/* Address */}
        {address && (
          <p className="text-base text-stone-700">{address}</p>
        )}

        {/* Price Section */}
        {price && (
          <div className="flex justify-between items-center pt-2">
            <div className="text-xl font-bold text-[#4F3527]">${price}</div>
            {actionButton}
          </div>
        )}

        {/* Additional Features Section */}
        <div className="pt-4">
          <h3 className="text-lg font-bold text-[#2B1B12] mb-2">Additional Features</h3>
          <ul className="text-base text-stone-700 space-y-1">
            {downPayment && <li>Down Payment Required: ${downPayment}</li>}
            {state && <li>State: {state}</li>}
            {zipCode && <li>Zip Code: {zipCode}</li>}
            {bathroomCount && <li>Bathrooms: {bathroomCount}</li>}
          </ul>
        </div>

        {/* Risks Section */}
        {risks && (
          <div className="pt-4">
            <h3 className="text-lg font-bold text-[#2B1B12] mb-2">Risks</h3>
            <ul className="text-base text-stone-700 space-y-1">
              {Object.entries(risks).map(([riskName, riskLevel]) => (
                <li key={riskName}>
                  {riskName.replace(/_/g, " ")}: {riskLevel}
                </li>
              ))}
            </ul>
          </div>
        )}

        {additionalDetails}
      </div>
    </div>
  );
}

export default Expanded;
