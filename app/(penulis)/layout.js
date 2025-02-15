"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PenulisHeader from '@/components/penulis/partials/header';
import PenulisFooter from '@/components/penulis/partials/footer';

export default function PenulisLayout({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/auth/login');
      
    }

    else{
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PenulisHeader />
      <main className="flex-grow bg-gray-50 p-4">
        {children}
      </main>
      <PenulisFooter />
    </div>
  );
}