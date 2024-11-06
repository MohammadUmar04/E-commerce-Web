'use client';
import { useState, useEffect } from 'react';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check localStorage for dark mode preference on initial load
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);
    document.body.classList.toggle('bg-gray-900', savedDarkMode);
    document.body.classList.toggle('bg-white', !savedDarkMode);
  }, []);

  // Update dark mode class and save preference in localStorage
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.body.classList.toggle('bg-gray-900', darkMode);
    document.body.classList.toggle('bg-white', !darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <header className="bg-white dark:bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">E-Commerce</h1>

        {/* Menu for larger screens */}
        <nav className="hidden md:flex space-x-4">
          <a href="/Home" className="text-gray-800 dark:text-white hover:underline">Home</a>
          <a href="/productdetails" className="text-gray-800 dark:text-white hover:underline">Product Details</a>
          <a href="/Cart" className="text-gray-800 dark:text-white hover:underline">Cart</a>
          <a href="/Checkout" className="text-gray-800 dark:text-white hover:underline">Checkout</a>
          <a href="/Account" className="text-gray-800 dark:text-white hover:underline">Account</a>
          <a href="/Contact" className="text-gray-800 dark:text-white hover:underline">Contact Us</a>
        </nav>

        {/* Dark Mode and Menu Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full focus:outline-none"
          >
            {darkMode ? '🌙' : '☀️'}
          </button>
          
          {/* Menu button for small screens */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden bg-gray-200 dark:bg-gray-700 p-2 rounded-full focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden mt-4 flex flex-col items-center space-y-2">
          <a href="/Home" className="text-gray-800 dark:text-white hover:underline">Home</a>
          <a href="/productdetails" className="text-gray-800 dark:text-white hover:underline">Product Details</a>
          <a href="/Cart" className="text-gray-800 dark:text-white hover:underline">Cart</a>
          <a href="/Checkout" className="text-gray-800 dark:text-white hover:underline">Checkout</a>
          <a href="/Account" className="text-gray-800 dark:text-white hover:underline">Account</a>
          <a href="/Contact" className="text-gray-800 dark:text-white hover:underline">Contact Us</a>
        </nav>
      )}
    </header>
  );
}
