import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import listingsData from './real_estate_houses_with_ids.json'; // adjust the path if needed
import Card from './Card'; // make sure this path is correct

function Home() {
  const [offers, setOffers] = useState([]);

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
            title={offer.title}
            price={`$${offer.price}`}
            rooms={`${offer.bedroom_count} Rooms`}
            size={`${offer.size ? offer.size : 'N/A'}`}
            actionButton={
              <button className="bg-[#2B1B12] text-white text-sm font-semibold px-4 py-2 rounded-lg">
                Sign up
              </button>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
