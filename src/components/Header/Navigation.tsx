import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface NavigationProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export const Navigation = ({ isMobile, onItemClick }: NavigationProps) => {
  const { user } = useAuthStore();

  const baseClasses = isMobile
    ? "flex flex-col w-full"
    : "hidden md:flex items-center justify-center flex-1 gap-6";

  const linkClasses = isMobile
    ? "px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 w-full"
    : "text-gray-700 hover:text-indigo-600 transition-colors";

  return (
    <nav className={baseClasses}>
      <Link 
        to="/" 
        className={linkClasses}
        onClick={onItemClick}
      >
        Buy Crypto
      </Link>
      <Link 
        to="/" 
        className={linkClasses}
        onClick={onItemClick}
      >
        Sell Crypto
      </Link>
      <Link 
        to={user ? "/create-offer" : "/register"} 
        className={linkClasses}
        onClick={onItemClick}
      >
        Create Offer
      </Link>
      <Link 
        to={user ? "/dashboard" : "/register"} 
        className={linkClasses}
        onClick={onItemClick}
      >
        Dashboard
      </Link>
      <Link 
        to={user ? "/wallet" : "/register"} 
        className={linkClasses}
        onClick={onItemClick}
      >
        Wallet
      </Link>
    </nav>
  );
};