'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import UserIcon from './UserIcon';
import { MOCK_USER } from '@/utils/constants';

const Navbar = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <div className="flex items-center justify-between w-full h-full py-4 px-4 md:px-4 lg:px-6 bg-white">
      <div className="flex items-center gap-4">
        {/* First Logo */}
        <button className="cursor-pointer" onClick={handleLogoClick}>
          <Image
            src="/Images/ProcDNALogo.svg"
            alt="Logo"
            width={120}
            height={32}
            priority
            className="h-8 lg:h-10 w-auto flex-shrink-0"
          />
        </button>

        {/* Vertical Separator */}
        <div className="h-8 lg:h-10 w-[2px] bg-primary-dark"></div>

        {/* Second Logo (add your second logo here) */}
        <Image
          src="/Images/GileadLogo.png"
          alt="Second Logo"
          width={100}
          height={24}
          priority
          className="h-8 lg:h-8 w-auto flex-shrink-0"
        />
      </div>
       <div className="flex items-center">
        <UserIcon user={MOCK_USER} size="md" />
      </div>
    </div>
  );
};

export default Navbar;

