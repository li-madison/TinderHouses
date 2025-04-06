import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

function Houses() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const snapshot = await getDocs(collection(db, 'listings'));
      const data = snapshot.docs.map(doc => doc.data());
      setListings(data);
    };

    fetchListings();
  }, []);

  return (
    <div>
       <h1>Real Estate Listings</h1>
      {listings.map((listing, idx) => (
        <div key={idx}>
          <h3>{listing.address}</h3>
          <p>Price: ${listing.price}</p>
          <p>Bedrooms: {listing.bedrooms}</p>
          <p>Bathrooms: {listing.bathrooms}</p>
        </div>
      ))}
    </div>
  )
}

export default Houses
