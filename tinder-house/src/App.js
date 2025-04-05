import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className = "bg-white">
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/finance" element={<finance/>}/>
        <Route path="/houses" element={<houses/>}/>
        <Route path= "/Profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
        <Route path="/Login" element={<LoginPage/>}/>
        <Route path="/Register" element={<RegisterPage/>}/>
        

      </Routes>
    </Router>
  </div> 
  );
}

export default App;
