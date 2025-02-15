"use client";

import React from 'react';
import Image from 'next/image';

function Contact() {
    const backgroundImageUrl = '/assets/contact-phone.png';

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section with Contact Header */}
            <div className="relative h-[40vh] flex items-center">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                >
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
                <div className="relative container mx-auto px-6 text-center text-white">
                    <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
                </div>
            </div>

            {/* Rest of your component code... */}
            {/* Description Section */}
            <section className="py-12 bg-gray-100">
                {/* Your existing description section code */}
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 bg-white">
                {/* Your existing contact info cards code */}
            </section>

            {/* Map Section */}
            <section id="map-section" className="py-16 bg-gray-100">
                {/* Your existing map section code */}
            </section>
        </main>
    );
}

export default Contact;