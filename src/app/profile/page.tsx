'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ListPost from '../posts/list-posts';
import DashBoardLayout from '../components/dashboard-layout';

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
    <DashBoardLayout>
      <ListPost/>
    </DashBoardLayout>
  );
}
