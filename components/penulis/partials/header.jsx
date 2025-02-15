'use client';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { Dropdown, Navbar as FlowbiteNavbar, Button } from 'flowbite-react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

function HeaderPenulis() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName');
    const storedLastName = localStorage.getItem('lastName');
    const storedRole = localStorage.getItem('role');

    if (storedFirstName && storedLastName && storedRole) {
      setFirstName(storedFirstName);
      setLastName(storedLastName);
      setRole(storedRole);
    }

    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    try {
      // Clear all localStorage items
      localStorage.clear();
      // Navigate to login page
      router.replace('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (role !== 'author') {
    return null;
  }

  return (
    <FlowbiteNavbar className="shadow-md bg-white w-full">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Left: Brand Logo */}
        <Link
          href="/my/author/dashboard"
          className="text-xl font-semibold text-blue-600 hover:text-blue-800"
        >
          YaSiPiKan | Penulis Panel
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <Button
            className="text-gray-100 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </Button>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            href="/penulis/dashboard"
            className="text-gray-600 hover:text-blue-500" // No isActive in Next.js Link
          >
            Dashboard
          </Link>

          <Link
            href="/penulis/artikel-penulis"
            className="text-gray-600 hover:text-blue-500" // No isActive in Next.js Link
          >
            Posting Artikel
          </Link>

          {/* User Dropdown (Desktop) */}
          <Dropdown label={`${firstName} ${lastName}`} inline={true} arrowIcon={false}>
            <Dropdown.Item onClick={() => router.push('/penulis/profile')}>
                My Profile
              </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden flex flex-col items-start space-y-4 px-6 py-6 bg-white border-t"
        >
          <Link
            href="/penulis/dashboard"
            className="text-gray-600 hover:text-blue-500 w-full"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            href="/penulis/artikel-penulis"
            className="text-gray-600 hover:text-blue-500 w-full"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Posting Artikel
          </Link>

          {/* User Profile & Logout */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              router.push('/penulis/profile');
            }}
            className="text-gray-600 hover:text-blue-500 w-full text-left"
          >
            Profile
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              handleLogout();
            }}
            className="text-gray-600 hover:text-blue-500 w-full text-left"
          >
            Logout
          </button>
        </div>
      )}
    </FlowbiteNavbar>
  );
}

export default HeaderPenulis;