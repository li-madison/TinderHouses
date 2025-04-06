import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/authContext';

function LoginPage() {

    const { user, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {  // Check if a user is logged in
            navigate('/'); // Redirect to home if logged in
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            setError('Invalid credentials, please try again.');
        }
    };

  return (
    <div>
        <div className="flex flex-col items-center  h-screen bg-[#FAEDE4]">
            <form  onSubmit={handleSubmit} className=" flex flex-col p-6 w-full items-center">
                <p className = "poppins-medium text-darkBlue pt-5 text-xl ">Sign in to start planning!</p>
                <input 
                    type="email" 
                    placeholder="Email" 
                    className = " border rounded-xl border-blue3 w-56 mx-auto p-2 m-4 text-black/50 "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className = "border rounded-xl border-blue3 w-56 mx-auto p-2 m-4 text-black/50" 
                    required
                    onInvalid= {(e) => e.target.setCustomValidity('Please enter your password')}
                    onInput={(e) => e.target.setCustomValidity('')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className = " text-center border rounded-xl  w-56 mx-auto p-2 m-4 bg-[#c27b7b] text-white hover:bg-white hover:text-[#c27b7b] hover:border-[#c27b7b]" > 
                    Sign in 
                </button>
                <div  className = " flex flex-col items-center text-xs">
                    <p className = "mb-3 text-darkBlue hover:underline hover:underline-offset-2"> Forgot username or password? </p>
                    <p> Don't have an account? </p>
                    <p className = "text-darkBlue hover:underline hover:underline-offset-2"> 
                        <Link to="/register" className=""> Create an Account </Link>
                    </p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage
