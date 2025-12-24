// Sidebar.jsx
import React from 'react';
import { Home, Plus, List, Activity, X, Moon, Sun } from 'lucide-react';
import Logo from '../assets/logo.png';
import { useTheme } from '../context/ThemeContext';

export const Sidebar = ({ activeTab, onTabChange, isMobile = false, onClose, open = true }) => {
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'create', label: 'Create Mock', icon: Plus },
    { id: 'mocks', label: 'All Mocks', icon: List },
    { id: 'test', label: 'Test API', icon: Activity }
  ];

  return (
    <div
      className={`bg-white dark:bg-dark text-gray-900 dark:text-white w-64 h-full p-6 flex flex-col border-r border-gray-200 dark:border-[#2C2D35] transition-colors duration-300
        ${isMobile ? `fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out 
        ${open ? 'translate-x-0' : '-translate-x-full'}` : ''}`}
    >
      {/* Mobile Header with Close Button */}
      {isMobile && (
        <div className="flex justify-between items-center mb-10">
          <img src={Logo} alt="fake-it" className="h-8 w-auto filter invert dark:invert-0" />
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-primary transition-colors focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Desktop Logo */}
      {!isMobile && (
        <div className="flex items-center mb-12">
          <img src={Logo} alt="fake-it" className="h-10 w-auto filter invert dark:invert-0" />
        </div>
      )}

      {/* Navigation */}
      <nav className="space-y-3 flex-1">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                if (isMobile && onClose) onClose();
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group font-medium ${isActive
                ? 'bg-primary text-black shadow-lg shadow-primary/20 scale-[1.02]'
                : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
            >
              <IconComponent className={`w-5 h-5 ${isActive ? 'text-black' : 'group-hover:text-primary transition-colors'}`} />
              <span className="font-display tracking-wide text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
        >
          <span className="text-sm font-medium flex items-center gap-2">
            {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </span>
          <div className={`w-10 h-5 rounded-full p-1 transition-colors duration-200 ease-in-out ${theme === 'dark' ? 'bg-primary' : 'bg-gray-300'}`}>
            <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`} />
          </div>
        </button>

        <div className="px-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
          <p className="text-xs text-gray-400 font-display">v1.0.0 • Alpha</p>
        </div>
      </div>
    </div>
  );
};
