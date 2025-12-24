import React, { useState } from 'react';
import { Play, Copy, CheckCircle, AlertCircle, Link, ExternalLink, Terminal, ArrowRight } from 'lucide-react';
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
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-black dark:bg-primary rounded-lg flex items-center justify-center">
                    <Terminal className="w-6 h-6 text-primary dark:text-black" />
                </div>
                <div>
                    <h2 className="text-3xl font-display font-bold text-dark dark:text-white">API Tester</h2>
                    <p className="text-gray-500 dark:text-gray-400">Test your endpoints in real-time.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Request Panel */}
                <div className="bg-white dark:bg-dark rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-white/10 flex flex-col h-full transition-colors duration-300">
                    {enabledMocks.length === 0 ? (
                        <div className="text-center py-12 flex-1 flex flex-col justify-center items-center">
                            <AlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 font-medium">No enabled mocks available</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                            <div>
                                <label htmlFor="mockSelect" className="block text-sm font-bold text-dark dark:text-white uppercase tracking-wider mb-2">
                                    Target Endpoint
                                </label>
                                <div className="relative">
                                    <select
                                        id="mockSelect"
                                        value={selectedMock}
                                        onChange={(e) => handleMockSelection(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl appearance-none
                                                    focus:outline-none focus:border-black dark:focus:border-primary focus:bg-white dark:focus:bg-black/20 transition-all
                                                    font-medium text-dark dark:text-white cursor-pointer"
                                        required
                                    >
                                        <option value="">Select an endpoint...</option>
                                        {enabledMocks.map((mock) => (
                                            <option key={mock.id} value={mock.id}>
                                                [{mock.method}] {mock.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            {selectedMockData && (
                                <div className="space-y-6 flex-1 flex flex-col">
                                    <div className="bg-dark rounded-2xl p-4 font-mono text-sm text-gray-300 border border-gray-800 break-all shadow-inner">
                                        <span className="text-primary font-bold mr-2">{selectedMockData.method}</span>
                                        {fullApiUrl}
                                    </div>

                                    {(selectedMockData.method === 'POST' || selectedMockData.method === 'PUT' || selectedMockData.method === 'PATCH') && (
                                        <div className="flex-1 flex flex-col">
                                            <label htmlFor="requestBody" className="block text-sm font-bold text-dark dark:text-white uppercase tracking-wider mb-2">
                                                Request Body (JSON)
                                            </label>
                                            <textarea
                                                id="requestBody"
                                                name="body"
                                                value={testData.body}
                                                onChange={handleChange}
                                                className="w-full flex-1 p-4 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl 
                                                         focus:outline-none focus:border-black dark:focus:border-primary focus:bg-white dark:focus:bg-black/20 transition-all
                                                         font-mono text-sm dark:text-white"
                                                placeholder="{}"
                                            />
                                        </div>
                                    )}

                                    <div className="pt-4 mt-auto">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full px-8 py-4 bg-black dark:bg-primary text-white dark:text-black rounded-2xl font-bold
                                                     hover:bg-primary dark:hover:bg-white hover:text-black transition-all duration-300
                                                     flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
                                        >
                                            {loading ? (
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white dark:border-black"></div>
                                            ) : (
                                                <>
                                                    <Play className="w-5 h-5 fill-current" />
                                                    <span>Send Request</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    )}
                </div>

                {/* Response Panel */}
                <div className="bg-dark dark:bg-black rounded-[32px] p-8 shadow-xl border border-gray-800 dark:border-white/10 flex flex-col min-h-[500px] relative overflow-hidden transition-colors duration-300">
                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-800 dark:border-white/10">
                        <div className="flex items-center gap-3">
                            <h3 className="text-xl font-display font-bold text-white">Console Output</h3>
                            {response && (
                                <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${response.status < 300 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                    }`}>
                                    STATUS: {response.status}
                                </span>
                            )}
                        </div>
                        {response && (
                            <button
                                onClick={() => UrlUtils.copyToClipboard(formatJson(response))}
                                className="text-gray-500 hover:text-white transition-colors"
                                title="Copy Response"
                            >
                                <Copy className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    <div className="flex-1 font-mono text-sm overflow-auto custom-scrollbar">
                        {error && (
                            <div className="text-red-400 bg-red-900/10 p-4 rounded-xl border border-red-900/20">
                                <span className="font-bold block mb-1">Error:</span>
                                {error}
                            </div>
                        )}

                        {!response && !error && (
                            <div className="h-full flex flex-col items-center justify-center text-gray-700 space-y-4">
                                <Terminal className="w-16 h-16 opacity-20" />
                                <p>Waiting for request...</p>
                            </div>
                        )}

                        {response && (
                            <pre className="text-gray-300 whitespace-pre-wrap">
                                {response.data}
                            </pre>
                        )}
                    </div>
                </div>
            </div>

            {copySuccess && (
                <div className="fixed bottom-8 right-8 bg-primary text-black rounded-xl px-6 py-4 flex items-center space-x-3 shadow-2xl animate-bounce font-bold">
                    <CheckCircle className="w-5 h-5" />
                    <span>{copySuccess}</span>
                </div>
            )}
        </div>
    );
};
