"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import img1 from "../../public/assets/homeImg/5599ab6ac6bbea99d4469756b7aeabbc.jpg";
import img2 from "../../public/assets/homeImg/7d4ee2e0218165bb6c6aed083cb42ea8.jpg";
import img3 from "../../public/assets/homeImg/cda8a82ffc3acd1300086dd7aef4fd74.jpg";
import img4 from "../../public/assets/homeImg/e00203c0.jpg";

// Array of background images. With Next.js static imports, each image object has a "src" property.
const backgroundImages = [
  `url(${img1.src})`,
  `url(${img2.src})`,
  `url(${img3.src})`,
  `url(${img4.src})`,
];

export default function HomeSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <section
      id="home"
      className="relative py-14 text-white animate-gradient-x"
      style={{
        backgroundImage: backgroundImages[currentImageIndex], // Dynamically set background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out", // Smooth fade effect
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8 pb-16 pt-12">
        {/* Introduction */}
        <div className="text-center mb-10 mt-3">
          <h1 className="text-3xl font-bold mb-4">Yayasan Sirih Pinang Kebaikan</h1>
          <p className="text-xl p-3">
            Selamat datang di Yayasan Sirih Pinang Kebaikan. Kami berkomitmen untuk
            membantu penulis dan penerbit dalam proses penerbitan buku serta pembuatan
            ISBN yang resmi. Bersama kami, karya Anda akan terwujud dan tersebar luas untuk
            membawa kebaikan dan pengetahuan bagi semua.
          </p>
        </div>

        {/* Call to Action with responsive button */}
        <div className="flex justify-center mt-8 w-full">
          <Link
            href="/daftar-penulis-buku"
            className="w-full sm:w-auto text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          >
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </section>
  );
}

