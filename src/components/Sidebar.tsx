'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onToggleCollapse }) => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const toggleSidebar = () => {
    onToggleCollapse?.(!isCollapsed);
  };

  const handleNewChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push('/');
  };

  return (
    <div
      className="h-full border-r cursor-pointer bg-white border-gray-200 flex flex-col transition-all duration-300 relative w-full"
      onClick={() => {
        if (isCollapsed) onToggleCollapse?.(false);
      }}
    >
      <div className="p-6">
        <div className="flex flex-col gap-5">
          {/* New Chat button */}
          {!isCollapsed && (
            <button
              onClick={handleNewChat}
              className=" mx-2  bg-primary cursor-pointer text-white rounded-xl py-2.5 text-sm font-medium hover:bg-primary-dark transition-opacity"
            >
              New Chat
            </button>
          )}

          <div className="relative flex items-center">
            {!isCollapsed && (
              <div className="ml-2 relative w-[300px]">
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  className="w-full pr-9 py-2.5 pl-4 bg-secondary text-content rounded-lg text-sm focus:outline-none focus:ring-2"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Image
                  src="/Images/Search.svg"
                  alt="Search Icon"
                  width={16}
                  height={16}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                />
              </div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSidebar();
              }}
              className="ml-2 bg-white cursor-pointer rounded-full p-1.5 hover:shadow-sm transition-shadow"
              title={isCollapsed ? 'Expand' : 'Collapse'}
            >
              <Image src="/Images/Sidebar.svg" alt="Toggle Sidebar" width={16} height={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
