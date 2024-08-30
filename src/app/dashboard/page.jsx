'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
    </div>
  );
}
