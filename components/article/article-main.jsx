"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShareAlt, FaBookOpen, FaFrown, FaSmile } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { motion, useAnimation } from 'framer-motion';
import { isAuthenticated } from '@/utils/auth/auth';
import SearchBar from './article-search-bar';

function ArticleMain() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article`;
        const response = await axios.get(url);
        setPosts(response.data.data);
        setFilteredPosts(response.data.data);
      } catch (error) {
        console.error(error);
        setError('Gagal mengambil data.');
      } finally {
        setLoading(false);  
      }
    };
    fetchPosts();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
      return;
    }
  
    const filtered = posts.filter((post) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        post.judul.toLowerCase().includes(searchLower) ||
        (post.penulisId &&
          `${post.penulisId.firstName} ${post.penulisId.lastName}`
            .toLowerCase()
            .includes(searchLower)) ||
        post.konten?.toLowerCase().includes(searchLower)
      );
    });
  
    setFilteredPosts(filtered);
  };

  const handleWriteArticleClick = () => {
    const loggedIn = isAuthenticated();
    if (loggedIn) {
      router.push('/penulis/dashboard');
    } else {
      alert('Anda harus login terlebih dahulu untuk membuat artikel.');
      router.push('/auth/login');
    }
  };

  const handleShare = (title) => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(`${title} - ${shareUrl}`);
    alert('Link artikel berhasil disalin!');
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-slate-100">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 mt-3">
        ARTIKEL
      </h1>

      {/* Banner Ajak Menulis */}
      <div className="bg-blue-600 text-white p-4 md:p-6 rounded-lg shadow-lg mb-8 text-center hover:shadow-xl hover:bg-blue-700 transition">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">
          Ingin Berkontribusi? Tulis Artikelmu di Sini!
        </h2>
        <p className="mb-4 text-sm md:text-base">
          Bagikan pengetahuan dan pengalamanmu dengan kami. Klik tombol di bawah ini dan mulai menulis sekarang!
        </p>
        <button
          onClick={handleWriteArticleClick}
          className="bg-white text-blue-600 px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Mulai Menulis
        </button>
      </div>

      {/* SearchBar component */}
      <SearchBar onSearch={handleSearch} />

      {/* Grid Artikel */}
      <div className="grid grid-cols-1 p-14 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-10 pt-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="w-full h-48 relative">
                <img
                  src={post.coverImageUrl || 'https://placehold.co/400x300'}
                  alt={post.judul}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Container */}
              <div className="p-4 flex flex-col flex-grow">
                {/* Title */}
                <h2 className="text-lg font-semibold mb-2 line-clamp-2 min-h-[3.5rem]">
                  {post.judul}
                </h2>

                {/* Meta Information */}
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600 text-sm flex items-center">
                    {new Date(post.createdAt).toLocaleDateString('id-ID')}
                    <span className="mx-2 text-red-500">•</span>
                    0 Komentar
                  </p>

                  <p className="text-gray-500 text-sm">
                    {post.penulisId 
                      ? `By ${post.penulisId.firstName} ${post.penulisId.lastName}` 
                      : 'Penulis tidak diketahui'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-auto pt-4 border-t">
                  <button
                    onClick={() => router.push(`/artikel/${post.slug}`)}
                    className="bg-blue-700 text-white px-4 py-2 rounded-full inline-flex items-center space-x-2 hover:bg-blue-500 transition text-sm"
                  >
                    <FaBookOpen className="text-sm" />
                    <span>Baca</span>
                  </button>
                  <button
                    onClick={() => handleShare(post.judul)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full inline-flex items-center space-x-2 hover:bg-gray-400 transition text-sm"
                  >
                    <FaShareAlt className="text-sm" />
                    <span>Bagikan</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyArticleMessage />
        )}
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
      </div>
    </div>
  );
}

function EmptyArticleMessage() {
  const controls = useAnimation();
  const [isHappy, setIsHappy] = useState(false);
  const router = useRouter();
  
  const handleWriteArticleClick = () => {
    const loggedIn = isAuthenticated();
    if (loggedIn) {
      router.push('/penulis/dashboard');
    } else {
      alert('Anda harus login terlebih dahulu untuk membuat artikel.');
      router.push('/auth/login');
    }
  };

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        setIsHappy(false);
        await controls.start({
          scale: 1.2,
          rotate: 0,
          opacity: 1,
          transition: { duration: 0.5 },
        });

        await controls.start({
          scale: 1,
          rotate: 15,
          transition: { duration: 0.5 },
        });

        setIsHappy(true);
        await controls.start({
          scale: 1.2,
          rotate: -15,
          color: '#FFD700',
          transition: { duration: 0.5 },
        });

        await controls.start({
          rotate: 0,
          scale: 1,
          transition: { duration: 0.5 },
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    sequence();
  }, [controls]);

  return (
    <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center text-center p-6 bg-white rounded-lg shadow-md">
      <motion.div
        animate={controls}
        initial={{ scale: 1, opacity: 0.8 }}
        className="text-6xl mb-4"
        style={{ color: isHappy ? '#C1A61D' : '#A9A9A9' }}
      >
        {isHappy ? <FaSmile /> : <FaFrown />}
      </motion.div>

      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        Mohon Maaf, Belum Ada Artikel yang Tersedia
      </h2>

      <p className="text-gray-600 mb-4">
        Kami sedang menunggu kontribusi dari penulis hebat seperti Anda. Yuk, tulis artikel dan bagikan pengalaman Anda!
      </p>

      <button
        onClick={handleWriteArticleClick}
        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
      >
        Tulis Artikel Pertama
      </button>
    </div>
  );
}

export default ArticleMain;