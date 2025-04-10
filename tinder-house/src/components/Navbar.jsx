import React from "react";
import { FaAlignRight } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex flex-row items-center px-16 py-4 justify-between bg-[#f9dac4]">

      <div>
        <Link to="/">
          <img src={"/Remove background project.png"} alt=" " className="w-full h-full"></img>
        </Link>
      </div>

      <div className="flex flex-row ml-auto space-x-6 px-16">
        <div>
          <Link to="/houses" className="text-stone-900 text-lg font-bold hover:shadow-lg transition-shadow duration-300 p-2 rounded"> Matches </Link>
        </div>
        <div>
          <Link to="/finance" className="text-stone-900 text-lg font-bold hover:shadow-lg transition-shadow duration-300 p-2 rounded">Advice </Link>
        </div>
      </div>

      <div>
        <Link to="/profile"> <VscAccount className="text-stone-900 transition duration-300 hover:text-[#d49c74]" size="2rem"/></Link>
      </div>
    </div>
  );
}

export default Navbar;