'use client';

import { Suspense } from 'react';
import Image from 'next/image';
import { LoginForm } from '@/components/admin/login-form';

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Image
            src="/vercel.svg"
            alt="Logo Tout Special"
            width={150}
            height={150}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Painel Administrativo</h2>
        </div>
        <Suspense fallback={<div>Carregando...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
