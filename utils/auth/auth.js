"use client";

import { getCookie } from 'cookies-next';

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  
  try {
    const token = localStorage.getItem('token');
    const cookieToken = getCookie('token');
    
    if ((!token || token === 'undefined' || token === 'null') && !cookieToken) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

export const redirectToLogin = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/auth/login';
  }
};