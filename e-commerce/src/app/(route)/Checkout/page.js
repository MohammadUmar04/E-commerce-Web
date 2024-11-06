'use client';
import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';

export default function Checkout() {
  const [cartItems] = useState([{ id: 1, name: 'Product 1', price: 10.00, quantity: 1 }]);
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    email: '',
  });

  const [message, setMessage] = useState({ type: '', content: '' });

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  // Enhanced validation function
  const validateInputs = () => {
    const { name, address, city, zip, email } = billingInfo;

    // Check all fields are filled
    if (!name || !address || !city || !zip || !email) {
      setMessage({ type: 'error', content: 'Please fill in all billing information.' });
      return false;
    }

    // Check if email is valid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage({ type: 'error', content: 'Please enter a valid email address.' });
      return false;
    }

    // Check if zip code is valid (assuming US format, you can adjust as needed)
    const zipPattern = /^\d{5}(?:[-\s]\d{4})?$/;
    if (!zipPattern.test(zip)) {
      setMessage({ type: 'error', content: 'Please enter a valid zip code.' });
      return false;
    }

    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateInputs()) {
      return;
    }

    setMessage({ type: 'success', content: 'Order placed successfully!' });
    setBillingInfo({ name: '', address: '', city: '', zip: '', email: '' });
  };

  return (
    <>
      <Navbar />
      <div className="p-6 min-h-screen font-sans">
        <div className="max-w-4xl mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>

          <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))
            )}
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Billing Information</h2>
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={billingInfo.name}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 bg-gray-700 rounded"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={billingInfo.address}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 bg-gray-700 rounded"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={billingInfo.city}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 bg-gray-700 rounded"
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="Zip Code"
              value={billingInfo.zip}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 bg-gray-700 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={billingInfo.email}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 bg-gray-700 rounded"
              required
            />
          </div>

          {message.content && (
            <p className={message.type === 'error' ? 'text-red-500' : 'text-green-500'}>
              {message.content}
            </p>
          )}

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-green-500 hover:bg-green-600 p-2 rounded"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
