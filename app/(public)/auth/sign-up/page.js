import SignupComponent from '@/components/auth/register-form';

export const metadata = {
  title: 'Daftar Akun | Yayasan Sirih Pinang',
  description: 'Daftar dan bergabung dengan Yayasan Sirih Pinang Kebaikan untuk berbagi artikel dan pengalaman Anda.',
  keywords: ['pendaftaran', 'signup', 'yayasan sirih pinang', 'register', 'buat akun'],
};

export default function SignupPage() {
  return <SignupComponent />;
}