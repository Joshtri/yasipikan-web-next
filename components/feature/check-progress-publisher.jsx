"use client";

import React, { useState, useEffect } from 'react';
import { Card, Button } from 'flowbite-react';
import axios from 'axios';

export default function CheckProgressBookPublish() {
  // Use public folder asset: place your image at /public/assets/cek-progress.png
  const backgroundImageUrl = '/assets/cek-progress.png';

  // State for displaying the search section when user clicks "Cek Progress"
  const [showSearchSection, setShowSearchSection] = useState(false);

  // State for Progress Buku Section
  const [authorBookPublish, setAuthorBookPublish] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // Store the selected book's progress
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [isLoading, setIsLoading] = useState(true); // Loading state for fetching data
  const [filteredBooks, setFilteredBooks] = useState([]); // Filtered books for the dropdown

  // Fetch book progress on component mount
  useEffect(() => {
    getBookProgress();
  }, []);

  const getBookProgress = async () => {
    try {
      setIsLoading(true); // Start loading
      // Replace with your API endpoint as needed. For Next.js prefer process.env.NEXT_PUBLIC_BASE_URL
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/books-progress`);
      setAuthorBookPublish(response.data);
    } catch (error) {
      console.error('Failed to fetch books progress:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Handle search term change and filter books
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term !== "") {
      const filtered = authorBookPublish.filter(
        (book) =>
          book.judulBuku &&
          book.judulBuku.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
    }
  };

  // Function to handle selecting a book from the suggestions
  const handleSelectBook = (book) => {
    setSelectedBook(book); // Set the selected book to display its progress
    setSearchTerm(book.judulBuku); // Update the search term to the selected book's title
    setFilteredBooks([]); // Clear suggestions
  };

  // Mock progress data for display if selectedBook is set.
  // You can replace this with real progress data from your API.
  const mockProgressData = selectedBook
    ? (selectedBook.progress || [
        { stage: "Status Naskah", date: "Belum Di Proses" },
        { stage: "Cek Administrasi", date: "Belum Di Proses" },
        { stage: "Antrian Layout & Desain", date: "Belum Di Proses" },
        { stage: "Informasi Harga", date: "Belum Di Proses" },
        { stage: "Proses ke Perpusnas (Masuk ISBN)", date: "Belum Di Proses" },
        { stage: "Proses ke Perpusnas (Keluar ISBN)", date: "Belum Di Proses" },
        { stage: "Proses Produksi", date: "Belum Di Proses" },
        { stage: "Pengiriman (Ekspedisi: -, No. Resi: -)", date: "Belum Di Proses" }
      ])
    : [];

  return (
    <div className="relative min-h-screen">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mt-16 mb-10">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            Cek Progress Buku
          </h1>
        </div>

        {/* Informational Card */}
        <div className="flex justify-center mb-12">
          <Card className="max-w-4xl p-6 bg-white rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Cek Progres Penerbitan Buku Anda
            </h2>
            <hr className="mb-4" />
            <p className="mb-3 text-gray-700">
              Selamat! Anda sudah berada di jalur yang tepat untuk menerbitkan buku impian Anda bersama Penerbit Yayasan Sirih Pinang Kebaikan.
              Kami dengan senang hati akan membantu mewujudkan karya Anda.
            </p>
            <p className="mb-3 text-gray-700">
              Di sini, Anda dapat dengan mudah mengecek setiap tahapan perjalanan naskah Anda, mulai dari penerimaan hingga produksi.
            </p>
            <p className="mb-4 text-gray-700">
              Ikuti langkah sederhana di bawah ini untuk mengetahui progres buku Anda:
            </p>
            <ol className="list-decimal list-inside mb-4 text-gray-700 text-left">
              <li>
                Klik tombol &quot;Cek Progress&quot; untuk membuka form pencarian buku.
              </li>
              <li>
                Masukkan judul buku Anda pada kolom pencarian.
              </li>
              <li>
                Pilih buku yang sesuai dari daftar saran dan lihat progress penerbitannya.
              </li>
            </ol>
            <p className="mb-6 font-semibold text-gray-800">
              Penerbitan buku Anda tinggal selangkah lagi menuju sukses!
            </p>
            <div className="flex flex-col items-center">
              <Button
                onClick={() => setShowSearchSection(true)}
                className="w-56"
                gradientDuoTone="greenToBlue"
              >
                Cek Progress
              </Button>
              <p className="mt-4 text-gray-700 font-semibold">
                Ada pertanyaan atau butuh bantuan? Hubungi Konsultan Penerbitan Kami di bawah ini!
              </p>
            </div>
          </Card>
        </div>

        {/* Search Section */}
        {showSearchSection && (
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto transition-all duration-500">
            <h1 className="text-center text-2xl font-semibold mb-6">Cari Progress Buku</h1>
            {/* Search Input */}
            <div className="mb-6 relative">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Cari berdasarkan judul buku..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {/* Suggestions List */}
              {filteredBooks.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto">
                  {filteredBooks.map((book, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectBook(book)}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {book.judulBuku}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Loading Spinner */}
            {isLoading && (
              <div className="text-center mb-6">
                <svg
                  className="animate-spin h-8 w-8 text-gray-600 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <p className="text-gray-600 mt-2">Memuat progress buku...</p>
              </div>
            )}

            {/* Progress Timeline */}
            {selectedBook && !isLoading && (
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-300"></div>
                <div className="space-y-4">
                  {mockProgressData.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="relative z-10">
                        <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">{index + 1}</span>
                        </div>
                      </div>
                      <div className="ml-8 p-4 bg-gray-50 border border-gray-200 rounded shadow-sm w-full">
                        <h2 className="font-semibold text-gray-800">{item.stage}</h2>
                        <p className="text-gray-600 whitespace-pre-line">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!selectedBook && !isLoading && (
              <p className="text-center text-gray-600 mt-4">
                Silakan cari buku yang ingin Anda cek progress-nya.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}