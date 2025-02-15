"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

export default function SignupComponent() {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push('Password harus minimal 8 karakter.');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password belum memiliki huruf kapital.');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password belum memiliki huruf kecil.');
    }
    if (!/\d/.test(password)) {
      errors.push('Password belum mengandung angka.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password belum memiliki simbol.');
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError([]);

    const passwordErrors = validatePassword(data.password);
    if (passwordErrors.length > 0) {
      setError(passwordErrors);
      return;
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user`;
      const response = await axios.post(url, data);

      toast.success('Registrasi berhasil! Silakan login.');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error) {
      console.error('Error during signup:', error);
      if (error.response?.status >= 400 && error.response?.status <= 500) {
        setError([error.response.data.message]);
      } else {
        setError(['Terjadi kesalahan. Coba lagi nanti.']);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex shadow-lg rounded-lg overflow-hidden max-w-4xl w-full bg-white">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-blue-600 text-white w-1/2 p-10">
          <div className="relative w-40 h-40 mb-5">
            <Image
              src="/assets/logoYayasan.jpg"
              alt="Logo Yayasan"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-2xl font-bold mb-2">Bergabung Sekarang</h2>
          <p className="text-center">
            Daftarkan akun Anda dan mulai berbagi artikel menarik.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Buat Akun Baru</h2>
            <p className="text-gray-600">Isi form di bawah untuk mendaftar.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="firstName" value="Nama Depan" />
              <TextInput
                id="firstName"
                type="text"
                placeholder="Masukkan nama depan"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="lastName" value="Nama Belakang" />
              <TextInput
                id="lastName"
                type="text"
                placeholder="Masukkan nama belakang"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" value="Alamat Email" />
              <TextInput
                id="email"
                type="email"
                placeholder="Masukkan email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            <div className="relative">
              <Label htmlFor="password" value="Password" />
              <div className="relative">
                <TextInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error.length > 0 && (
              <ul className="bg-red-50 text-red-500 text-sm p-4 rounded-lg">
                {error.map((errMsg, index) => (
                  <li key={index} className="list-disc ml-4">{errMsg}</li>
                ))}
              </ul>
            )}

            <div className="flex items-center mt-4">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="ml-2">
                Saya setuju dengan{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  syarat dan ketentuan
                </Link>
              </Label>
            </div>

            <Button 
              type="submit" 
              gradientDuoTone="cyanToBlue"
              className="w-full"
            >
              Daftar
            </Button>
          </form>

          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">
              Sudah punya akun?{' '}
            </span>
            <Link
              href="/auth/login"
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}