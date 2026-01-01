import { useState } from 'react';
import { Plus, AlertCircle, CheckCircle, Save, RotateCcw, X, ArrowRight, List } from 'lucide-react';
import { CustomDropdown } from './CustomDropdown';
import { MockApiService } from '../services/mockApi';

export const CreateMock = ({ onMockCreated, onNavigate }) => {
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

      setShowSuccessModal(true);
      setFormData({
        name: '',
        path: '',
        method: 'GET',
        statusCode: 200,
        responseBody: '',
        enabled: true,
      });
      onMockCreated(true);
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

      <div className="bg-white dark:bg-dark rounded-[32px] p-8 shadow-sm border border-gray-300 dark:border-white/10 transition-colors duration-300">
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
                <CustomDropdown
                  options={['GET', 'POST', 'PUT', 'DELETE', 'PATCH']}
                  value={formData.method}
                  onChange={(val) => handleChange({ target: { name: 'method', value: val } })}
                  placeholder="Select Method"
                />
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

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark rounded-[32px] shadow-2xl max-w-md w-full p-8 border border-gray-100 dark:border-white/10 transform animate-[fadeIn_0.3s_ease-out]">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold font-display text-dark dark:text-white mb-2">Mock Created!</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Your new mock endpoint has been successfully created and deployed.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Another
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    if (onNavigate) onNavigate('mocks');
                  }}
                  className="w-full py-3.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <List className="w-5 h-5" />
                  View All Mocks
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
