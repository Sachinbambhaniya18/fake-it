import { useState } from 'react';
import { Plus, AlertCircle, CheckCircle } from 'lucide-react';
import { MockApiService } from '../services/mockApi';

export const CreateMock = ({ onMockCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    path: '',
    method: 'GET',
    statusCode: 200,
    responseBody: '',
    enabled: true,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let parsedBody;
      try {
        // Try to parse as JSON, but allow plain text responses
        if (formData.responseBody.trim()) {
          parsedBody = JSON.parse(formData.responseBody);
        } else {
          parsedBody = {};
        }
      } catch {
        // If JSON parsing fails, use as plain text
        parsedBody = formData.responseBody;
      }

      const mockData = {
        ...formData,
        responseBody: parsedBody,
        statusCode: Number(formData.statusCode),
      };

      const response = await MockApiService.getInstance().createMock(mockData);
      console.log('Mock created successfully:', response);

      setMessage({ type: 'success', text: 'Mock created successfully!' });
      setFormData({
        name: '',
        path: '',
        method: 'GET',
        statusCode: 200,
        responseBody: '',
        enabled: true,
      });
      onMockCreated();
    } catch (error) {
      console.error('Failed to create mock:', error);
      setMessage({ type: 'error', text: 'Failed to create mock. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Plus className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900">Create New Mock</h2>
        </div>

        {message && (
          <div className={`mb-4 p-4 rounded-lg flex items-center space-x-2 ${
            message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Mock Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., User Login API"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-2">
                HTTP Method
              </label>
              <select
                id="method"
                name="method"
                value={formData.method}
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

            <div>
              <label htmlFor="statusCode" className="block text-sm font-medium text-gray-700 mb-2">
                Status Code
              </label>
              <input
                type="number"
                id="statusCode"
                name="statusCode"
                value={formData.statusCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="200"
                min="100"
                max="599"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="path" className="block text-sm font-medium text-gray-700 mb-2">
              API Path
            </label>
            <input
              type="text"
              id="path"
              name="path"
              value={formData.path}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="/api/v1/users"
              required
            />
          </div>

          <div>
            <label htmlFor="responseBody" className="block text-sm font-medium text-gray-700 mb-2">
              Response Body
            </label>
            <textarea
              id="responseBody"
              name="responseBody"
              value={formData.responseBody}
              onChange={handleChange}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder='{"id": 1, "name": "John Doe", "email": "john@example.com"}'
            />
            <p className="mt-1 text-sm text-gray-500">Enter JSON response body or plain text</p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="enabled"
              name="enabled"
              checked={formData.enabled}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="enabled" className="ml-2 block text-sm text-gray-900">
              Enable this mock immediately
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setFormData({
                name: '',
                path: '',
                method: 'GET',
                statusCode: 200,
                responseBody: '',
                enabled: true,
              })}
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Mock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};