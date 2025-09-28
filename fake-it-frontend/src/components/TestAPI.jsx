import React, { useState } from 'react';
import { Play, Copy, CheckCircle, AlertCircle, Link, ExternalLink } from 'lucide-react';
import { MockApiService } from '../services/mockApi';
import { UrlUtils } from '../utils/urlUtils';
import { useMocks } from '../hooks/useMocks';

export const TestAPI = () => {
  const { mocks } = useMocks();
  const [selectedMock, setSelectedMock] = useState('');
  const [testData, setTestData] = useState({
    method: 'GET',
    body: '',
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(null);

  const selectedMockData = mocks.find(mock => mock.id === selectedMock);
  const fullApiUrl = selectedMockData ? UrlUtils.generateApiUrl(selectedMockData.path) : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMockData) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      let body = undefined;
      if (testData.body.trim()) {
        try {
          body = JSON.parse(testData.body);
        } catch (parseError) {
          setError('Invalid JSON in request body');
          setLoading(false);
          return;
        }
      }
      
      const result = await MockApiService.getInstance().testMock(
        fullApiUrl,
        testData.method,
        body
      );
      setResponse(result);
    } catch (err) {
      console.error('API test error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while testing the API');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMockSelection = (mockId) => {
    setSelectedMock(mockId);
    const mock = mocks.find(m => m.id === mockId);
    if (mock) {
      setTestData(prev => ({
        ...prev,
        method: mock.method,
      }));
    }
    setResponse(null);
    setError(null);
  };

  const copyApiUrl = async () => {
    if (!fullApiUrl) return;
    
    const success = await UrlUtils.copyToClipboard(fullApiUrl);
    if (success) {
      setCopySuccess('API URL copied to clipboard!');
      setTimeout(() => setCopySuccess(null), 3000);
    } else {
      setCopySuccess('Failed to copy URL');
      setTimeout(() => setCopySuccess(null), 3000);
    }
  };

  const formatJson = (obj) => {
    try {
      return JSON.stringify(obj, null, 2);
    } catch {
      return String(obj);
    }
  };

  const enabledMocks = mocks.filter(mock => mock.enabled);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Play className="w-6 h-6 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-900">API Tester</h2>
        </div>

        {enabledMocks.length === 0 ? (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No enabled mocks available</p>
            <p className="text-gray-400 text-sm mt-2">Create and enable some mocks to start testing</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="mockSelect" className="block text-sm font-medium text-gray-700 mb-2">
                Select Mock Endpoint
              </label>
              <select
                id="mockSelect"
                value={selectedMock}
                onChange={(e) => handleMockSelection(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Choose a mock endpoint...</option>
                {enabledMocks.map((mock) => (
                  <option key={mock.id} value={mock.id}>
                    {mock.method} {mock.path} - {mock.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedMockData && (
              <>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Selected Endpoint</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={copyApiUrl}
                        className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy Full API Link</span>
                      </button>
                      <a
                        href={fullApiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open in Browser</span>
                      </a>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Method:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                        selectedMockData.method === 'GET' ? 'bg-green-100 text-green-800' :
                        selectedMockData.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                        selectedMockData.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                        selectedMockData.method === 'DELETE' ? 'bg-red-100 text-red-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {selectedMockData.method}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Status:</span>
                      <span className="ml-2 text-gray-900">{selectedMockData.statusCode}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Path:</span>
                      <span className="ml-2 font-mono text-gray-900">{selectedMockData.path}</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-600">Full URL:</span>
                    <div className="mt-1 p-2 bg-white border rounded font-mono text-sm text-gray-900 break-all">
                      {fullApiUrl}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-2">
                      HTTP Method
                    </label>
                    <select
                      id="method"
                      name="method"
                      value={testData.method}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                      <option value="PATCH">PATCH</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>{loading ? 'Testing...' : 'Test API'}</span>
                    </button>
                  </div>
                </div>

                {(testData.method === 'POST' || testData.method === 'PUT' || testData.method === 'PATCH') && (
                  <div>
                    <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
                      Request Body (JSON)
                    </label>
                    <textarea
                      id="body"
                      name="body"
                      value={testData.body}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                      placeholder='{"key": "value"}'
                    />
                  </div>
                )}
              </>
            )}
          </form>
        )}

        {copySuccess && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-800 text-sm">{copySuccess}</span>
          </div>
        )}
      </div>

      {/* Response Section */}
      {(response || error) && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Response</h3>
            {response && (
              <button
                onClick={() => UrlUtils.copyToClipboard(formatJson(response))}
                className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Response</span>
              </button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium">Error</p>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {response && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-gray-900">Status:</span>
                  <span className={`font-medium ${response.status >= 200 && response.status < 300 ? 'text-green-600' : 'text-red-600'}`}>
                    {response.status} {response.statusText}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Response Body:</label>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto border">
                  {response.data}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};