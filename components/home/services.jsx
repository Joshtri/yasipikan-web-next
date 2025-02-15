"use client";

import { Card } from "flowbite-react";
import { FaRegCheckCircle, FaBook, FaWallet, FaStore } from "react-icons/fa";
import Link from "next/link";

export default function HomeServices() {
  return (
    <div className="bg-gray-100 py-8 pt-10">
      <div className="container mx-auto px-2">
        {/* Top Card with Gradient Background */}
        <Card className="w-full max-w-4xl mx-auto shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          {/* Centering the title only */}
          <h2 className="text-center text-xl font-bold mb-3">
            Yayasan Sirih Pinang Kebaikan
          </h2>
          
          {/* Left-aligned paragraph text */}
          <p className="mb-3">
            Anda berasal dari luar Kupang dan ingin menerbitkan buku atau bekerja sama dengan kami? 
            Kini, Yayasan Sirih Pinang Kebaikan{" "}
            <span className="text-orange-300 font-semibold">
              menyediakan layanan penerbitan buku dan siap membantu Anda!
            </span>
          </p>
          <p className="mb-5">
            Daftarkan diri Anda di Yayasan Sirih Pinang Kebaikan agar kami bisa lebih cepat
            memenuhi kebutuhan penerbitan Anda.
          </p>
          
          {/* Button centered */}
          <div className="text-center">
            <Link href="/">
              <button className="bg-white hover:bg-gray-300 text-blue-600 font-semibold py-2 px-6 rounded-lg shadow-md w-1/2 transition-all duration-300 ease-in-out">
                Yayasan Sirih Pinang Kebaikan
              </button>
            </Link>
          </div>
        </Card>
        
        {/* Merged CardPoint Section */}
        <div className="flex justify-center mt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* First Card */}
            <Card className="text-center shadow-md p-3 max-w-xs">
              <div className="flex justify-center mb-1">
                <FaBook className="text-4xl text-sky-500 transform transition hover:scale-150" />
              </div>
              <Link href="/daftar-penulis-buku">
                <h2 className="text-lg font-semibold transform transition hover:scale-110">
                  DAFTAR MENERBITKAN
                </h2>
              </Link>
            </Card>

            {/* Second Card */}
            <Card className="text-center shadow-md p-3 max-w-xs">
              <div className="flex justify-center mb-1">
                <FaRegCheckCircle className="text-4xl text-sky-500 transform transition hover:scale-150" />
              </div>
              <Link href="/cek-progress">
                <h2 className="text-lg font-semibold transform transition hover:scale-110">
                  CEK PROGRESS BUKU
                </h2>
              </Link>
            </Card>

            {/* Third Card */}
            <Card className="text-center shadow-md p-3 max-w-xs">
              <div className="flex justify-center mb-1">
                <FaWallet className="text-4xl text-sky-500 transform transition hover:scale-150" />
              </div>
              <h2 className="text-lg font-semibold transform transition hover:scale-110">
                CEK ROYALTI BUKU
              </h2>
            </Card>

            {/* Fourth Card */}
            <Card className="text-center shadow-md p-3 max-w-xs">
              <div className="flex justify-center mb-1">
                <FaStore className="text-4xl text-sky-500 transform transition hover:scale-150" />
              </div>
              <Link href="/toko-buku">
                <h2 className="text-lg font-semibold transform transition hover:scale-110">
                  YASIPIKAN STORE
                </h2>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}