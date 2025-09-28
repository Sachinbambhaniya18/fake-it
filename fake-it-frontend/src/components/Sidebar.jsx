import React from 'react';
import { Home, Plus, List, Activity } from 'lucide-react';

export const Sidebar = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'create', label: 'Create Mock', icon: Plus },
    { id: 'mocks', label: 'All Mocks', icon: List },
    { id: 'test', label: 'Test API', icon: Activity }
  ];

  return (
    <div className="bg-slate-900 text-white w-64 min-h-screen p-6">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-46 h-10 flex items-center justify-center">
          <img src="src/assets/logo.png" alt="logo.png" />
        </div>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
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