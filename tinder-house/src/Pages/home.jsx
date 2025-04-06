// Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import listingsData from './real_estate_houses_with_ids.json';
import Card from '../components/Card';
import Expanded from '../components/Expanded';

function Home() {
  const [offers, setOffers] = useState([]);
  const [expandedOffer, setExpandedOffer] = useState(null);

  useEffect(() => {
    // Take the first three items from the listings
    const threeOffers = listingsData.slice(0, 3);
    setOffers(threeOffers);
  }, []);

  return (
    <div className="min-h-screen bg-[#FEF7F2] flex flex-col p-6 space-y-10">
      {/* Header Section */}
      <div className="flex flex-col items-center space-y-4 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <div className="text-5xl font-extrabold text-[#2B1B12] font-montserrat text-center">
          Find Your <br className="lg:hidden" /> Dream Home
        </div>
        <div className="text-lg text-[#2B1B12] font-montserrat text-center">
          Explore the best offers in your area
        </div>
        <Link
          to="/register"
          className="bg-[#2B1B12] text-white font-semibold text-lg px-6 py-3 rounded-lg mt-4 lg:mt-0"
        >
          Sign up
        </Link>
      </div>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {offers.map((offer, index) => (
          <Card
            key={offer.id || index}
            image={offer.img}
            city={offer.city}
            price={`$${offer.price}`}
            rooms={`${offer.bedroom_count}`}
            size={`${offer.sq_ft ? offer.sq_ft : 'N/A'} sq ft`}
            actionButton={
              <button
                onClick={() => setExpandedOffer(offer)}
                className="bg-[#2B1B12] text-white text-sm font-semibold px-4 py-2 rounded-lg"
              >
                More
              </button>
            }
          />
        ))}
      </div>
      
      {/* Expanded Component Popup */}
      {expandedOffer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <Expanded
              image={expandedOffer.img}
              city={expandedOffer.city}
              price={expandedOffer.price}
              rooms={expandedOffer.bedroom_count}
              size={`${expandedOffer.sq_ft ? expandedOffer.sq_ft : 'N/A'} sq ft`}
              address={expandedOffer.street_address}
              downPayment={expandedOffer.down_payment_required}
              state={expandedOffer.state}
              zipCode={expandedOffer.zip_code}
              bathroomCount={expandedOffer.bathroom_count}
              risks={expandedOffer.risks}
              actionButton={
                <button 
                  onClick={() => setExpandedOffer(null)}
                  className="bg-[#2B1B12] text-white text-sm font-semibold px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
