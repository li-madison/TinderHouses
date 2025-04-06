import { useEffect, useState, useContext } from 'react';
import { FaXmark, FaRegHeart } from 'react-icons/fa6';
import { LuBedDouble, LuToilet } from "react-icons/lu";
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdHeartDislike } from "react-icons/io";
import listingsData from '../Pages/real_estate_houses_with_ids.json'; // update path as needed
import { useFavorites } from '../Contexts/FavoriteContext'; 
import { ProfileContext } from '../Contexts/ProfileContext';
import Expanded from '../components/Expanded';

function Matches() {
  const [listings, setListings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { profile } = useContext(ProfileContext);
  const [expandedOffer, setExpandedOffer] = useState(null);

  const shuffleArray = (array) => {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    // Shuffle the listings data before setting it
    let filteredListings = listingsData;
    if (profile && profile.city) {
      const cityFiltered = listingsData.filter(
        (listing) =>
          listing.city.toLowerCase() === profile.city.toLowerCase()
      );
      setListings(shuffleArray(filteredListings));
      if (cityFiltered.length > 0) {
        filteredListings = cityFiltered;
      }
  }



  setListings(shuffleArray(filteredListings));
  
 }, [profile]);


  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleYes = () => {
    setSwipeDirection('right');
    setTimeout(() => {
      //setFavorites([...favorites, listings[currentIndex]]);
      addFavorite(listings[currentIndex]);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      nextCard();
    }, 300);
  };

  const handleNo = () => {
    setSwipeDirection('left');
    setTimeout(() => {
      nextCard();
      
    }, 300);
  };

  const nextCard = () => {
    setSwipeDirection(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const exitAnimation = {
    left: { opacity: 0, x: -300, rotate: -10 },
    right: { opacity: 0, x: 300, rotate: 10 },
  };

  

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        {listings.length > 0 && currentIndex < listings.length && (
          <motion.div
            key={listings[currentIndex].id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={exitAnimation[swipeDirection] || { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#DDC7BB] w-[90%] md:w-[50%] rounded-2xl shadow-md overflow-hidden flex flex-col space-y-2 m-8"
          >
            <div className="flex flex-col space-x-2">
              <img
                src={listings[currentIndex].img}
                alt="house"
                className="w-full h-72 object-cover rounded-sm mb-4 p-4"
              />
              <span className="text-xl font-bold text-stone-900 px-4">
                {listings[currentIndex].street_address},<br />
                {listings[currentIndex].city}, {listings[currentIndex].state}
              </span>

              <div className="pl-4">
                <div className="flex flex-row justify-between items-center pr-8">
                <p className="text-[#4f3527] font-bold text-xl ">
                    ${Number(listings[currentIndex].price).toLocaleString()}
                </p>

                <div
                  onClick={() => setExpandedOffer(listings[currentIndex])}
                  className="bg-[#2b1b12] text-white font-semibold text-lg px-3 py-1 rounded-lg self-start cursor-pointer"
                  >
                  More
                </div>

                </div>
                <div className="flex flex-row justify-between pr-8">
                  <div className="pt-2 pb-2 text-xl">
                    <div className="flex flex-row items-center">
                      <LuBedDouble className="" />
                      <p className="pl-4">{listings[currentIndex].bedroom_count} Rooms</p>
                    </div>
                    <div className="flex flex-row items-center">
                      <LuToilet className="" />
                      <p className="pl-4">{listings[currentIndex].bathroom_count} Bathrooms</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={handleNo}
                  className="p-4 bg-red-600 rounded-full shadow-xl flex justify-center items-center mb-4 ml-8 mt-2"
                >
                  <FaXmark className="text-white text-xl" />
                </button>
                <button
                  onClick={handleYes}
                  className="p-4 mr-8 bg-green-600 rounded-full shadow-xl flex justify-center items-center"
                >
                  <FaRegHeart className="text-white text-xl" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add this modal block (e.g., at the bottom of the return, before Favorites Section) */}
        {expandedOffer && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-2/3">
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

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div className="w-full mt-10 p-4">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Your Favorites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav) => (
              <motion.div
                key={fav.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#DDC7BB] rounded-xl shadow-md p-4 relative"
              >
                <img src={fav.img} alt="house" className="rounded-lg h-40 w-full object-cover mb-3" />
                <div className = "flex flex-row justify-between">
                <p className="font-bold">{fav.street_address}, {fav.city}, {fav.state}</p>
                <p> {fav.id} </p>
                </div>
               
                <p>${Number(fav.price).toLocaleString()}</p>
                <div className="flex justify-between items-center mt-2">
                <button 
                  onClick={() => setExpandedOffer(fav)}
                  className="absolute bottom-2 right-2 bg-[#2B1B12] text-white text-sm font-semibold px-3 py-1 rounded-lg"
                >More
                </button>

                </div>

                <p>{fav.bedroom_count} bed / {fav.bathroom_count} bath</p>
                <button
                  onClick={() => removeFavorite(fav.id)}
                  className="absolute top-2 right-2 bg-pink-500 text-white p-2 rounded-full"
                >
                  <IoMdHeartDislike />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Matches;
