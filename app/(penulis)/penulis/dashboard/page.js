import { Suspense } from 'react';
import PenulisDashboard from '@/components/penulis/penulis-dashboard';

export const metadata = {
  title: 'Dashboard Penulis | Yayasan Sirih Pinang',
  description: 'Dashboard untuk mengelola artikel dan konten penulis',
};

export default function DashboardPenulisPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PenulisDashboard />
    </Suspense>
  );
}