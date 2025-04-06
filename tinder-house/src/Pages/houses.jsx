import { useEffect, useState } from 'react';
import { FaXmark, FaRegHeart } from 'react-icons/fa6';
import listingsData from './real_estate_houses_with_ids.json'; // adjust the path if needed
import { LuBedDouble } from "react-icons/lu";
import { LuToilet } from "react-icons/lu";

function Matches() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    setListings(listingsData);
  }, []);

  return (
    <div className="flex flex-col items-center">
    {listings.map((listing) => (
      <div
        key={listing.id}
      className="bg-stone-300 w-[60%] rounded-2xl shadow-md overflow-hidden flex flex-col space-y-2 m-8"
      >
        <div className="flex flex-col space-x-2">
          <img src={listing.img} alt="" className="w-30 h-30 object-cover rounded-sm mb-4 p-4 " />
          <span className="text-xl font-bold text-stone-900">{listing.title}</span>
        
        <div className="pl-4">
          <div className="flex flex-row justify-between">
        <p className="text-[#4f3527] font-bold text-xl ">{listing.street_address}, <br/> {listing.city}, {listing.state}</p>
        <br/>
        <p className="pr-8 font-bold text-xl text-[#916c22]">${listing.price}</p>
        </div>
        <div className="flex flex-row justify-between">
        <div className="pt-2 pb-2 text-xl">
        <div className="flex flex-row items-center "> 
          <LuBedDouble className=""/> 
          <p className="pl-4">{listing.bedroom_count} Rooms</p>
          </div>
          <div className="flex flex-row items-center">
        <LuToilet className="" /><p className="pl-4">{listing.bathroom_count} Bathrooms</p>
        </div>
        </div>
         <div  className="bg-[#2b1b12] text-white font-semibold text-lg px-3 py-1 mr-8 mt-2 rounded-lg self-start lg:self-auto">
              More
            </div>
          
        </div>
        
        </div>
        <div className= "flex justify-between items-center">
        <div className="p-4 bg-red-600 rounded-full shadow-xl flex justify-center items-center mb-4 ml-8 mt-2">
               <FaXmark className="text-white text-xl" />
           </div>
           <div className="p-4 mr-8 bg-green-600 rounded-full shadow-xl flex justify-center items-center">
               <FaRegHeart className="text-white text-xl" />
           </div>
           </div>

        </div>
       
        
      </div>
    ))}
    </div>
  );
}

export default Matches;