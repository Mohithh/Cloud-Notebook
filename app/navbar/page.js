"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setHasToken(false);
    router.push("/login");
  };

  const navItems = [
    { id: 1, name: 'Add Text', path: '/textcloud', emoji: '✏️', shortName: 'Text' },
    { id: 2, name: 'Add Image', path: '/imagecloud', emoji: '🖼️', shortName: 'Image' },
    { id: 4, name: 'Info', path: '/info', emoji: 'ℹ️', shortName: 'Info' },
    { id: 5, name: 'Help', path: '/help', emoji: '❓', shortName: 'Help' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-gray-200 shadow-lg">
      <div className="max-w-md mx-auto px-2">
        <div className="flex justify-between items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center p-2 w-full transition-all duration-200 ${
                pathname === item.path
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-purple-500'
              }`}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-xs mt-1 font-medium hidden sm:block">{item.name}</span>
              <span className="text-xs mt-1 font-medium sm:hidden">{item.shortName}</span>
            </button>
          ))}

          {/* Login or Logout button */}
          {hasToken ? (
            <button
              onClick={handleLogout}
              className="flex flex-col items-center p-2 w-full text-red-600 hover:text-red-700 transition-all duration-200"
            >
              <span className="text-2xl">🚪</span>
              <span className="text-xs mt-1 font-medium hidden sm:block">Logout</span>
              <span className="text-xs mt-1 font-medium sm:hidden">Exit</span>
            </button>
          ) : (
            <button
              onClick={() => router.push('/login')}
              className={`flex flex-col items-center p-2 w-full transition-all duration-200 ${
                pathname === "/login"
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-purple-500'
              }`}
            >
              <span className="text-2xl">🔐</span>
              <span className="text-xs mt-1 font-medium hidden sm:block">Login</span>
              <span className="text-xs mt-1 font-medium sm:hidden">Login</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
