"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "flowbite-react";
import Link from "next/link";

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  return (
    <div className="relative">
      <Navbar
        fluid={true}
        rounded={true}
        className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800"
      >
        {/* Logo with Brand Name */}
        <Navbar.Brand>
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold p-2 text-white">
              Yayasan Sirih Pinang Kebaikan
            </span>
          </Link>
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle onClick={toggleNavbar} />

        {/* Navbar Links */}
        <Navbar.Collapse 
          className={`md:flex ${isOpen ? "block" : "hidden"}`}
        >
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-2 p-4 md:p-0">
            <Link
              href="/"
              className="text-white text-lg px-3 py-2 hover:bg-blue-800 rounded w-full md:w-auto"
            >
              Beranda
            </Link>

            {/* Dropdown: tentang-yasipikan */}
            <div className="relative w-full md:w-auto" ref={dropdownRef}>
              <button
                onClick={() => handleDropdownToggle("tentang-yasipikan")}
                className="text-white text-lg px-3 py-2 hover:bg-blue-800 rounded flex items-center justify-between w-full md:w-auto"
              >
                <span>Tentang</span>
                <svg
                  className="ml-1 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openDropdown === "tentang-yasipikan" && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <Link
                      href="/tentang-yasipikan"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Tentang Yayasan
                    </Link>
                    <Link
                      href="/visi-misi"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Visi Misi
                    </Link>
                    <Link
                      href="/sejarah-yasipikan"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sejarah
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown: Service */}
            <div className="relative w-full md:w-auto" ref={dropdownRef}>
              <button
                onClick={() => handleDropdownToggle("service")}
                className="text-white text-lg px-3 py-2 hover:bg-blue-800 rounded flex items-center justify-between w-full md:w-auto"
              >
                <span>Layanan</span>
                <svg
                  className="ml-1 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openDropdown === "service" && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <Link
                      href="/daftar-penulis-buku"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Daftar Menerbitkan Buku
                    </Link>
                    <Link
                      href="/cek-progress-buku-publish"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Cek Progres Buku
                    </Link>
                    <Link
                      href="/toko-online-buku"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      YaSiPiKan Store
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/kontak"
              className="text-white text-lg px-3 py-2 hover:bg-blue-800 rounded w-full md:w-auto"
            >
              Kontak
            </Link>

            <Link
              href="/artikel"
              className="text-white text-lg px-3 py-2 hover:bg-blue-800 rounded w-full md:w-auto"
            >
              Artikel
            </Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
      {/* Add spacing below fixed navbar */}
      <div className="h-20"></div>
    </div>
  );
};

export default CustomNavbar;  