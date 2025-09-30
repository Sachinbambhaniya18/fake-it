import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { CreateMock } from './components/CreateMock';
import { MocksList } from './components/MocksList';
import { TestAPI } from './components/TestAPI';
import { useMocks } from './hooks/useMocks';
import { Menu } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mocks, loading, error, refreshMocks } = useMocks();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard mocks={mocks} />;
      case 'create':
        return <CreateMock onMockCreated={refreshMocks} />;
      case 'mocks':
        return <MocksList mocks={mocks} onMockUpdated={refreshMocks} />;
      case 'test':
        return <TestAPI />;
      default:
        return <Dashboard mocks={mocks} />;
    }
  };

  if (loading && mocks.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading mocks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between bg-slate-900 border-b p-4 md:hidden">
        <p className="h-12 w-12">
          <img src="/logo.svg" alt="logo" className='h-full w-full'/>
        </p>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Menu className="w-6 h-6 text-gray-50" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isMobile={true}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        {/* Background overlay */}
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ${sidebarOpen ? 'opacity-50' : 'opacity-0'}`}
          onClick={() => setSidebarOpen(false)}
        ></div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        {error && (
          <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 
                    3.486 0l5.58 9.92c.75 1.334-.213 
                    2.98-1.742 2.98H4.42c-1.53 
                    0-2.493-1.646-1.743-2.98l5.58-9.92zM11 
                    13a1 1 0 11-2 0 1 1 0 
                    012 0zm-1-8a1 1 0 
                    00-1 1v3a1 1 0 
                    002 0V6a1 1 0 
                    00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-800">
                  <strong>API Connection Issue:</strong> {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {renderContent()}
      </main>
    </div>
  );
}

export default App;
