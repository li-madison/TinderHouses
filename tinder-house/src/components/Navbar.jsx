import React from "react";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    
    <div className = "flex flex-row justify-between items-center px-20 py-4 bg-[#f9dac4]">
      <Link to ="/" className=" justify-start text-stone-900 text-2xl font-extrabold font-['Montserrat']">miCasa</Link>
 
    
    <Link to ="/houses" className=" text-stone-900 text-lg font-bold font-['Montserrat']">Finder</Link>
    <Link to ="/finance" className=" text-stone-900 text-lg font-bold font-['Montserrat']">Finances</Link>
    <Link to ="/Profile"><VscAccount className = " text-stone-900 transition duration-300" size = "2rem"/></Link>
    </div>
  
  );
}

export default Navbar;