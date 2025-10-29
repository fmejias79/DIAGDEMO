
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  // State to track if the view is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // State for sidebar visibility on different screen sizes
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activePath, setActivePath] = useState<string | null>('/wms/entrada/oc');

  // Effect to handle window resize and update the mobile view
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      // If resizing to desktop view, close the mobile sidebar
      if (!mobile) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Effect to check and apply dark mode preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && prefersDark)) {
      setIsDarkMode(true);
    }
  }, []);

  // Effect to toggle dark mode class on the document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Toggles the correct sidebar based on screen size
  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setIsMobileSidebarOpen(prev => !prev);
    } else {
      setIsDesktopSidebarOpen(prev => !prev);
    }
  }, [isMobile]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div id="layout" className="h-screen flex flex-col overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Backdrop for mobile sidebar */}
      {isMobile && isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          aria-hidden="true"
        />
      )}
      <Header 
        toggleSidebar={toggleSidebar} 
        toggleDarkMode={toggleDarkMode} 
        isDarkMode={isDarkMode} 
      />
      <div id="sidebar-and-content" className="flex flex-1 overflow-hidden">
        <Sidebar 
          isMobile={isMobile}
          isDesktopOpen={isDesktopSidebarOpen}
          isMobileOpen={isMobileSidebarOpen}
          activePath={activePath}
          setActivePath={setActivePath}
        />
        <MainContent activePath={activePath} />
      </div>
    </div>
  );
}

export default App;
