import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { signOut } from "firebase/auth";



function ProfilePage() {

const [error, setError] = useState('');
const navigate = useNavigate();

const logout = async (e) => {
    e.preventDefault();
    if(window.confirm('Are you sure you want to log out?')) {
    try {
        await signOut(auth);
        navigate('/');
    }  catch (error) {
        setError('Error logging out, please try again.');
    }
  }
};



  return (
    <div className = "flex flex-col items-center h-screen">
    ProfilePage
    <form onSubmit={logout}>
        <button
        type="submit"
        className = " text-center border rounded-xl border-blue-500 w-56 mx-auto p-2 m-4 bg-darkBlue text-white hover:text-black hover:bg-white hover:border-darkBlue " > 
        Log Out
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>

    
    </div>
  )
}

export default ProfilePage
