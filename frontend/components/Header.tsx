import React from 'react';
import { MenuIcon, SearchIcon, MoonIcon, SunIcon, BellIcon, UserIcon } from '../constants';

interface HeaderProps {
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, toggleDarkMode, isDarkMode }) => {
  return (
    <header className="h-[60px] sm:h-[84px] flex items-center justify-between px-2 sm:px-5 border-b shadow-sm z-50 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 flex-shrink-0">
      <div className="flex items-center gap-1 sm:gap-4 flex-1 min-w-0">
        <button
          onClick={toggleSidebar}
          className="p-1.5 sm:p-2 rounded-md flex items-center justify-center transition-colors flex-shrink-0 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <MenuIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <div className="flex-shrink-0 block">
          {/* Placeholder for company logo, displays different files for light/dark mode */}
          <img alt="GIAD Logo" className="w-[80px] sm:w-[175px] h-[40px] sm:h-[60px] object-contain dark:hidden" src=".\icons\GIAD-lightMode.png" />
          <img alt="GIAD Logo" className="w-[80px] sm:w-[175px] h-[40px] sm:h-[60px] object-contain hidden dark:block" src=".\icons\GIAD-darkmode.png" />
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-4 flex-shrink-0">
        <div className="hidden sm:flex items-center rounded-full px-3 py-1.5 gap-2 bg-gray-100 dark:bg-gray-700">
          <SearchIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <input
            placeholder="Buscar..."
            className="bg-transparent border-none outline-none w-[150px] lg:w-[200px] text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            type="text"
          />
        </div>
        <div className="sm:hidden relative">
          <button className="p-1.5 rounded-md flex items-center justify-center transition-colors text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
            <SearchIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            onClick={toggleDarkMode}
            className="p-1.5 sm:p-2 rounded-md flex items-center justify-center transition-colors text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDarkMode ? <SunIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
          <button className="p-1.5 sm:p-2 rounded-md flex items-center justify-center transition-colors text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
            <BellIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div className="flex items-center gap-1 sm:gap-2 px-1.5 sm:px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
            <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center bg-gray-300 dark:bg-gray-600">
              <UserIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <span className="text-xs sm:text-sm hidden sm:block text-gray-900 dark:text-gray-100">Administración</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;