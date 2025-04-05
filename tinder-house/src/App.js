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



function App() {
  return (
    <div className = "bg-white">
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/finance" element={<Finance/>}/>
        <Route path="/houses" element={<Houses/>}/>
        <Route path= "/Profile" element={<Profile/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        

      </Routes>
    </Router>
  </div> 
  );
}

export default App;
