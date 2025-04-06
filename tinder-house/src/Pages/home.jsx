// Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import listingsData from './real_estate_houses_with_ids.json';
import Card from '../components/Card';
import Expanded from '../components/Expanded';
import { MdOutlineHouse } from "react-icons/md";



function Home() {
  const [offers, setOffers] = useState([]);
  const [expandedOffer, setExpandedOffer] = useState(null);

  useEffect(() => {
    // Take the first three items from the listings
    const threeOffers = listingsData.slice(0, 3);
    setOffers(threeOffers);
  }, []);

  return (
    <div className="min-h-screenflex flex-col space-y-10" style={{backgroundColor: "#fef7f2"}}>
      {/* Header Section */}
      
      <section className="flex flex-col items-center space-y-4 lg:space-y-8 px-16 pt-20 lg:flex-row lg:items-center justify-between h-64">

          <div className="text-5xl font-bold justify-start text-[#2B1B12] font-montserrat pt-4 ">
            Find Your <br /> 
            
          <div className="text-7xl text-[#2B1B12] pt-4 px-0 font-montserrat text-start">Dream Home</div> <br />
          <div className="text-lg text-[#2B1B12] font-montserrat px-0 text-start">Explore the best offers in your area</div>
        </div>
      </section>

      <div className="flex justify-start px-16 py-16 items-center">
        <Link
          to="/register"
          className="bg-[#2B1B12] text-white font-semibold text-lg px-12 mx-4 py-3 rounded-lg mt-4 lg:mt-0"
        >
          Sign up
        </Link>
      </div>


      {/* Section Title */}
      <section className="py-8 px- 32" style={{backgroundColor: "white"}}>
      <h2 className="text-4xl text-center font-extrabold text-[#2B1B12] font-montserrat">
        Popular Offers
      </h2>

      {/* Cards Grid */}  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-8 gap-6 mt-10">
        {offers.map((offer, index) => (
          <Card
            key={offer.id || index}
            image={offer.img}
            city={offer.city}
            price={`${Number(offer.price).toLocaleString()}`}
            rooms={`${offer.bedroom_count} Rooms`}
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
      </section>

      {/* Expanded Component Popup */}
      {expandedOffer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
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
  onClose={() => setExpandedOffer(null)}
/>

          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
