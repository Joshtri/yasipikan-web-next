"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCookie } from 'cookies-next';

export default function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  // Add the missing handleChange function
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasDigit &&
      hasSymbol
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(data.password)) {
      setError('Password harus minimal 8 karakter dan mengandung huruf besar, huruf kecil, angka, dan simbol.');
      return;
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth`;
      const response = await axios.post(url, data);
      const res = response.data;

      // Store in localStorage
      localStorage.setItem('token', res.token);
      localStorage.setItem('firstName', res.user.firstName);
      localStorage.setItem('lastName', res.user.lastName);
      localStorage.setItem('role', res.user.role);
      localStorage.setItem('id', res.user.id);

      // Set cookie for middleware
      setCookie('token', res.token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });

      toast.success('Login berhasil!');
      router.replace('/penulis/dashboard');
    } catch (error) {
      console.error('Error occurred:', error);
      if (error.response?.status >= 400 && error.response?.status <= 500) {
        setError(error.response.data.message);
      } else {
        setError('Terjadi kesalahan saat login. Silakan coba lagi.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex shadow-lg rounded-lg overflow-hidden max-w-4xl w-full bg-white">
        {/* Left Side - Logo and Welcome Message */}
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
          <h2 className="text-2xl font-bold mb-2">Selamat Datang</h2>
          <p className="text-center">
            Silakan masuk untuk melanjutkan dan menikmati layanan kami.
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Salam hangat kembali!</h2>
            <p className="text-gray-600">
              Kami sangat senang Anda kembali bersama kami.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" value="Email address" />
              <TextInput
                id="email"
                type="email"
                placeholder="Enter email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                placeholder="Enter password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            {error && (
              <div className="p-4 text-sm text-red-600 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="ml-2">
                  Remember Me
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button 
              type="submit" 
              gradientDuoTone="cyanToBlue"
              className="w-full"
            >
              Login
            </Button>
          </form>

          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
            </span>
            <Link
              href="/auth/sign-up"
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}