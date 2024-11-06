'use client';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import { auth } from '../lib/Firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User registered:', user);
      navigate('/Login'); // Navigate to Login page after successful signup
    } catch (error) {
      console.error('Error registering user:', error);
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-950">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full transition-transform transform hover:scale-105"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600 font-serif">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700" style={{ color: 'black' }}>Email</label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700" style={{ color: 'black' }}>Password</label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700" style={{ color: 'black' }}>Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Signup
          </button>
        </form>
        <p className="mt-4 text-center" style={{ color: 'black' }}>
          Now back to{' '}
          <Link to="/Login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
