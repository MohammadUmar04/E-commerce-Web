'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../Components/Navbar';

const CartItem = ({ item, onQuantityChange, onDelete, onBuy }) => (
  <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
    <img
      src={`https://picsum.photos/200/300?random=${item.id}`}
      alt={item.name}
      className="w-full h-48 object-cover rounded-lg mb-4"
    />
    <h3 className="text-lg font-semibold">{item.name}</h3>
    <p className="text-blue-600 font-bold">${item.price.toFixed(2)}</p>
    <div className="flex items-center mt-4">
      <button 
        onClick={() => onQuantityChange(item.id, 'decrement')} 
        className="px-2 bg-gray-300 rounded-l-lg hover:bg-gray-400">
        -
      </button>
      <span className="px-4">{item.quantity}</span>
      <button 
        onClick={() => onQuantityChange(item.id, 'increment')} 
        className="px-2 bg-gray-300 rounded-r-lg hover:bg-gray-400">
        +
      </button>
    </div>
    <p className="text-gray-700 mt-2">Total: ${(item.price * item.quantity).toFixed(2)}</p>
    <div className="flex justify-between mt-4">
      <button 
        onClick={() => onBuy(item.id)} 
        className="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600 transition-colors">
        Buy
      </button>
      <button 
        onClick={() => onDelete(item.id)} 
        className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-colors">
        Delete
      </button>
    </div>
  </div>
);

function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Product 1', price: 25.00, quantity: 1 },
  ]);

  const handleQuantityChange = (id, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + (action === 'increment' ? 1 : -1)) }
          : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleBuyItem = (id) => {
    // Handle buying an item (add logic for handling purchase or checkout)
    console.log('Buying item with id:', id);
    router.push('/Checkout');
  };

  const getTotalPrice = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen font-sans">
        <div className="text-center bg-blue-500 text-white py-16 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-2">Your Shopping Cart</h1>
          <p className="text-lg">Here are the items you've added to your cart!</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-xl font-semibold text-gray-600">Your cart is empty.</p>
          </div>
        ) : (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Items in Cart</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onDelete={handleDeleteItem}
                  onBuy={handleBuyItem}
                />
              ))}
            </div>
            <div className="text-right mt-8">
              <h3 className="text-2xl font-semibold">Total Price: ${getTotalPrice()}</h3>
            </div>
          </div>
        )}

        <div className="text-center mt-10">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => router.push('/Home')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
