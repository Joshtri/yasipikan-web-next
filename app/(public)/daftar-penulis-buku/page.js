"use client";

import { useRef } from 'react';
import Image from 'next/image';
// const backgroundImage = { src: '/assets/library1.png' };
// const publisherImg = '/assets/publisherImg.jpg';
import RegisterPublisher from '@/components/daftar-publisher/register-publisher';

export default function DaftarPenulisBukuPage() {
  const registerRef = useRef(null);

  const scrollToRegister = () => {
    registerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const publisherImg = '/assets/publisherImg.jpg';
  const backgroundImage = '/assets/library1.png';

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] bg-cover bg-center bg-no-repeat flex items-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Content */}
        <div className="relative container mx-auto px-4 py-8 md:px-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in">
            Daftar Disini
          </h1>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            Menerbitkan & Mencetak Buku
          </h2>
          <button
            onClick={scrollToRegister}
            className="mt-4 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white font-medium rounded-md px-6 py-2 text-base shadow-md"
          >
            Daftar Menerbitkan Buku Sekarang
          </button>
        </div>
      </section>

      {/* About Publisher and Features Section */}
      <section className="py-12 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <div className="text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Tentang Penerbit Buku
                </h2>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">
                  Yayasan Sirih Pinang Kebaikan
                </h3>
                <p className="prose prose-invert mb-4">
                  Kami berkomitmen untuk membantu penulis dan penerbit dalam proses penerbitan buku serta
                  pembuatan ISBN yang resmi. Bersama kami, karya Anda akan terwujud dan tersebar luas untuk membawa
                  kebaikan dan pengetahuan bagi semua.
                </p>
                {/* Features integrated into About Publisher */}
                <div>
                  <h4 className="text-lg md:text-xl font-semibold mb-2">Keunggulan Kami</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="bg-white rounded p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="text-2xl text-blue-600 mb-2">{feature.icon}</div>
                        <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                        <p className="text-xs text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={publisherImg}
                  alt="Yayasan Sirih Pinang Kebaikan"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Register Publisher Form Section */}
      <section ref={registerRef}>
        <RegisterPublisher />
      </section>
    </main>
  );
}

// Features data
const features = [
  {
    icon: "📚",
    title: "ISBN Resmi",
    description: "Dapatkan ISBN resmi untuk buku Anda dengan proses yang mudah dan cepat."
  },
  {
    icon: "🎯",
    title: "Distribusi Luas",
    description: "Buku Anda akan didistribusikan ke berbagai toko buku dan platform online."
  },
  {
    icon: "✨",
    title: "Kualitas Premium",
    description: "Hasil cetakan berkualitas tinggi dengan standar industri terbaik."
  }
];