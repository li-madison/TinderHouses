// Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import listingsData from './real_estate_houses_with_ids.json';
import Card from '../components/Card';

function Home() {
  const [offers, setOffers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Take the first three items from the listings
    const threeOffers = listingsData.slice(0, 3);
    setOffers(threeOffers);
  }, []);

  return (
    <div className="min-h-screen bg-[#FEF7F2] flex flex-col p-6 space-y-10">
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
                onClick={() => setModalOpen(true)}
                className="bg-[#2B1B12] text-white text-sm font-semibold px-4 py-2 rounded-lg"
              >
                More
              </button>
            }
          />
        ))}
      </div>

      {/* General Popup Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">General Popup</h2>
            <p>This is a general popup triggered by clicking the More button.</p>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 bg-[#2B1B12] text-white font-semibold px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
