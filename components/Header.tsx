import React, { useState, useRef, useEffect } from 'react';
import type { User } from '../types';
import { IconCoin, IconGem, IconVideo } from '../constants';

interface HeaderProps {
  user: User;
  onNavigate: (view: 'user_profile' | 'token_store' | 'admin_dashboard' | 'go_live') => void;
  isStreamer: boolean;
}

const Header: React.FC<HeaderProps> = ({ user, onNavigate, isStreamer }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (view: 'user_profile' | 'token_store' | 'admin_dashboard' | 'go_live') => {
    onNavigate(view);
    setIsMenuOpen(false);
  };
  
  return (
    <header className="bg-brand-gray-900 h-16 flex items-center justify-between px-4 md:px-6 shadow-md z-20">
      <div className="flex items-center space-x-4">
        <IconGem className="w-8 h-8 text-brand-purple" />
        <h1 className="text-xl font-bold text-white hidden sm:block">AI Stream Dares</h1>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        {isStreamer && (
          <button
            onClick={() => handleNavigation('go_live')}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors"
          >
            <IconVideo className="w-5 h-5" />
            <span className="hidden sm:inline">Go Live</span>
          </button>
        )}
        <button
          onClick={() => handleNavigation('token_store')}
          className="bg-brand-purple hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors"
        >
          <IconCoin className="w-5 h-5" />
          <span>{user.tokenBalance.toLocaleString()}</span>
        </button>
        <div className="relative" ref={menuRef}>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center space-x-2 focus:outline-none rounded-full">
            <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full border-2 border-brand-purple" />
          </button>
           {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-brand-gray-800 rounded-md shadow-lg py-1 z-50 animate-fade-in ring-1 ring-black ring-opacity-5">
                 <div className="px-4 py-3 border-b border-brand-gray-700">
                    <p className="text-sm text-white font-semibold">Signed in as</p>
                    <p className="text-sm text-brand-gray-300 truncate">{user.name}</p>
                </div>
                <a onClick={() => handleNavigation('user_profile')} className="block px-4 py-2 text-sm text-brand-gray-200 hover:bg-brand-purple hover:text-white cursor-pointer transition-colors">
                  My Profile
                </a>
                <a onClick={() => handleNavigation('token_store')} className="block px-4 py-2 text-sm text-brand-gray-200 hover:bg-brand-purple hover:text-white cursor-pointer transition-colors">
                  Buy Tokens
                </a>
                {user.isAdmin && (
                  <>
                    <div className="border-t border-brand-gray-700 my-1"></div>
                    <a onClick={() => handleNavigation('admin_dashboard')} className="block px-4 py-2 text-sm text-brand-gray-200 hover:bg-brand-purple hover:text-white cursor-pointer transition-colors">
                      Admin Panel
                    </a>
                  </>
                )}
              </div>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
