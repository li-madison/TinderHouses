import { useEffect, useState } from 'react';
import listingsData from './real_estate_houses_with_ids'; // adjust the path if needed
import { FaLocationDot } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

function Houses() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    setListings(listingsData);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-extrabold text-stone-900">Real Estate Listings</h1>



<div className="w-[1440px] h-[2003px] relative bg-white overflow-hidden">
   <div className="w-[1440px] h-[539px] left-0 top-[4492px] absolute bg-stone-300" />
 


   <div className="w-96 h-16 left-[533px] top-[148px] absolute justify-start text-stone-900 text-5xl font-extrabold font-['Montserrat']">Your Matches</div>




   <div className="w-[575px] h-[587.78px] left-[365px] top-[270.09px] absolute origin-top-left rotate-[-1.50deg] bg-stone-300 rounded-2xl shadow-[0px_4px_30px_0px_rgba(43,27,18,0.12)] overflow-hidden">
       <div className="w-[566.24px] h-80 left-[565.94px] top-[356.44px] absolute bg-zinc-300" />
       <img className="w-[627.74px] h-96 left-[585.19px] top-[423.44px] absolute" src="https://placehold.co/628x408" />
   </div>


   <div className="w-[575px] h-[587.78px] left-[1000.80px] top-[857.68px] absolute origin-top-left rotate-[-178.50deg] bg-stone-300 rounded-2xl shadow-[0px_5px_30px_0px_rgba(43,27,18,0.12)] overflow-hidden">
       <div className="w-[566.24px] h-80 left-[23.96px] top-[-11px] absolute bg-zinc-300" />
       <img className="w-[627.74px] h-96 left-[-16.52px] top-[-12px] absolute" src="https://placehold.co/628x408" />
   </div>


   <div className="w-[575px] h-[609px] left-[400px] top-[234px] absolute bg-stone-300 rounded-2xl shadow-[0px_5px_20px_0px_rgba(43,27,18,0.12)] overflow-hidden">
       <div className="w-[575px] h-96 left-0 top-0 absolute bg-zinc-300" />
       <img className="w-[638.22px] h-96 left-[-21px] top-[-1px] absolute" src="https://placehold.co/638x424" />
       <img className="w-6 h-6 left-[20px] top-[374px] absolute" src="https://placehold.co/24x24" />
       <div className="left-[52px] top-[374px] absolute justify-start text-stone-900 text-xl font-bold font-['Montserrat']">Palo Alto, California</div>
       <div className="left-[429px] top-[414px] absolute justify-start text-stone-700 text-xl font-bold font-['Montserrat']">$3,700,000</div>
       <div className="w-6 h-6 left-[20px] top-[423px] absolute bg-white rounded" />
       <img className="w-6 h-6 left-[20px] top-[423px] absolute" src="https://placehold.co/24x24" />
       <div className="left-[52px] top-[424px] absolute justify-start text-stone-700 text-lg font-semibold font-['Montserrat']">6 Rooms</div>
       <div className="w-6 h-6 left-[20px] top-[465px] absolute bg-white rounded" />
       <div className="left-[52px] top-[466px] absolute justify-start text-stone-700 text-lg font-semibold font-['Montserrat']">4,000 sq ft</div>
       <img className="w-6 h-6 left-[20px] top-[465px] absolute" src="https://placehold.co/24x24" />
       <div className="w-24 h-10 left-[456px] top-[449px] absolute bg-stone-900 rounded-lg" />
       <div className="left-[487px] top-[461px] absolute justify-start text-white text-sm font-semibold font-['Montserrat']">More</div>
       <div className="w-[480px] h-14 left-[47px] top-[527px] absolute inline-flex justify-between items-start">
           <div className="p-4 bg-red-600 rounded-[31px] shadow-[0px_10px_10px_-5px_rgba(0,0,0,0.04)] shadow-xl inline-flex flex-col justify-start items-start gap-2.5">
               <FaXmark className="text-white text-xl" />
           </div>
           <div className="p-4 bg-green-600 rounded-[31px] shadow-[0px_10px_10px_-5px_rgba(0,0,0,0.04)] shadow-xl inline-flex flex-col justify-start items-start gap-2.5">
               <FaRegHeart className="text-white text-xl" />
           </div>
       </div>     


   </div>
  
</div>

{listings.map((listing) => (
        <div
          key={listing.id}
          className="bg-stone-300 h-fit w-fit p-8 rounded-2xl shadow-md overflow-hidden flex flex-col space-y-2"
        >
          <div className="flex flex-col space-x-2">
            <img src={listing.img} alt="" className="w-30 h-30 object-cover rounded-2xl mb-4 " />
            <span className="text-xl font-bold text-stone-900">{listing.title}</span>
          
          <p>{listing.street_address}, <br/> {listing.city}, {listing.state}</p>
          <p>Price: ${listing.price}</p>
          <p>Bedrooms: {listing.bedroom_count}</p>
          <p>Bathrooms: {listing.bathroom_count}</p>
          <p>Down Payment: ${listing.down_payment_required}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Houses;