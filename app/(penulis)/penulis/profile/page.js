import { Suspense } from 'react';
import Profile from '@/components/penulis/penulis-profile';

export const metadata = {
  title: 'Profil Penulis | Yayasan Sirih Pinang',
  description: 'Halaman profil penulis Yayasan Sirih Pinang',
};

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Profile />
    </Suspense>
  );
}