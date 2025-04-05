import React from "react";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div> 
    <div className = "flex flex-row justify-between items-center px-20 py-4 bg-lightBlue">
        <div className='text-darkBlue text-3xl poppins-bold'>Tinder Houses</div>
        <div className = "flex flex-row gap-8 poppins-medium "> 
            <Link to = "/" className = " hover:text-blue1 transition duration-300"> Home </Link>
            <Link to = "/finance" className = " hover:text-blue1 transition duration-300"> Financial Planning</Link>
            <Link to = "/houses" className = " hover:text-blue1 transition duration-300"> Explore Houses</Link>
        </div>
        <Link to ="/Profile"><VscAccount className = "hover:text-blue1 transition duration-300" size = "2rem"/></Link>
  </div>
  <hr className = "w-full border-t-2 border-darkBlue border-opacity-50"/>
  </div>
  );
}

export default Navbar;