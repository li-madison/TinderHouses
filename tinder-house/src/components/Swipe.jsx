import { useEffect, useState } from 'react';
import { FaXmark, FaRegHeart } from 'react-icons/fa6';
import { LuBedDouble, LuToilet } from "react-icons/lu";
import { motion, AnimatePresence } from 'framer-motion';
import listingsData from '../Pages/real_estate_houses_with_ids.json'; // update path as needed

function Matches() {
  const [listings, setListings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(null);

  useEffect(() => {
    setListings(listingsData);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleYes = () => {
    setSwipeDirection('right');
    setTimeout(() => {
      setFavorites([...favorites, listings[currentIndex]]);
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
            className="bg-stone-300 w-[90%] md:w-[50%] rounded-2xl shadow-md overflow-hidden flex flex-col space-y-2 m-8"
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
                    ${listings[currentIndex].price}
                  </p>
                  <div className="bg-[#2b1b12] text-white font-semibold text-lg px-3 py-1 rounded-lg self-start">
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
                className="bg-stone-200 rounded-xl shadow-md p-4 relative"
              >
                <img src={fav.img} alt="house" className="rounded-lg h-40 w-full object-cover mb-3" />
                <p className="font-bold">{fav.street_address}, {fav.city}, {fav.state}</p>
                <p>${fav.price}</p>
                <p>{fav.bedroom_count} bed / {fav.bathroom_count} bath</p>
                <button
                  onClick={() => setFavorites(favorites.filter((favorite) => favorite.id !== fav.id))}
                  className="absolute top-2 right-2 bg-pink-500 text-white p-2 rounded-full"
                >
                  <FaRegHeart />
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
