    'use client'
    import React, { useState } from 'react';
    import { initializeApp } from "firebase/app";
    import { getFirestore, collection, addDoc } from "firebase/firestore";
    import Navbar from "../../Components/Navbar";

    const firebaseConfig = {
    apiKey: "AIzaSyA4nI3ybTZe1xuU58H8OeoQfnmxzjq-2DY",
    authDomain: "e-commerce-b92bf.firebaseapp.com",
    projectId: "e-commerce-b92bf",
    storageBucket: "e-commerce-b92bf.appspot.com",
    messagingSenderId: "760478209186",
    appId: "1:760478209186:web:2840a9ffefa666b9b8b3fb",
    measurementId: "G-JN97STGRJT"
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const ContactUs = () => {
        const [formData, setFormData] = useState({
            name: '',
            email: '',
            message: '',
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await addDoc(collection(db, "contacts"), formData);
                console.log('Form submitted:', formData);
                alert('Thank you for contacting us! We will get back to you shortly.');
                setFormData({ name: '', email: '', message: '' });
            } catch (error) {
                console.error("Error submitting form:", error);
                alert("There was an error submitting your message. Please try again later.");
            }
        };

        return (
            <>
                <Navbar />
                <div className="flex items-center justify-center min-h-screen font-sans p-4">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md transform transition-all duration-500 hover:shadow-xl hover:scale-105">
                        <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block" htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block" htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md transition-colors duration-300 hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </>
        );
    };

    export default ContactUs;
