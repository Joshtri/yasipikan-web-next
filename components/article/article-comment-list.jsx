"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Spinner } from 'flowbite-react';
import { FaComments, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

function ArticleCommentList({ artikelId, newComment }) {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const commentsPerPage = 5;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/comment/${artikelId}?page=${currentPage}&limit=${commentsPerPage}`
        );

        const { data, total } = response.data;
        
        if (data) {
          setComments(data);
          setTotalPages(Math.ceil(total / commentsPerPage));
        } else {
          setComments([]);
          setTotalPages(0);
        }
      } catch (error) {
        console.error('Gagal mengambil komentar:', error);
        setError('Gagal mengambil komentar.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [artikelId, newComment, currentPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-8 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="mt-8 mx-auto max-w-2xl">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaComments className="text-blue-600" />
        Komentar ({comments.length})
      </h3>

      {comments.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Belum ada komentar untuk artikel ini.</p>
          <p className="text-sm text-gray-400 mt-2">Jadilah yang pertama berkomentar!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    {comment.namaPengguna.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {comment.namaPengguna}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {format(new Date(comment.createdAt), 'dd MMMM yyyy, HH:mm', { locale: id })}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 ml-12">{comment.isiKomentar}</p>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            color="gray"
            size="sm"
          >
            <FaChevronLeft className="mr-2" />
            Previous
          </Button>
          
          <span className="text-sm text-gray-600">
            Halaman {currentPage} dari {totalPages}
          </span>
          
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            color="gray"
            size="sm"
          >
            Next
            <FaChevronRight className="ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default ArticleCommentList;