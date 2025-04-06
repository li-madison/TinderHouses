import React from 'react'
import { Link } from "react-router-dom";

function home() {
  return (
    <div>


<div className="min-h-screen bg-red-50 flex flex-col p-6 space-y-10">

  {/* Header Section */}
  <div className="flex flex-col items-start space-y-4 lg:space-y-0 lg:flex-row lg:items-center justify-between">
    <div className="text-5xl font-extrabold text-stone-900 font-montserrat">
      Find Your <br className="lg:hidden" /> Dream Home
    </div>
    <br/>
    <div className="text-lg font-bold text-stone-700 max-w-xl">
      blahblahblah<br/>-<br/>-<br/>-
    </div>
    <Link to ='/register' className="bg-stone-900 text-white font-semibold text-lg px-6 py-3 rounded-lg self-start lg:self-auto">
      Sign up
    </Link>
  </div>

  {/* Section Title */}
  <h2 className="text-4xl text-center font-extrabold text-stone-900 font-montserrat">
    Popular Offers
  </h2>

  {/* Cards Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Card */}
    {[
      {
        title: "San Francisco, California",
        price: "$2,500,000",
        rooms: "4 Rooms",
        size: "3,500 sq ft",
        image: "https://placehold.co/402x402",
      },
      {
        title: "Palo Alto, California",
        price: "$3,700,000",
        rooms: "6 Rooms",
        size: "4,000 sq ft",
        image: "https://placehold.co/424x424",
      },
      {
        title: "Beverly Hills, California",
        price: "$850,000",
        rooms: "3 Rooms",
        size: "1,500 sq ft",
        image: "https://placehold.co/392x392",
      },
    ].map((card, i) => (
      <div
        key={i}
        className="bg-stone-300 rounded-2xl shadow-md overflow-hidden flex flex-col"
      >
        <img src={card.image} alt="" className="w-full h-64 object-cover" />
        <div className="p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <img src="https://placehold.co/24x24" alt="" className="w-6 h-6" />
            <span className="text-xl font-bold text-stone-900">
              {card.title}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-stone-700 text-lg font-semibold">
            <div className="flex items-center space-x-1">
              <img src="https://placehold.co/24x24" className="w-6 h-6 bg-white rounded" />
              <span>{card.rooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <img src="https://placehold.co/24x24" className="w-6 h-6 bg-white rounded" />
              <span>{card.size}</span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="text-xl font-bold text-stone-700">{card.price}</div>
            <button className="bg-stone-900 text-white text-sm font-semibold px-4 py-2 rounded-lg">
              Sign up
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  )
}

export default home
