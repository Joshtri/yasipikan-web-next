"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa";
import { Card, Button } from "flowbite-react";

export default function ProductBook({ bookSlug }) {
    const router = useRouter();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookBySlug = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/books/slug/${bookSlug}`
                );
                // Assuming the API response has the book data in response.data.data
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
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }

    if (error) {
        return <div className="container mx-auto px-4 py-8">{error}</div>;
    }

    if (!book) {
        return <div className="container mx-auto px-4 py-8">Book not found.</div>;
    }

    const discountedPrice = book.kodeDiskon ? book.harga * 0.9 : book.harga;

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card>
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
                            <h1 className="text-3xl font-bold mb-4">{book.judul}</h1>
                            <p className="text-xl mb-2">Penulis: {book.pengarang}</p>
                            <p className="mb-2">Kategori: {book.kategori}</p>
                            <p className="mb-2">Bidang Ilmu: {book.bidangIlmu}</p>
                            <p className="mb-2">ISBN: {book.isbn}</p>
                            <p className="mb-2">Ukuran: {book.ukuran}</p>
                            <p className="mb-2">Halaman: {book.halaman}</p>
                            <p className="mb-2">Tahun Terbit: {book.tahun}</p>
                            <p className="mb-2">Ketersediaan: {book.ketersediaan}</p>
                            <p className="text-2xl font-bold mb-4">
                                Harga: Rp {discountedPrice.toLocaleString()}
                                {book.kodeDiskon && (
                                    <span className="text-sm text-green-600 ml-2">
                                        (10% off with code: {book.kodeDiskon})
                                    </span>
                                )}
                            </p>
                            <div className="mb-4">
                                <h2 className="text-xl font-bold mb-2">Deskripsi Singkat:</h2>
                                <p>{book.deskripsi_singkat}</p>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-xl font-bold mb-2">Sinopsis:</h2>
                                <p>{book.sinopsis_singkat}</p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <Button onClick={() => router.back()}>
                                    <FaArrowLeft className="mr-2" />
                                    Kembali
                                </Button>
                                <Button
                                    color="green"
                                    href={`https://wa.me/1234567890?text=Saya%20ingin%20memesan%20buku%20${encodeURIComponent(
                                        book.judul
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaWhatsapp className="mr-2" />
                                    Pesan via WhatsApp
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}