import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/home'
import Finance from './Pages/finance'
import Houses from './Pages/houses'
import Profile from './Pages/profile'
import Login from './Pages/login'
import Register from './Pages/register'
import PrivateRoute from "./components/PrivateRoute"
import {AuthProvider} from './Contexts/authContext'
import Chatbot from './components/Chatbot'; // Import the Chatbot component



function App() {
  return (
    <AuthProvider>
         <div className = "bg-red-200">
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/finance" element={<Finance/>}/>
        <Route path="/houses" element={<Houses/>}/>
        <Route path= "/Profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
      
      </Routes>
    </Router>
    <Chatbot /> {/* Add the Chatbot component here */}
  </div> 
    </AuthProvider>
   
  );
}

export default App;
