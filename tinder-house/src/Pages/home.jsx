import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import listingsData from './real_estate_houses_with_ids.json';
import Card from '../components/Card';

function Home() {
  const [offers, setOffers] = useState([])

  useEffect(() => {
    // Assuming listingsData is an array, take the first three items
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
        <div className="text-lg font-bold text-[#4F3527] max-w-xl text-center">
          blahblahblah<br />-<br />-<br />-
        </div>
        <Link
          to="/register"
          className="bg-[#2B1B12] text-white font-semibold text-lg px-6 py-3 rounded-lg mt-4 lg:mt-0"
        >
          Sign up
        </Link>
      </div>

      {/* Section Title */}
      <h2 className="text-4xl text-center font-extrabold text-[#2B1B12] font-montserrat">
        Popular Offers
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {offers.map((offer, index) => (
          <Card
            key={offer.id || index}
            image={offer.img} // ensure your JSON file has an "img" field or adjust accordingly
            city={offer.city}
            price={`$${offer.price}`}
            rooms={`${offer.bedroom_count} Rooms`}
            size={`${offer.sq_ft ? offer.sq_ft : 'N/A'} sq ft`}
            
            actionButton={
              <button
                onClick={() => setModalOpen(true)}
                className="bg-[#2B1B12] text-white text-sm font-semibold px-4 py-2 rounded-lg"
              >
                More
              </button>
            }
          />
        ))}
      </div>

      
      {/* Expanded Component */}
      {expandedOffer && (
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
      )}
    </div>
  );
}

export default Home;
