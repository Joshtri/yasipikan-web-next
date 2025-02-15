'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Perbaikan di sini
import Link from 'next/link';
import axios from 'axios';
import { Breadcrumb, Button, Label, TextInput, Textarea } from 'flowbite-react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuillNew = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
});

export default function EditArticle({ articleId }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        judul: '',
        konten: '',
        deskripsiSingkat: '',
        coverImage: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch article on mount
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article/${articleId}`;
                const response = await axios.get(url);
                const { judul, konten, deskripsiSingkat } = response.data.data;
            // Log the entire response
                console.log("Response:", response);
                // Log the data within the response more clearly
                console.log("Response Data:", response.data);
        
                // Optionally, add the debugger statement to pause the execution
                // debugger;
    
                // console.log(response.data.data);

                console.log(`data ${response}`);

                setFormData({ judul, konten, deskripsiSingkat });
            } catch (err) {
                console.error(err);
                setError('Terjadi kesalahan saat mengambil artikel.');
            } finally {
                setLoading(false);
            }
        };
        
        if (articleId) {
            fetchArticle();
        }
    }, [articleId]);

    const handleContentChange = (content) => {
        setFormData((prev) => ({ ...prev, konten: content }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, coverImage: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submitData = new FormData();
            submitData.append('judul', formData.judul);
            submitData.append('deskripsiSingkat', formData.deskripsiSingkat);
            submitData.append('konten', formData.konten);
            if (formData.coverImage) {
                submitData.append('coverImage', formData.coverImage);
            }
            
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/article/${articleId}`;
            await axios.put(url, submitData);
            
            router.push('/penulis/posted-article');
            router.refresh();
        } catch (err) {
            console.error(err);
            setError('Terjadi kesalahan saat menyimpan artikel.');
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb className="mb-6">
                <Breadcrumb.Item href="/penulis/dashboard">
                    Dashboard
                </Breadcrumb.Item>
 
                <Breadcrumb.Item href="/penulis/artikel-penulis">
                    Posted Article
                </Breadcrumb.Item>
                <Breadcrumb.Item>Edit Posted Article</Breadcrumb.Item>
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

            <hr className="mb-6" />

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Label htmlFor="judul" value="Judul" />
                    <TextInput
                        id="judul"
                        name="judul"
                        value={formData.judul}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="deskripsiSingkat" value="Deskripsi Singkat" />
                    <Textarea
                        id="deskripsiSingkat"
                        name="deskripsiSingkat"
                        rows={2}
                        value={formData.deskripsiSingkat}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <Label htmlFor="konten" value="Konten" />
                    <ReactQuillNew
                        value={formData.konten}
                        onChange={handleContentChange}
                        theme="snow"
                        placeholder="Tulis konten artikel di sini..."
                    />
                </div>

                <div>
                    <Label htmlFor="coverImage" value="Gambar Sampul" />
                    <TextInput
                        id="coverImage"
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="flex space-x-4">
                    <Button type="submit" className="bg-blue-500">
                        Simpan Perubahan
                    </Button>
                </div>
            </form>
        </div>
    );
}