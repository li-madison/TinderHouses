// Expanded.jsx
import React from 'react';
import { LuBedDouble, LuToilet } from 'react-icons/lu';
import { MdSquareFoot } from "react-icons/md";
import { FiMapPin } from 'react-icons/fi';
import { FaExclamationTriangle } from "react-icons/fa";

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
  onClose,
  additionalDetails 
}) {
  // Process risks (excluding coastal flooding and drought)
  const highRisks = risks
    ? Object.entries(risks)
        .filter(
          ([riskName, riskLevel]) =>
            riskLevel === "High" &&
            riskName !== "coastal_flooding_risk" &&
            riskName !== "drought_risk"
        )
        .map(([riskName]) => riskName.replace(/_/g, " "))
    : [];

  return (
    <div className="bg-stone-300 rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row">
      {/* Image Column: less than half (1/3 of width) */}
      <div className="md:w-1/3">
        <img 
          src={image} 
          alt={city} 
          className="w-full h-64 md:h-full object-cover" 
        />
      </div>
      {/* Text Column: occupies 2/3 of the width */}
      <div className="p-4 md:w-2/3 space-y-2 relative">
        {/* Top Row: City, Address and Price */}
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <FiMapPin className="w-6 h-6" />
              <span className="text-xl font-bold text-[#2B1B12]">{city}</span>
            </div>
            {address && (
              <p className="text-base text-stone-700">
                {address}
                {state && `, ${state}`}
                {zipCode && ` ${zipCode}`}
              </p>
            )}
          </div>
          {price && (
            <div className="text-xl font-bold text-[#4F3527]">${Number(price).toLocaleString()}</div>
          )}
        </div>

        {/* Additional Features Section */}
        <div className="pt-4">
          <h3 className="text-lg font-bold text-[#2B1B12] mb-2">Features</h3>
        </div>

        {/* House Details Section: Rooms, Size and Bathroom Count */}
        {(rooms && size && bathroomCount) && (
          <div className="pt-4">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row items-center">
                <LuBedDouble />
                <p className="pl-4">{rooms}</p>
              </div>
              <div className="flex flex-row items-center">
                <MdSquareFoot className="w-6 h-6" />
                <p className="pl-4">{size}</p>
              </div>
              <div className="flex flex-row items-center">
                <LuToilet className="w-6 h-6" />
                <p className="pl-4">{bathroomCount} Bathrooms</p>
              </div>
              <ul className="text-base text-stone-700 space-y-1">
            {downPayment && <li>Down Payment Required: ${downPayment}</li>}
          </ul>
            </div>
          </div>
        )}

        {/* Risks Section */}
        {risks && (
          <div className="pt-4">
            <h3 className="text-lg font-bold text-[#2B1B12] mb-2">Risks</h3>
            {/* Display a combined sentence for high risks */}
            {highRisks.length > 0 && (
              <p className="text-base text-stone-700 mt-2 flex flex-row">
               <FaExclamationTriangle className="w-[10%] h-[10%] mx-3"/> This area is prone to severe {highRisks.join(" and ")}, which can increase insurance rates.
              </p>
            )}
            {(risks.coastal_flooding_risk === "High" || risks.coastal_flooding_risk === "Moderate") &&
             (risks.drought_risk === "High" || risks.drought_risk === "Moderate") && (
              <p className="text-base text-stone-700 mt-2">
                Due to {risks.drought_risk.toLowerCase()} drought and {risks.coastal_flooding_risk.toLowerCase()} flood issues, this house could face serious foundation issues, which would not be a good investment.
              </p>
            )}
          </div>
        )}

        {additionalDetails}

        {/* Close Button at the bottom right */}
        <div className="flex justify-end">
          <button 
            onClick={onClose} 
            className="bg-[#2B1B12] text-white text-sm font-semibold px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Expanded;
