'use client';

import { useAuth } from '@/context/AuthContext';
import React, { useEffect } from 'react';


export default function Logout() {

  const { logout } = useAuth();

  useEffect(() => {
    logout();
    }, []);

  return (
    <p>logout realizado com sucesso</p>
  );
}
