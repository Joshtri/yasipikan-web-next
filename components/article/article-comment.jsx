"use client";

import { useState } from 'react';
import axios from 'axios';
import { Button, TextInput, Textarea } from 'flowbite-react';
import { toast } from 'react-toastify';
import { FaUser, FaComment, FaPaperPlane } from 'react-icons/fa';

function CommentArticle({ artikelId, penulisId, onCommentAdded }) {
  const [namaPengguna, setNamaPengguna] = useState('');
  const [isiKomentar, setIsiKomentar] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!namaPengguna.trim() || !isiKomentar.trim()) {
      toast.error('Nama dan komentar harus diisi!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/comment`, {
        namaPengguna,
        isiKomentar,
        artikelId,
        penulisId
      });

      setNamaPengguna('');
      setIsiKomentar('');
      onCommentAdded(response.data.data);
      toast.success('Komentar berhasil ditambahkan!');
    } catch (error) {
      console.error('Gagal menambahkan komentar:', error);
      toast.error('Terjadi kesalahan saat menambahkan komentar.');
      setError('Terjadi kesalahan saat menambahkan komentar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 mx-auto max-w-2xl bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <FaComment className="text-blue-600" />
        Tambahkan Komentar
      </h3>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <FaUser className="text-blue-600" />
            Nama Pengguna
          </label>
          <TextInput
            type="text"
            icon={FaUser}
            placeholder="Masukkan nama anda"
            value={namaPengguna}
            onChange={(e) => setNamaPengguna(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
            <FaComment className="text-blue-600" />
            Isi Komentar
          </label>
          <Textarea
            placeholder="Tuliskan komentar anda..."
            rows={4}
            value={isiKomentar}
            onChange={(e) => setIsiKomentar(e.target.value)}
            required
            className="w-full resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          gradientDuoTone="cyanToBlue"
          className="w-full"
        >
          <div className="flex items-center justify-center gap-2">
            <FaPaperPlane />
            {loading ? 'Mengirim...' : 'Kirim Komentar'}
          </div>
        </Button>
      </form>
    </div>
  );
}

export default CommentArticle;