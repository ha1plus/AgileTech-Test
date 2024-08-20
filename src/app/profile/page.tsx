'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const handlePopState = () => {
      router.push('/');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    window.history.replaceState(null, '', window.location.href);
  }, []);

  return (
    <main>
      <h1>Profile page</h1>
    </main>
  );
}
