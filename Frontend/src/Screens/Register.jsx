import React, { useState ,useContext } from 'react';
import axiosInstance from '../config/axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';
const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const {setUser} = useContext(UserContext);

    function sumithandler(e) {
        e.preventDefault();
        axiosInstance.post('http://localhost:5000/user/register',{email,password}).then((res)=>{
            console.log(res.data);

            localStorage.setItem('token',res.data.token);
            setUser(res.data.user);

            
            navigate('/');
        }).catch((err)=>{
            console.log(err);
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>
                <form onSubmit={sumithandler}>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
                        Register
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-400">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;