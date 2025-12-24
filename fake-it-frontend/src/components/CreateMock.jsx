import { useState } from 'react';
import { Plus, AlertCircle, CheckCircle, Save, RotateCcw } from 'lucide-react';
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
        if (formData.responseBody.trim()) {
          parsedBody = JSON.parse(formData.responseBody);
        } else {
          parsedBody = {};
        }
      } catch {
        parsedBody = formData.responseBody;
      }

      const mockData = {
        ...formData,
        responseBody: parsedBody,
        statusCode: Number(formData.statusCode),
      };

      await MockApiService.getInstance().createMock(mockData);

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
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-white/20 dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
          <Plus className="w-6 h-6 text-black" />
        </div>
        <div>
          <h2 className="text-3xl font-display font-bold text-dark dark:text-white">Create New Mock</h2>
          <p className="text-gray-500 dark:text-gray-400">Define a new endpoint to mock.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-dark rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-white/10 transition-colors duration-300">
        {message && (
          <div
            className={`mb-8 p-4 rounded-xl flex items-center space-x-3 border-2 ${message.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-600 text-green-800 dark:text-green-300'
              : 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-600 text-red-800 dark:text-red-300'
              }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <AlertCircle className="w-6 h-6" />
            )}
            <span className="font-bold">{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-bold text-dark dark:text-gray-300 uppercase tracking-wider">
                Mock Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl 
                            focus:outline-none focus:border-black dark:focus:border-primary focus:bg-white dark:focus:bg-black/20 transition-all
                            font-medium text-dark dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                placeholder="e.g., User Login API"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="path" className="block text-sm font-bold text-dark dark:text-gray-300 uppercase tracking-wider">
                API Path
              </label>
              <input
                type="text"
                id="path"
                name="path"
                value={formData.path}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl 
                            focus:outline-none focus:border-black dark:focus:border-primary focus:bg-white dark:focus:bg-black/20 transition-all
                            font-medium text-dark dark:text-white placeholder-gray-400 dark:placeholder-gray-600 font-mono"
                placeholder="/api/v1/users"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="method" className="block text-sm font-bold text-dark dark:text-gray-300 uppercase tracking-wider">
                HTTP Method
              </label>
              <div className="relative">
                <select
                  id="method"
                  name="method"
                  value={formData.method}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl appearance-none
                                focus:outline-none focus:border-black dark:focus:border-primary focus:bg-white dark:focus:bg-black/20 transition-all
                                font-bold text-dark dark:text-white cursor-pointer"
                >
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

            <div className="space-y-2">
              <label htmlFor="statusCode" className="block text-sm font-bold text-dark dark:text-gray-300 uppercase tracking-wider">
                Status Code
              </label>
              <input
                type="number"
                id="statusCode"
                name="statusCode"
                value={formData.statusCode}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl 
                            focus:outline-none focus:border-black dark:focus:border-primary focus:bg-white dark:focus:bg-black/20 transition-all
                            font-bold text-dark dark:text-white placeholder-gray-400 dark:placeholder-gray-600 font-mono"
                placeholder="200"
                min="100"
                max="599"
                required
              />
            </div>
          </div>


          <div className="space-y-2">
            <label htmlFor="responseBody" className="block text-sm font-bold text-dark dark:text-gray-300 uppercase tracking-wider">
              Response Body
            </label>
            <textarea
              id="responseBody"
              name="responseBody"
              value={formData.responseBody}
              onChange={handleChange}
              rows={8}
              className="w-full p-4 bg-gray-900 border-2 border-gray-900 dark:border-white/10 rounded-xl text-green-400
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all
                         font-mono text-sm shadow-inner"
              placeholder='{"id": 1, "name": "John Doe", "email": "john@example.com"}'
            />
            <p className="text-sm text-gray-400">
              Enter JSON response body or plain text
            </p>
          </div>

          <div className="flex items-center p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
            <input
              type="checkbox"
              id="enabled"
              name="enabled"
              checked={formData.enabled}
              onChange={handleChange}
              className="h-5 w-5 text-black focus:ring-black border-gray-300 rounded cursor-pointer accent-black"
            />
            <label htmlFor="enabled" className="ml-3 block text-sm font-bold text-dark dark:text-white cursor-pointer select-none">
              Enable this mock immediately
            </label>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <button
              type="button"
              className="px-6 py-3 border-2 border-gray-200 dark:border-white/10 rounded-xl font-bold 
                         text-gray-600 dark:text-gray-300 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-300 dark:hover:border-white/20 focus:outline-none 
                         transition-all flex items-center justify-center space-x-2"
              onClick={() =>
                setFormData({
                  name: '',
                  path: '',
                  method: 'GET',
                  statusCode: 200,
                  responseBody: '',
                  enabled: true,
                })
              }
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 border-2 border-black dark:border-primary rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
                         text-black bg-primary focus:outline-none transition-all
                         font-bold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>Creating...</span>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Create Mock</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
