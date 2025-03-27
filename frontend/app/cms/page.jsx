'use client'

import React, { useState } from 'react';
import { Home, LogOut, Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import MainCard from '@/components/ui/MainCard.jsx';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const sidebarItems = [
    // { 
    //   icon: <LayoutDashboard className="mr-2 h-4 w-4" />, 
    //   label: 'Dashboard', 
    //   link: '/dashboard' 
    // },
    { 
      icon: <Home className="mr-2 h-4 w-4" />, 
      label: 'Home', 
      link: '/' 
    }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div 
        className={`
          ${isOpen ? 'w-64' : 'w-16'} 
          bg-gray-950 text-white 
          transition-all duration-300 
          ease-in-out 
          p-4 
          flex flex-col
        `}
      >
        {/* Toggle Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsOpen(!isOpen)}
          className="mb-4 self-end text-white hover:bg-gray-700"
        >
          <Menu />
        </Button>

        {/* Navigation Items */}
        <nav className="space-y-2">
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start text-white hover:bg-gray-700"
            >
              {item.icon}
              {isOpen && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>

        {/* Logout Button */}
        <Button
          variant="destructive"
          className="mt-auto w-full justify-start"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isOpen && 'Logout'}
        </Button>
      </div>

      {/* Main Content Area */}
    <MainCard />


    </div>
  );
};

export default Sidebar;