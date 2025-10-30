import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { MENU_ITEMS, ChevronRightIcon, ChevronDownIcon, UserIcon, SearchIcon } from '../constants';
import type { MenuItem } from '../types';

interface SidebarProps {
  isMobile: boolean;
  isDesktopOpen: boolean;
  isMobileOpen: boolean;
  activePath: string | null;
  setActivePath: (path: string | null) => void;
}

// Props for the standalone RecursiveMenuItem component
interface RecursiveMenuItemProps {
  item: MenuItem;
  level: number;
  openMenus: Record<string, boolean>;
  onMenuToggle: (key: string) => void;
  activePath: string | null;
  setActivePath: (path: string | null) => void;
}

// Standalone RecursiveMenuItem component, moved outside of Sidebar for performance and stability
const RecursiveMenuItem: React.FC<RecursiveMenuItemProps> = ({
  item,
  level,
  openMenus,
  onMenuToggle,
  activePath,
  setActivePath,
}) => {
  const isExpandable = item.subItems && item.subItems.length > 0;
  const isMenuOpen = openMenus[item.key] || false;
  const paddingLeft = 16 + (level * 20);

  if (isExpandable) {
    return (
      <div className={`w-full ${level === 0 ? 'mb-2' : ''}`}>
        <div
          onClick={() => onMenuToggle(item.key)}
          className="flex items-start justify-between py-2 px-2 rounded transition-all cursor-pointer select-none text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          style={{ marginLeft: `${paddingLeft}px` }}
          role="button"
          aria-expanded={isMenuOpen}
        >
          <div className="flex items-start gap-2 flex-1 mr-2">
            {item.icon && <span className="text-gray-500 dark:text-gray-400 flex-shrink-0 pt-0.5">{item.icon}</span>}
            <span className="text-lg whitespace-nowrap">{item.label}</span>
          </div>
          <div className="flex-shrink-0 pt-0.5">
            {isMenuOpen ? (
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            )}
          </div>
        </div>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-[1000px]' : 'max-h-0'}`}
        >
          <div className="pt-1 relative">
            <span
              className="absolute top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"
              style={{ left: `${paddingLeft + 12}px` }}
              aria-hidden="true"
            />
            <div className="flex flex-col gap-0.5">
              {item.subItems?.map(subItem => (
                <RecursiveMenuItem
                  key={subItem.key}
                  item={subItem}
                  level={level + 1}
                  openMenus={openMenus}
                  onMenuToggle={onMenuToggle}
                  activePath={activePath}
                  setActivePath={setActivePath}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Leaf item (link)
  const isActive = activePath === item.path;
  return (
    <a
      href={item.path || '#'}
      onClick={(e) => {
        e.preventDefault();
        setActivePath(item.path || null);
      }}
      className={`relative flex items-center gap-2 py-1.5 px-2 rounded transition-colors text-lg ${
        isActive
          ? 'bg-gray-100 dark:bg-gray-700 font-semibold text-gray-800 dark:text-gray-200'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      } ${level === 0 ? 'mb-2' : ''}`}
      style={{ marginLeft: `${paddingLeft}px` }}
    >
      {isActive && <span className="absolute left-0 top-1 bottom-1 w-1 bg-blue-500 rounded-r-full" aria-hidden="true" />}
      {item.icon && <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{item.icon}</span>}
      <span className="whitespace-nowrap">{item.label}</span>
    </a>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isDesktopOpen, isMobileOpen, activePath, setActivePath }) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({ 'wms': true, 'wms-entrada': true });
  const [searchTerm, setSearchTerm] = useState('');

  const filterMenuItems = useCallback((items: MenuItem[], term: string): { filtered: MenuItem[], expandedKeys: Record<string, boolean> } => {
    const lowerCaseTerm = term.toLowerCase().trim();
    if (!lowerCaseTerm) {
      return { filtered: items, expandedKeys: { 'wms': true, 'wms-entrada': true } };
    }

    const newExpandedKeys: Record<string, boolean> = {};

    function recurse(list: MenuItem[]): MenuItem[] {
      const result: MenuItem[] = [];
      for (const item of list) {
        let children = item.subItems ? recurse(item.subItems) : [];
        
        if (item.label.toLowerCase().includes(lowerCaseTerm) || children.length > 0) {
          if (children.length > 0) {
            newExpandedKeys[item.key] = true;
          }
          result.push({ ...item, subItems: children.length > 0 ? children : item.subItems });
        }
      }
      return result;
    }

    const filtered = recurse(items);
    return { filtered, expandedKeys: newExpandedKeys };
  }, []);
  
  const { filtered: filteredItems, expandedKeys } = useMemo(() => filterMenuItems(MENU_ITEMS, searchTerm), [searchTerm, filterMenuItems]);

  useEffect(() => {
    if (searchTerm) {
      setOpenMenus(expandedKeys);
    } else {
      // Reset to default when search is cleared
      setOpenMenus({ 'wms': true, 'wms-entrada': true });
    }
  }, [searchTerm, expandedKeys]);


  const handleMenuToggle = (key: string) => {
    setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  const desktopClasses = isDesktopOpen ? 'w-[280px]' : 'w-0 overflow-hidden';
  const mobileClasses = isMobileOpen ? 'translate-x-0' : '-translate-x-full';

  return (
    <aside
      id="sidebar"
      className={`
        flex flex-col flex-shrink-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        ${isMobile 
          ? `fixed top-0 left-0 z-50 w-[280px] transform transition-transform duration-300 ease-in-out ${mobileClasses}`
          : `relative transition-all duration-300 ease-in-out ${desktopClasses}`
        }
      `}
    >
      {/* This wrapper ensures content doesn't wrap during collapse animation on desktop */}
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="p-2 flex-shrink-0">
          <div className="relative">
            <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar en menú..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 text-sm border rounded-md bg-transparent border-gray-200 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <nav className="py-2 px-1 flex flex-col gap-0.5 flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {filteredItems.map(item => (
            <RecursiveMenuItem 
              key={item.key} 
              item={item} 
              level={0}
              openMenus={openMenus}
              onMenuToggle={handleMenuToggle}
              activePath={activePath}
              setActivePath={setActivePath}
            />
          ))}
        </nav>
        <div className="p-2 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-300 dark:bg-gray-600">
              <UserIcon className="w-2.5 h-2.5" />
            </div>
            <span className="whitespace-nowrap">Usuario Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;