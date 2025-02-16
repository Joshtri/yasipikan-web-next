"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MainStore() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/books`;
        console.log(url);
        const response = await axios.get(url);
        // Assuming the API returns data in the 'data' property
        setBooks(response.data.data);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data buku.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

if (loading) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="border rounded-lg p-4">
                        <div className="bg-gray-300 rounded-t-lg h-64 w-full mb-4"></div>
                        <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
  
  if (error) {
    return (
      <p className="container mx-auto px-4 py-8">
        {error}
      </p>
    );
  }
  
return (
    <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
            Buku-buku di YaSiPiKan
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book, index) => (
                <motion.div key={book.id ? book.id : index} whileHover={{ scale: 1.05 }}>
                    <Card className="max-w-sm mx-auto">
                        <div className="relative w-full h-64 sm:h-80 md:h-96 mb-4">
                            <Image
                                src={book.coverUrl || "/placeholder.svg"}
                                alt={book.judul}
                                fill
                                style={{ objectFit: "cover" }}
                                className="rounded-t-lg"
                            />
                        </div>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                            {book.judul}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {book.pengarang}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            {book.kategori} - {book.tahun}
                        </p>
                        <p className="font-bold text-lg">
                            Rp {book.harga.toLocaleString()}
                            <p>
 
                            </p>
                        </p>
                        <Link href={`/toko-buku-online/produk-buku/${book.slug}`}>
                            <Button>
                                Lihat Detail
                            </Button>
                        </Link>
                    </Card>
                </motion.div>
            ))}
        </div>
    </main>
);
}