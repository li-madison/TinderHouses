import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {  
    const [user, setUser] = useState(null);

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user); 
    });

return unsubscribe;
}, []);

	
const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
const logout = () => signOut(auth);
 
  return (
  
    <AuthContext.Provider value={{ user, login, register, logout }}>
    {children}
  </AuthContext.Provider>
  
);

};