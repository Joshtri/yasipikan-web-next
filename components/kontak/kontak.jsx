"use client";

import React from 'react';
import Image from 'next/image';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { BsTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

function Contact() {
    const backgroundImageUrl = '/assets/contact-phone.png';
    
    // Function to create WhatsApp link with predefined message
    const createWhatsAppLink = (phoneNumber) => {
        const message = "Halo, saya ingin bertanya tentang Yayasan Sirih Pinang Kebaikan";
        return `https://wa.me/${phoneNumber.replace(/^0/, '62')}?text=${encodeURIComponent(message)}`;
    };

    const contactInfo = [
        {
            title: "Alamat Resmi",
            icon: <FaMapMarkerAlt className="text-4xl text-blue-500 mb-4" />,
            content: "Jl. El Tari No. 23, Kel. Oebobo, Kec. Oebobo",
            link: "https://goo.gl/maps/yourGoogleMapsLink",
            linkText: "Lihat di Maps",
            linkClass: "text-blue-500 hover:text-blue-600"
        },
        {
            title: "Kontak Kami",
            icon: <BsTelephoneFill className="text-4xl text-green-500 mb-4" />,
            content: [
                { number: "085237555490", primary: true },
                { number: "085253421441" },
                { number: "087778089663" }
            ],
            isPhoneSection: true
        },
        {
            title: "Email Resmi",
            icon: <MdEmail className="text-4xl text-red-500 mb-4" />,
            content: "yasipikan@gmail.com",
            link: "mailto:yasipikan@gmail.com",
            linkText: "Kirim Email",
            linkClass: "text-red-500 hover:text-red-600"
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[50vh] flex items-center justify-center">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                        backgroundImage: `url(${backgroundImageUrl})`,
                        filter: 'brightness(0.7)'
                    }}
                />
                <div className="relative z-10 text-center space-y-4">
                    <h1 className="text-6xl font-bold text-white mb-4 tracking-wide">
                        Hubungi Kami
                    </h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto px-4">
                        Kami siap membantu Anda. Jangan ragu untuk menghubungi kami.
                    </p>
                </div>
            </div>

            {/* Contact Cards Section */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
                                {info.icon}
                                <h3 className="text-2xl font-semibold mb-4">{info.title}</h3>
                                
                                {info.isPhoneSection ? (
                                    <div className="space-y-3">
                                        {info.content.map((phone, idx) => (
                                            <div key={idx} className="flex items-center justify-center gap-2">
                                                <a
                                                    href={createWhatsAppLink(phone.number)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors duration-300"
                                                >
                                                    <FaWhatsapp className={`text-xl ${phone.primary ? 'text-green-500' : 'text-green-400'}`} />
                                                    <span>{phone.number}</span>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-gray-600 mb-4">{info.content}</p>
                                        {info.link && (
                                            <a
                                                href={info.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`inline-flex items-center gap-2 ${info.linkClass} transition-colors duration-300`}
                                            >
                                                {info.linkText}
                                            </a>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Lokasi Kami</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="rounded-xl overflow-hidden shadow-lg">
                            <iframe
                                className="w-full h-[400px]"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4164.539399054332!2d123.60384092928146!3d-10.172155107956296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2c569d79d759b8ef%3A0x5ed8aa3ed4c4049b!2sHarlan%2C%20EVan%20KApioru!5e1!3m2!1sen!2sid!4v1726842223786!5m2!1sen!2sid"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold">Kunjungi Kantor Kami</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <FaMapMarkerAlt className="text-2xl text-blue-500 mt-1" />
                                    <p className="text-gray-700">
                                        Jl. El Tari No. 23, Kel. Oebobo, Kec. Oebobo
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <FaClock className="text-2xl text-blue-500 mt-1" />
                                    <div>
                                        <p className="font-semibold">Jam Operasional:</p>
                                        <p className="text-gray-700">Senin – Jumat</p>
                                        <p className="text-gray-700">08.00 – 17.00 WITA</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Contact;