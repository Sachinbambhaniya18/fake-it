import React, { useState } from 'react';
import { Search, CreditCard as Edit, Trash2, Power, Play, Eye, Copy, ExternalLink } from 'lucide-react';
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
      console.log('Mock toggled successfully:', response);
      onMockUpdated();
    } catch (error) {
      console.error('Failed to toggle mock:', error);
      // Show error message to user
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
        console.log('Mock deleted successfully:', response);
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
      GET: 'bg-green-100 text-green-800',
      POST: 'bg-blue-100 text-blue-800',
      PUT: 'bg-yellow-100 text-yellow-800',
      DELETE: 'bg-red-100 text-red-800',
      PATCH: 'bg-purple-100 text-purple-800',
    };
    return colors[method] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (statusCode) => {
    if (statusCode >= 200 && statusCode < 300) return 'text-green-600';
    if (statusCode >= 300 && statusCode < 400) return 'text-yellow-600';
    if (statusCode >= 400 && statusCode < 500) return 'text-red-600';
    if (statusCode >= 500) return 'text-red-800';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900">API Mocks ({mocks.length})</h2>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search mocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Methods</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Path</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API URL</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMocks.map((mock) => (
                <tr key={mock.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`w-3 h-3 rounded-full ${mock.enabled ? 'bg-green-500' : 'bg-gray-400'}`} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{mock.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMethodColor(mock.method)}`}>
                      {mock.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {mock.path}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getStatusColor(mock.statusCode)}`}>
                      {mock.statusCode}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => copyApiUrl(mock)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Copy Full API URL"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openInBrowser(mock)}
                        className="text-green-600 hover:text-green-900 transition-colors"
                        title="Open in Browser"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setViewingMock(mock)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="View Response"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleMock(mock.id)}
                        disabled={loading === mock.id}
                        className={`transition-colors ${
                          mock.enabled ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'
                        }`}
                        title={mock.enabled ? 'Disable Mock' : 'Enable Mock'}
                      >
                        <Power className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMock(mock.id)}
                        disabled={loading === mock.id}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Delete Mock"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredMocks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No mocks found matching your criteria.</p>
          </div>
        )}
      </div>

      {copySuccess && (
        <div className="fixed bottom-4 right-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center space-x-2 shadow-lg">
          <Copy className="w-5 h-5 text-green-500" />
          <span className="text-green-800 text-sm">{copySuccess}</span>
        </div>
      )}

      {/* Mock Response Viewer Modal */}
      {viewingMock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold">Mock Response Preview</h3>
              <button
                onClick={() => setViewingMock(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
              <div>
                <h4 className="font-medium text-gray-900">{viewingMock.name}</h4>
                <p className="text-sm text-gray-500">
                  {viewingMock.method} {viewingMock.path} → {viewingMock.statusCode}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Response Body:</label>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  {typeof viewingMock.responseBody === 'object' 
                    ? JSON.stringify(viewingMock.responseBody, null, 2)
                    : viewingMock.responseBody}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};