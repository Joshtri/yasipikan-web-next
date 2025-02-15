"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Breadcrumb, Button, Modal, Spinner, Tooltip } from 'flowbite-react';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/toggleslider.css';

function PenulisArtikelList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if we're in the browser and if there's a penulisId
        if (typeof window !== 'undefined') {
          const penulisId = localStorage.getItem('id');
          if (!penulisId) {
            router.push('/auth/login');
            return;
          }

          const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article/penulis/${penulisId}`;
          const response = await axios.get(url);
          setData(response.data.data || []);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Terjadi kesalahan saat mengambil data artikel.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const openModal = (id) => {
    setSelectedArticleId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedArticleId(null);
  };

  const handleDelete = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article/${selectedArticleId}`;
      await axios.delete(url);
      setData((prevData) => prevData.filter((article) => article._id !== selectedArticleId));
      toast.success('Artikel berhasil dihapus.');
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Terjadi kesalahan saat menghapus artikel.');
    } finally {
      closeModal();
    }
  };

  const toggleStatus = async (article) => {
    const newStatus = article.statusArtikel === 'publish' ? 'draft' : 'publish';
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article/${article._id}/status`;
      await axios.patch(url, { statusArtikel: newStatus });
      setData((prevData) =>
        prevData.map((item) =>
          item._id === article._id ? { ...item, statusArtikel: newStatus } : item
        )
      );
      toast.success(`Status artikel berhasil diubah menjadi ${newStatus}.`);
    } catch (error) {
      console.error('Error updating article status:', error);
      toast.error('Terjadi kesalahan saat mengubah status artikel.');
    }
  };

  const filteredArticles = data.filter((article) =>
    article.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" aria-label="Loading articles..." />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <Breadcrumb>
          <Breadcrumb.Item href="/penulis/dashboard">Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Posted Artikel</Breadcrumb.Item>
        </Breadcrumb>

        <input
          type="text"
          placeholder="Cari artikel..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="mb-5">
        <Link
          href="/penulis/artikel-penulis/tambah-artikel"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Tambah Artikel
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">No</th>
              <th className="border px-4 py-2">Judul</th>
              <th className="border px-4 py-2">Tanggal Publikasi</th>
              <th className="border px-4 py-2">Aksi</th>
              <th className="border px-4 py-2">Ubah Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <tr key={article._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2">{article.judul}</td>
                  <td className="border px-4 py-2 text-center">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-center gap-2">
                      <Tooltip content="Preview">
                        <Button
                          color="info"
                          size="sm"
                          onClick={() => router.push(`/penulis/artikel-penulis/preview-artikel/${article._id}`)}
                        >
                          <FaEye />
                        </Button>
                      </Tooltip>

                      <Tooltip content="Edit">
                        <Button
                          color="warning"
                          size="sm"
                          onClick={() => router.push(`/penulis/artikel-penulis/edit-artikel/${article._id}`)}
                        >
                          <FaEdit />
                        </Button>
                      </Tooltip>

                      <Tooltip content="Hapus">
                        <Button
                          color="failure"
                          size="sm"
                          onClick={() => openModal(article._id)}
                        >
                          <FaTrash />
                        </Button>
                      </Tooltip>
                    </div>
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-center items-center">
                      <Tooltip 
                        content={article.statusArtikel === 'publish' ? 'Status: Publish' : 'Status: Draft'} 
                        placement="top"
                      >
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={article.statusArtikel === 'publish'}
                            onChange={() => toggleStatus(article)}
                          />
                          <span className="slider"></span>
                        </label>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Tidak ada artikel ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onClose={closeModal}>
        <Modal.Header>Konfirmasi Hapus</Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menghapus artikel ini?</Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={closeModal}>
            Batal
          </Button>
          <Button color="failure" onClick={handleDelete}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PenulisArtikelList;