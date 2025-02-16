"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa";
import { Card, Button } from "flowbite-react";

export default function DetailProductBook({ bookSlug }) {
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [activeTab, setActiveTab] = useState("deskripsi");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookBySlug = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/books/slug/${bookSlug}`
        );
        // Assuming the API returns the book data in response.data.data
        setBook(response.data.data);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data buku.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookBySlug();
  }, [bookSlug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        {error}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        Book not found.
      </div>
    );
  }

  const discountedPrice = book.kodeDiskon ? book.harga * 0.9 : book.harga;

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-4 md:mb-0">
            <Image
              src={book.coverUrl || "/placeholder.svg"}
              alt={book.judul}
              width={300}
              height={450}
              className="rounded-lg"
            />
          </div>
          <div className="md:w-2/3 md:pl-6">
            <h1 className="text-2xl md:text-3xl font-bold">{book.judul}</h1>
            <p className="text-md md:text-lg text-gray-600 mt-2">
              By: {book.pengarang}
            </p>
            <p className="mt-2 text-xl font-semibold">
              Rp {discountedPrice.toLocaleString()}
              {book.kodeDiskon && (
                <span className="text-sm text-green-600 ml-2">
                  (10% off)
                </span>
              )}
            </p>
            {/* Pills Tabs */}
            <div className="mt-4 flex space-x-4 border-b">
              <button
                className={`py-2 px-4 ${
                  activeTab === "deskripsi"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("deskripsi")}
              >
                Deskripsi
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "sinopsis"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("sinopsis")}
              >
                Sinopsis
              </button>
            </div>
            <div className="mt-4 text-gray-800">
              {activeTab === "deskripsi"
                ? book.deskripsi_singkat
                : book.sinopsis_singkat}
            </div>
            <div className="mt-6 flex items-center space-x-4">
              <Button onClick={() => router.back()} className="flex items-center">
                <FaArrowLeft className="mr-2" /> Kembali
              </Button>
              <Button
                color="green"
                href={`https://wa.me/1234567890?text=Saya%20ingin%20memesan%20buku%20${encodeURIComponent(
                  book.judul
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <FaWhatsapp className="mr-2" /> Pesan via WhatsApp
              </Button>
              {book.pdfDeskripsiUrl && (
                <Button
                  onClick={() => window.open(book.pdfDeskripsiUrl, "_blank")}
                  className="flex items-center bg-blue-600 hover:bg-blue-500"
                >
                  Lihat PDF
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}