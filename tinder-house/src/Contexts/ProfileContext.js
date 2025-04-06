import React, { createContext, useState, useEffect } from 'react';
import { db, getDoc, doc } from '../firebase/firebase';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
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

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, 'profiles', 'user-profile');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    };
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};