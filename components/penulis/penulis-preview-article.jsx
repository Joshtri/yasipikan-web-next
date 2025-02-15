'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Card, Spinner, Breadcrumb } from 'flowbite-react';

export default function PreviewArticle({ articleId }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article/${articleId}`;
        const response = await axios.get(url);
        setArticle(response.data.data);
      } catch (error) {
        console.error(error);
        setError('Terjadi kesalahan saat mengambil artikel.');
      } finally {
        setLoading(false);
      }
    };
    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Spinner aria-label="Loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb aria-label="Breadcrumb" className="mb-5">
        <Breadcrumb.Item href="/penulis/dashboard">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="/penulis/artikel-penulis">Posted Article</Breadcrumb.Item>
        <Breadcrumb.Item>Preview Article</Breadcrumb.Item>
      </Breadcrumb>

      {/* Button Back */}
      <div className="mb-5">
        <Link
          href="/penulis/artikel-penulis"
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md inline-block"
        >
          Kembali
        </Link>
      </div>

      {/* Card Detail Artikel */}
      <Card className="mb-6 shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-3">{article.judul}</h2>
          <div className="mb-2">
            <strong>Penulis:</strong>{' '}
            {article.penulisId ? article.penulisId.nama : 'Tidak diketahui'}
          </div>
          <div className="mb-2">
            <strong>Kategori:</strong>{' '}
            {article.kategori || 'Tidak ada kategori'}
          </div>
          <div className="mb-2">
            <strong>Tanggal Publikasi:</strong>{' '}
            {new Date(article.createdAt).toLocaleDateString()}
          </div>
          <div className="mb-2">
            <strong>Deskripsi Singkat:</strong>{' '}
            {article.deskripsiSingkat || 'Tidak ada deskripsi'}
          </div>
        </div>
      </Card>

      {/* Card Konten Artikel */}
      <Card className="shadow-lg">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Konten Artikel</h3>
          <div
            dangerouslySetInnerHTML={{ __html: article.konten }}
            className="article-content prose max-w-none"
          />
        </div>
      </Card>
    </div>
  );
}