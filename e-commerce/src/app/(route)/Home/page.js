"use client";
import React, { useState } from "react";
import { useCart } from "../../CartContext";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import Navbar from '../../Components/Navbar';

function Home() {
  const { addToCart: addProductToCart } = useCart(); 
  const router = useRouter();

  const handleButtonClick = (product) => {
    addProductToCart({ ...product, quantity: 1 });
    router.push("/Cart");
  };

  const heroVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  };

  const categoryVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const productVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 min-h-screen font-sans">
        {/* Hero Section */}
        <motion.div
          className="text-center bg-orange-500 text-white py-16 rounded-lg shadow-lg"
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-2">Welcome to Your Store</h1>
          <p className="text-lg">Find the best products here at the best prices!</p>
        </motion.div>

        {/* Categories Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Top Categories</h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial="hidden"
            animate="visible"
            variants={categoryVariants}
            transition={{ duration: 0.6 }}
          >
            {["Fashion", "Electronics", "Home & Kitchen", "Beauty & Health"].map((category, index) => (
              <div
                key={index}
                className="bg-gray-200 p-6 text-center rounded-lg shadow transition-transform transform hover:scale-105 text-black"
              >
                {category}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Featured Products Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Featured Products</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={productVariants}
            transition={{ duration: 0.6 }}
          >
            {Array.from({ length: 20 }).map((_, index) => {
              const product = {
                id: index,
                name: `Product Name ${index + 1}`,
                price: (Math.random() * 100).toFixed(2),
                image: `https://picsum.photos/200/300?random=${index}`, // Updated image URLs
              };
              return (
                <motion.div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  <img
                    src={product.image}
                    alt={`Image of ${product.name}`}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    loading="lazy"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-orange-600 font-bold">${product.price}</p>
                  <button
                    className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleButtonClick(product);
                    }}
                  >
                    Buy
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <p className="mb-4">"Amazing product! Absolutely loved it!"</p>
                <p className="font-bold text-orange-500">- Customer {index + 1}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-10 bg-gray-900 text-white py-8 px-6 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Contact Us</h3>
              <p>Email: support@yourstore.com</p>
              <p>Phone: +123 456 789</p>
              <p>Address: 123 Store St, City, Country</p>
            </div>
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Quick Links</h3>
              <ul>
                {["Home", "Shop", "About", "Contact"].map((link, idx) => (
                  <li key={idx}><a href="#" className="hover:underline">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                {["Facebook", "Twitter", "Instagram"].map((platform, idx) => (
                  <a key={idx} href="#" className="hover:text-orange-500">{platform}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;
