import React from "react";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className ="flex flex-row items-center px-20 py-4 justify-between bg-[#f9dac4 lg:">
    
      <Link to ="/" className="text-stone-900 text-2xl font-extrabold font-['Montserrat']">miCasa</Link>
 
  
    <Link to ="/houses" className=" text-stone-900 text-lg font-bold font-['Montserrat']">Matches</Link>
    <Link to ="/finance" className=" text-stone-900 text-lg font-bold font-['Montserrat']">Finances</Link>
    

    <Link to ="/Profile"><VscAccount className = " text-stone-900 transition duration-300" size = "2rem"/></Link>
    </div>
  
  );
}

export default Navbar;