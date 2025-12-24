import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { CreateMock } from './components/CreateMock';
import { MocksList } from './components/MocksList';
import { TestAPI } from './components/TestAPI';
import { useMocks } from './hooks/useMocks';
import { Menu } from 'lucide-react';
import Logo from './assets/logo.png';

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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-dark transition-colors duration-300">
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-dark border-b border-gray-200 dark:border-[#2C2D35] p-4 md:hidden">
        <div className="flex items-center">
          <img src={Logo} alt="fake-it" className="h-8 w-auto filter invert dark:invert-0" />
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors focus:outline-none"
        >
          <Menu className="w-6 h-6" />
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
          className={`fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setSidebarOpen(false)}
        ></div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block h-screen sticky top-0">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-100 dark:bg-black md:rounded-l-[40px] relative transition-colors duration-300 text-dark dark:text-gray-200">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r shadow-sm" role="alert">
              <div className="flex">
                <div className="py-1"><svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                <div>
                  <p className="font-bold font-display">Connection Issue</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
