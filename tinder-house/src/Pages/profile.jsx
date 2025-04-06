import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase/firebase';
import { signOut } from "firebase/auth";
import { db, setDoc, doc, getDoc } from '../firebase/firebase';



function ProfilePage() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    age: '',
    city: '',
    state: '',
    zipCode: '',
    minBeds: '',
    income: '',
    priceRange: '',
  });
  const [isEditing, setIsEditing] = useState(false);

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
}

useEffect(() => {
  const fetchProfile = async () => {
    const docRef = doc(db, 'profiles', 'user-profile'); // Assuming a single profile document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProfile(docSnap.data()); // Set profile from Firestore
    }
  };
  fetchProfile();
}, []);

// Handle input change
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setProfile((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

const saveProfile = async () => {
  try {
    await setDoc(doc(db, 'profiles', 'user-profile'), profile);
    setIsEditing(false);
  } catch (error) {
    console.error('Error saving profile: ', error);
  }
};

  return (
    <div className = "flex flex-col px-[25%] h-screen bg-white">
      
      <form onSubmit={logout}>
        <div className="flex flex-row justify-between  py-2 pt-16"> 
        <h1 className="font-bold text-3xl ">Profile</h1>
        <button
        type="submit"
        className = " p-2 text-center border rounded-xl md:w-40 mx-auto bg-[#c27b7b] text-white hover:text-black hover:bg-white hover:border-darkBlue " >
           
        Log Out
        </button>
         
    </div>
     
        <div>
          <input
            type="text"
            className="bg-white pl-4"
            name="name"
            placeholder="name"
            value={profile.name}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="bg-white pl-4 text-[#2d2c2c] underline"
            value={profile.email}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <input
            type="text"
            name="phone"
            placeholder="phone number"
            className="bg-white pl-4"
            value={profile.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
      
        <h1 className="font-semibold text-2xl py-2 pt-6">Preferences</h1>
        <div className="flex flex-col md:flex-row md:space-x-1 lg:flex-row">
        <div className="pt-4">
          <label className="pb-2 font-medium">City</label> <br/>
          <input
            type="text"
            name="city"
            className="bg-[#f0e1d8] pl-4"
            value={profile.city}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="pt-4">
          <label className="pb-2  font-medium">State</label><br/>
          <input
            type="text"
            name="state"
            className="bg-[#f0e1d8] pl-4"
            value={profile.state}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="pt-4">
          <label className="pb-2 font-medium">Zip Code</label><br/>
          <input
            type="number"
            name="zipCode"
            className="bg-[#f0e1d8] pl-4"
            value={profile.zipCode}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        </div>
        <div className="pt-4">
          <label className="pb-2 font-medium">Rooms</label><br/>
          <input
            type="number"
            name="minBeds"
            className="bg-[#f0e1d8] pl-4"
            value={profile.minBeds}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="pt-4">
          <label className="pb-2 font-medium">Annual Income</label><br/>
          <input
            type="number"
            name="income"
            className="bg-[#f0e1d8] pl-4"
            value={profile.income}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="pt-4">
          <label className="pb-2 font-medium">Price Range</label><br/>
          <input
            type="number"
            name="priceRange"
            className="bg-[#f0e1d8] pl-4"
            value={profile.priceRange}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        
       

        {error && <p className="text-red-500 text-sm">{error}</p>}
    
      </form>

      {/* Save or Edit button */}
      <div className=" border my-8 p-2 bg-[#c27b7b] hover:bg-white hover:text-[#c27b7b] hover:border-[#c27b7b] rounded-xl text-white text-center">
        {isEditing ? (
          <Link to="/" onClick={saveProfile}>Save</Link>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </div>

      {/* Display Profile Picture */}
      {profile.profilePicURL && (
        <div>
          <h3>Profile Picture</h3>
          <img src={profile.profilePicURL} alt="Profile" style={{ width: '150px' }} />
        </div>
      )}

   
     
        
    

    
    </div>
  )
}


export default ProfilePage
