import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, LogOut, Settings, X, Menu } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Navigation } from './Navigation';

interface UserMenuProps {
  user: {
    username: string;
  };
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const { signOut } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setHasNotification(false);
  };

  const handleProfileClick = (event: React.MouseEvent) => {
    // Check if we're on mobile or desktop based on window width
    if (window.innerWidth < 768) {
      setShowMobileMenu(!showMobileMenu);
      setShowMenu(false);
    } else {
      setShowMenu(!showMenu);
      setShowMobileMenu(false);
    }
    setShowNotifications(false);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative" ref={notificationRef}>
        <button 
          onClick={handleNotificationClick}
          className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <Bell className="w-5 h-5" />
          {hasNotification && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Notifications</h3>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-600">
                Welcome to Moneiero! Start trading securely with other users.
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative" ref={menuRef}>
        <button
          onClick={handleProfileClick}
          className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
        >
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-indigo-600">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="font-medium md:inline hidden">{user.username}</span>
        </button>

        {showMobileMenu && (
          <div 
            ref={mobileMenuRef}
            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-4 border md:hidden"
          >
            <div className="px-4 py-2 border-b mb-2">
              <span className="font-medium text-gray-900">{user.username}</span>
            </div>
            
            <Navigation isMobile onItemClick={() => setShowMobileMenu(false)} />
            
            <div className="border-t mt-2 pt-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setShowMobileMenu(false)}
              >
                <User className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                to="/settings"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setShowMobileMenu(false)}
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setShowMobileMenu(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </div>
        )}

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border hidden md:block">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setShowMenu(false)}
            >
              <User className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setShowMenu(false)}
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
            <button
              onClick={() => {
                signOut();
                setShowMenu(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};