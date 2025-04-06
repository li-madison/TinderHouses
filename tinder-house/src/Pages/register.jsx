import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Contexts/authContext'

function RegisterPage() {

    const [error, setError] = useState('');
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(email, password);
            navigate('/profile'); 
        } catch (error) {
            setError('This email is already registered. Please use a different email.');
        }
    };

    return (
        <div>
        <div className="flex flex-col items-center h-screen bg-[#FAEDE4]">
        
           
            <form onSubmit={handleRegister}  className=" flex flex-col p-6 w-full items-center">
            <p className = "poppins-medium text-darkBlue pt-5 text-xl ">Register to start planning!</p>
                    <input
                        type="email"
                        id="email"
                        placeholder = "Email"
                        className="border rounded-xl border-blue3 w-56 mx-auto p-2 m-4 text-black/50"                      
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder ="Password"
                        className="border rounded-xl border-blue3 w-56 mx-auto p-2 m-4 text-black/50"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="text-center border rounded-xl border-darkBlue w-56 mx-auto p-2 m-4 bg-[#c27b7b] text-white hover:bg-white hover:text-[#c27b7b] hover:border-[#c27b7b]"
                    >
                    Register
                </button>

            </form>
            <div className=" flex flex-col text-center text-xs">
            <p className="mb-3 text-darkBlue hover:underline hover:underline-offset-2 ">
                        Already have an account?{' '}
                <Link to="/login" className="">Login here</Link>
            </p>
            </div>
        </div>
    </div>

    );
}

export default RegisterPage;