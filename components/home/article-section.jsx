"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiUser } from "react-icons/fi";

export default function ArticleSection() {
    const articles = [
        {
            title: "Mengapa React Populer?",
            description:
                "React adalah pustaka JavaScript yang banyak digunakan untuk membangun antarmuka pengguna interaktif dan dinamis.",
            author: "John Doe",
        },
        {
            title: "Keunggulan Next.js",
            description:
                "Next.js menyediakan fitur seperti SSR dan Static Site Generation untuk pengembangan aplikasi web modern.",
            author: "Jane Smith",
        },
        {
            title: "Belajar JavaScript",
            description:
                "JavaScript adalah bahasa pemrograman yang fleksibel dan esensial untuk pengembangan web.",
            author: "Alex Johnson",
        },
        {
            title: "Panduan CSS untuk Pemula",
            description:
                "CSS adalah bahasa styling penting untuk menciptakan tampilan website yang menarik.",
            author: "Emily Davis",
        },
        {
            title: "Mengoptimalkan Performa Web",
            description:
                "Tips dan trik untuk meningkatkan kecepatan dan kinerja website Anda.",
            author: "Michael Brown",
        },
        {
            title: "Tren UI/UX Desain 2023",
            description:
                "Desain antarmuka yang menarik dapat meningkatkan pengalaman pengguna secara signifikan.",
            author: "Sophia Wilson",
        },
        {
            title: "Pengenalan GraphQL",
            description:
                "GraphQL adalah query language yang efisien dan fleksibel untuk membangun API.",
            author: "Daniel Martinez",
        },
        {
            title: "Mengamankan Aplikasi Web",
            description:
                "Praktik terbaik untuk menjaga keamanan aplikasi web Anda dari serangan.",
            author: "Olivia Taylor",
        },
    ];

    const scrollingArticles = [...articles, ...articles];

    return (
        <div className="relative overflow-hidden py-12 bg-gray-100">
            <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
                Artikel Sekilas
            </h1>
            <motion.div
                className="flex space-x-8"
                animate={{ x: ["0%", "-100%"] }}
                transition={{
                    repeat: Infinity,
                    duration: 50,
                    ease: "linear",
                }}
            >
                {scrollingArticles.map((article, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 p-6 bg-white shadow-xl rounded-2xl max-w-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            {article.title}
                        </h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            {article.description}
                        </p>
                        <div className="flex items-center text-gray-500 text-sm">
                            <FiUser className="mr-2 text-lg" />
                            <span className="font-medium">{article.author}</span>
                        </div>
                        <button className="mt-6 w-full bg-gradient-to-br from-blue-600 to-purple-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition-all duration-300">
                            Baca Selengkapnya
                        </button>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
