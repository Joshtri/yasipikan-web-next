"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Breadcrumb, Button, TextInput, Textarea, Label } from 'flowbite-react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

function AddArticle() {
    const [formData, setFormData] = useState({
        judul: '',
        konten: '',
        deskripsiSingkat: '',
        penulisId: '',
        coverImage: null,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const penulisId = localStorage.getItem('id');
        if (penulisId) {
            setFormData((prevData) => ({ ...prevData, penulisId }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleContentChange = (value) => {
        setFormData({ ...formData, konten: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, coverImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = `${process.env.NEXT_PUBLIC_VITE_BASE_URL}/api/v1/article`;
            const form = new FormData();
            form.append('judul', formData.judul);
            form.append('konten', formData.konten);
            form.append('deskripsiSingkat', formData.deskripsiSingkat);
            form.append('penulisId', formData.penulisId);
            if (formData.coverImage) {
                form.append('coverImage', formData.coverImage);
            }

            await axios.post(url, form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            alert('Artikel berhasil ditambahkan.');
            router.push('/my/author/posted-article');
        } catch (error) {
            console.error(error);
            setError('Terjadi kesalahan saat menambahkan artikel.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-8 py-12">
            <Breadcrumb aria-label="Breadcrumb">
                <Breadcrumb.Item href="/my/author/dashboard">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="/my/author/posted-article">Data Artikel</Breadcrumb.Item>
                <Breadcrumb.Item>Tambah Artikel</Breadcrumb.Item>
            </Breadcrumb>

            <div className="mb-7 mt-5">
                            <Link href="/penulis/artikel-penulis" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md mb-4">
                                Kembali
                            </Link>
                        </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-semibold mb-8">Tambah Artikel</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Judul Artikel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="judul" value="Judul Artikel" />
                        <TextInput
                            id="judul"
                            name="judul"
                            value={formData.judul}
                            onChange={handleChange}
                            required
                            className="mt-2"
                        />
                    </div>
                    {/* Cover Image */}
                    <div>
                        <Label htmlFor="coverImage" value="Cover Artikel" />
                        <TextInput
                            id="coverImage"
                            type="file"
                            onChange={handleFileChange}
                            className="mt-2"
                        />
                    </div>
                </div>

                {/* Deskripsi Singkat */}
                <div className="mt-4">
                    <Label htmlFor="deskripsiSingkat" value="Deskripsi Singkat" />
                    <Textarea
                        id="deskripsiSingkat"
                        name="deskripsiSingkat"
                        value={formData.deskripsiSingkat}
                        onChange={handleChange}
                        rows={3}
                        className="mt-2"
                    />
                </div>

                {/* Konten Artikel */}
                <div className="mt-4">
                    <Label htmlFor="konten" value="Isi Artikel" />
                    <ReactQuill
                        value={formData.konten}
                        onChange={handleContentChange}
                        theme="snow"
                        placeholder="Tulis konten artikel di sini..."
                        className="mt-2"
                    />
                </div>

                <Button type="submit" disabled={loading} className="mt-6 mx-auto">
                    {loading ? 'Mengirim...' : 'Tambah Artikel'}
                </Button>

                {error && <div className="text-red-500 mt-4">{error}</div>}
            </form>
        </div>
    );
}

export default AddArticle;