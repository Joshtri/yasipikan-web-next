"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiUser } from "react-icons/fi";
import { FaRightLong, FaLeftLong } from "react-icons/fa6";


import Link from "next/link";

export default function ArticleSection() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article`
                );
                if (!res.ok) {
                    throw new Error("Gagal mengambil data artikel");
                }
                const data = await res.json();
                setArticles(data?.data || []);
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <div className="relative overflow-hidden py-12 bg-gray-100">
            <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
                Artikel Sekilas
            </h1>

            {loading ? (
                <p className="text-center text-gray-500">Memuat artikel...</p>
            ) : articles.length === 0 ? (
                <p className="text-center text-gray-500">Tidak ada artikel tersedia.</p>
            ) : (
                <div className="relative">
                    {/* Tombol navigasi */}
                    <button
                        onClick={scrollLeft}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    >
                        <FaLeftLong size={24} />
                    </button>
                    <button
                        onClick={scrollRight}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    >
                        <FaRightLong size={24} />
                    </button>

                    {/* Scrollable container */}
                    <motion.div
                        ref={scrollRef}
                        className="flex space-x-8 overflow-x-auto scroll-smooth px-4 pb-4"
                        drag="x"
                        dragConstraints={{ left: -1000, right: 0 }}
                        whileTap={{ cursor: "grabbing" }}
                    >
                        {articles.map((article, index) => (
                            <div
                                key={index}
                                className="flex flex-col justify-between p-6 bg-white shadow-xl rounded-2xl w-[300px] h-[360px] flex-shrink-0 hover:scale-105 transition-transform duration-300 ease-in-out"
                            >
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        {article.judul}
                                    </h2>
                                    <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">
                                        {article.deskripsiSingkat}
                                    </p>
                                </div>
                                <div className="mt-auto">
                                    <div className="flex items-center text-gray-500 text-sm mb-4">
                                        <FiUser className="mr-2 text-lg" />
                                        <span className="font-medium">
                                            {article.penulisId.firstName}
                                        </span>
                                    </div>
                                    <Link href={`/artikel/${article.slug}`}>
                                        <button className="w-full bg-gradient-to-br from-blue-600 to-purple-500 text-white font-semibold px-4 py-2 rounded-xl shadow-lg hover:opacity-90 transition-all duration-300">
                                            Baca Selengkapnya
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            )}
        </div>
    );
}
