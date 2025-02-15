import LoginComponent from '@/components/auth/login-form';

export const metadata = {
    title: 'Login Penulis | Yayasan Sirih Pinang',
    description: 'Login untuk penulis. Hanya penulis yang dapat menulis setelah login.',
};

export default function LoginPage() {
  return <LoginComponent />;
}