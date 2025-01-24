import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome to Our App</h2>
                <div className="flex flex-col space-y-4">
                    <Link to="/login">
                        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
                            Login
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;