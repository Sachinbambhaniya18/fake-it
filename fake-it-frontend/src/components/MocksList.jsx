import React, { useState } from 'react';
import { Search, PenLine as Edit, Trash2, Power, Eye, Copy, ExternalLink, ArrowUpRight } from 'lucide-react';
import { MockApiService } from '../services/mockApi';
import { UrlUtils } from '../utils/urlUtils';

export const MocksList = ({ mocks, onMockUpdated }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [loading, setLoading] = useState(null);
  const [viewingMock, setViewingMock] = useState(null);
  const [copySuccess, setCopySuccess] = useState(null);

  const filteredMocks = mocks.filter(mock => {
    const matchesSearch = mock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mock.path.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = !selectedMethod || mock.method === selectedMethod;
    return matchesSearch && matchesMethod;
  });

  const handleToggleMock = async (mockId) => {
    setLoading(mockId);
    try {
      const response = await MockApiService.getInstance().toggleMock(mockId);
      onMockUpdated();
    } catch (error) {
      console.error('Failed to toggle mock:', error);
      alert('Failed to toggle mock. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const handleDeleteMock = async (mockId) => {
    if (window.confirm('Are you sure you want to delete this mock?')) {
      setLoading(mockId);
      try {
        const response = await MockApiService.getInstance().deleteMock(mockId);
        onMockUpdated();
      } catch (error) {
        console.error('Failed to delete mock:', error);
        alert('Failed to delete mock. Please try again.');
      } finally {
        setLoading(null);
      }
    }
  };

  const copyApiUrl = async (mock) => {
    const fullUrl = UrlUtils.generateApiUrl(mock.path);
    const success = await UrlUtils.copyToClipboard(fullUrl);
    if (success) {
      setCopySuccess(`API URL copied for ${mock.name}!`);
      setTimeout(() => setCopySuccess(null), 3000);
    }
  };

  const openInBrowser = (mock) => {
    const fullUrl = UrlUtils.generateApiUrl(mock.path);
    window.open(fullUrl, '_blank');
  };

  const getMethodColor = (method) => {
    const colors = {
      GET: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900/50',
      POST: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900/50',
      PUT: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-900/50',
      DELETE: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/50',
      PATCH: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-900/50',
    };
    return colors[method] || 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-white/10 dark:text-gray-300 dark:border-white/10';
  };

  const getStatusColor = (statusCode) => {
    if (statusCode >= 200 && statusCode < 300) return 'text-green-600 dark:text-green-400';
    if (statusCode >= 300 && statusCode < 400) return 'text-yellow-600 dark:text-yellow-400';
    if (statusCode >= 400 && statusCode < 500) return 'text-red-600 dark:text-red-400';
    if (statusCode >= 500) return 'text-red-800 dark:text-red-500';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-dark dark:text-white">Your Mocks</h2>
          <p className="text-gray-500 dark:text-gray-400">Manage and monitor your API endpoints.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-dark dark:group-focus-within:text-white w-5 h-5 transition-colors" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 bg-white dark:bg-white/5 border-2 border-transparent dark:border-white/10 focus:border-black dark:focus:border-primary rounded-xl w-full sm:w-64 transition-all shadow-sm outline-none font-medium text-dark dark:text-white placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="pl-4 pr-10 py-3 bg-white dark:bg-white/5 border-2 border-transparent dark:border-white/10 focus:border-black dark:focus:border-primary rounded-xl appearance-none cursor-pointer outline-none font-bold text-gray-600 dark:text-gray-300 focus:text-dark dark:focus:text-white shadow-sm w-full sm:w-auto"
            >
              <option value="">All Methods</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-dark rounded-[32px] shadow-sm overflow-hidden border border-gray-100 dark:border-white/10">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100 dark:divide-white/5">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/5">
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Path</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {filteredMocks.map((mock) => (
                <tr key={mock.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleMock(mock.id)}
                      className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${mock.enabled ? 'bg-primary' : 'bg-gray-200 dark:bg-white/20'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${mock.enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="font-bold text-dark dark:text-white text-lg">{mock.name}</div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${getMethodColor(mock.method)}`}>
                      {mock.method}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-white/10 px-2 py-1 rounded-md">{mock.path}</span>
                      <button
                        onClick={() => copyApiUrl(mock)}
                        className="text-gray-300 hover:text-black dark:hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                        title="Copy Full API URL"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className={`text-lg font-display font-bold ${getStatusColor(mock.statusCode)}`}>
                      {mock.statusCode}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setViewingMock(mock)}
                        className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => openInBrowser(mock)}
                        className="p-2 text-gray-400 hover:text-dark dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                        title="Test in Browser"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </button>
                      <div className="w-px h-4 bg-gray-200 dark:bg-white/10 mx-2"></div>
                      <button
                        onClick={() => handleDeleteMock(mock.id)}
                        disabled={loading === mock.id}
                        className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete Mock"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMocks.length === 0 && (
          <div className="text-center py-24 bg-gray-50/50 dark:bg-white/5">
            <p className="text-gray-400 text-lg font-medium">No mocks found matching your criteria.</p>
          </div>
        )}
      </div>

      {copySuccess && (
        <div className="fixed bottom-8 right-8 bg-dark dark:bg-white text-white dark:text-dark rounded-xl px-6 py-4 flex items-center space-x-3 shadow-2xl animate-bounce">
          <Copy className="w-5 h-5 text-primary dark:text-blue-600" />
          <span className="font-bold">{copySuccess}</span>
        </div>
      )}

      {/* Mock Response Viewer Modal */}
      {viewingMock && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark rounded-[32px] shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col border border-gray-100 dark:border-white/10">
            <div className="flex justify-between items-center p-8 border-b border-gray-100 dark:border-white/10">
              <div>
                <h3 className="text-2xl font-bold font-display text-dark dark:text-white">{viewingMock.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded textxs font-bold border ${getMethodColor(viewingMock.method)}`}>{viewingMock.method}</span>
                  <span className="font-mono text-sm">{viewingMock.path}</span>
                </p>
              </div>
              <button
                onClick={() => setViewingMock(null)}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-8 overflow-y-auto bg-gray-50 dark:bg-[#111] flex-1">
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Response Body ({viewingMock.statusCode})</label>
              <pre className="bg-dark dark:bg-black text-gray-300 p-6 rounded-2xl text-sm font-mono overflow-x-auto border border-gray-800 dark:border-white/10 shadow-inner">
                {typeof viewingMock.responseBody === 'object'
                  ? JSON.stringify(viewingMock.responseBody, null, 2)
                  : viewingMock.responseBody}
              </pre>
            </div>
            <div className="p-6 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-dark flex justify-end">
              <button
                onClick={() => setViewingMock(null)}
                className="px-6 py-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-dark dark:text-white font-bold rounded-xl transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
