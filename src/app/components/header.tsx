'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { clearTokens } from "@/lib/features/user/userSlice";
import { useAppDispatch } from '@/lib/hook';

export default function Header() {
  const pathname = usePathname();
  const [refreshToken, setRefreshToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = Cookies.get('refreshToken');
    setRefreshToken(token);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    dispatch(clearTokens());
    window.location.reload();
  };

  const handleMobileMenuToggle = () => {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  };

  const handleCloseMobileMenu = () => {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
      menu.classList.add('hidden');
    }
  };

  const shouldDisplayNavigation = !pathname.includes('/sign-in');

  return (
    <header className="mb-12 py-12 lg:mb-0 z-20 relative px-4 lg:px-0 aos-init aos-animate"
            data-aos="fade-down"
            data-aos-delay="1200"
            data-aos-duration="1000">
      <div className="container mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <div>
            <a href="/" className='block p-1'>
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/logo.png"
                alt="Next.js Logo"
                width={48.7}
                height={34.78}
              />
            </a>
          </div>

          {/* Navigation for large screens */}
          <div className="hidden lg:flex items-center space-x-8">
            {loading ? (
              <></>
            ) : refreshToken ? (
              <>
                <Link href="/profile">
                  <button className="btn btn-primary w-[210px]">Profile</button>
                </Link>
                <button
                  className="btn btn-primary w-[210px]"
                  onClick={() => {
                    if (confirm("Are you sure?")) {
                      handleLogout();
                    }
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              pathname !== '/sign-in' && (
                <Link href="/sign-in">
                  <button className="btn btn-primary w-[210px]">Sign In</button>
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          {pathname !== '/sign-in' && (
            <div className="lg:hidden flex items-center">
              <button
                className="text-gray-500 focus:outline-none p-2"
                onClick={handleMobileMenuToggle}
              >
                <svg className="w-[30px] h-[30px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" className="lg:hidden hidden fixed inset-0 bg-white shadow-lg z-30">
        <div className="flex flex-col items-center justify-center h-full space-y-4 relative">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 p-2"
            onClick={handleCloseMobileMenu}
          >
            <svg className="w-[30px] h-[30px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          {loading ? (
            <></>
          ) : refreshToken ? (
            <>
              <Link href="/profile">
                <button className="btn btn-primary w-[210px]">Profile</button>
              </Link>
              <button
                className="btn btn-primary w-[210px]"
                onClick={() => {
                  if (confirm("Are you sure?")) {
                    handleLogout();
                  }
                }}
              >
                Logout
              </button>
            </>
          ) : (
            pathname !== '/sign-in' && (
              <Link href="/sign-in">
                <button className="btn btn-primary w-[210px]">Sign In</button>
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
