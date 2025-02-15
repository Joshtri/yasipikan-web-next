"use client";

import { useEffect, useState } from 'react';

export default function PenulisProfile() {
  const [showNotification, setShowNotification] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [role, setRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Check if we're in the browser before accessing localStorage
    if (typeof window !== 'undefined') {
      const storedFirstName = localStorage.getItem('firstName');
      const storedLastName = localStorage.getItem('lastName');
      const storedEmail = localStorage.getItem('email');
      const storedRole = localStorage.getItem('role');

      if (storedFirstName && storedLastName && storedRole) {
        setFirstName(storedFirstName);
        setLastName(storedLastName);
        setEmail(storedEmail);
        setRole(storedRole);
      }
    }
  }, []);

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleSaveProfile = () => {
    // TODO: Implement profile saving logic
    setEditMode(false);
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      {/* Notification */}
      {showNotification && (
        <div className="bg-green-500 text-white font-bold px-4 py-2 rounded-md mb-6">
          <div className="flex justify-between items-center">
            <span>Notifikasi: Data ini hanya dilihat oleh anda dan hanya bisa diubah oleh anda</span>
            <button 
              className="text-white" 
              onClick={handleCloseNotification}
              aria-label="Close notification"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2.293-6.293a1 1 0 111.414 1.414L10 11.414l2.293 2.293a1 1 0 11-1.414 1.414L10 12.828l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 011.414-1.414L10 8.586l2.293-2.293a1 1 0 111.414 1.414L10 10l2.293 2.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold mb-4">Profil Saya</h2>

        {!editMode ? (
          <>
            <div className="mb-4">
              <p><strong>Nama:</strong> {firstName} {lastName}</p>
            </div>
            <div className="mb-4">
              <p><strong>Email:</strong> {email}</p>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label htmlFor="firstName" className="block font-bold">Nama:</label>
              <input
                type="text"
                id="firstName"
                className="border p-2 rounded w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-bold">Email:</label>
              <input
                type="email"
                id="email"
                className="border p-2 rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          {!editMode ? (
            <>
              <button
                className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md opacity-50 cursor-not-allowed"
                disabled
              >
                Edit Profil (under construction)
              </button>
              <button
                className="bg-pink-500 text-white font-semibold px-4 py-2 rounded-md opacity-50 cursor-not-allowed"
                disabled
              >
                Hapus Akun (under construction)
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                onClick={handleSaveProfile}
              >
                Simpan Profil
              </button>
              <button
                className="bg-gray-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                onClick={() => setEditMode(false)}
              >
                Batal
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}