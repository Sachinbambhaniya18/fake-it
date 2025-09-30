// Sidebar.jsx
import React from 'react';
import { Home, Plus, List, Activity, X } from 'lucide-react';

export const Sidebar = ({ activeTab, onTabChange, isMobile = false, onClose, open = true }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'create', label: 'Create Mock', icon: Plus },
    { id: 'mocks', label: 'All Mocks', icon: List },
    { id: 'test', label: 'Test API', icon: Activity }
  ];

  return (
    <div
      className={`bg-slate-900 text-white w-64 h-full p-6
        ${isMobile ? `fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out 
        ${open ? 'translate-x-0' : '-translate-x-full'}` : ''}`}
    >
      {/* Mobile Header with Close Button */}
      {isMobile && (
        <div className="flex justify-between items-center mb-6">
          <div className="w-36 h-10 flex items-center">
            <img src="src/assets/logo.png" alt="logo.png" />
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Desktop Logo */}
      {!isMobile && (
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-36 h-10 flex items-center">
            <img src="src/assets/logo.png" alt="logo.png" />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                if (isMobile && onClose) onClose();
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
