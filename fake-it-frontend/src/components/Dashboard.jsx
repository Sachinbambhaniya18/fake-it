import React, { useState, useEffect } from 'react';
import { BarChart3, Globe, CheckCircle, XCircle, Clock, Copy, ExternalLink, ArrowUpRight } from 'lucide-react';
import { UrlUtils } from '../utils/urlUtils';

export const Dashboard = ({ mocks }) => {
  const [stats, setStats] = useState({
    total: 0,
    enabled: 0,
    disabled: 0,
    methods: { GET: 0, POST: 0, PUT: 0, DELETE: 0, PATCH: 0 },
  });

  useEffect(() => {
    const enabled = mocks.filter(mock => mock.enabled).length;
    const disabled = mocks.length - enabled;

    const methods = mocks.reduce((acc, mock) => {
      acc[mock.method] = (acc[mock.method] || 0) + 1;
      return acc;
    }, { GET: 0, POST: 0, PUT: 0, DELETE: 0, PATCH: 0 });

    setStats({
      total: mocks.length,
      enabled,
      disabled,
      methods,
    });
  }, [mocks]);

  const copyApiUrl = async (mock) => {
    const fullUrl = UrlUtils.generateApiUrl(mock.path);
    await UrlUtils.copyToClipboard(fullUrl);
  };

  const StatCard = ({ title, value, icon, className }) => (
    <div className={`bg-white dark:bg-dark rounded-[30px] p-8 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group ${className}`}>
      <div className="relative z-10">
        <p className="text-gray-500 dark:text-gray-400 font-medium mb-2 uppercase tracking-wider text-xs">{title}</p>
        <p className="text-5xl font-display font-bold text-dark dark:text-white">{value}</p>
      </div>
      <div className="absolute top-6 right-6 text-gray-200 dark:text-white/5 group-hover:text-primary/20 transition-colors transform group-hover:scale-110 duration-300">
        {React.cloneElement(icon, { size: 48, strokeWidth: 1.5 })}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-display font-bold text-dark dark:text-white mb-2">Overview</h2>
          <p className="text-gray-500 dark:text-gray-400">Welcome back to your mock API dashboard.</p>
        </div>
        <div className="hidden md:block">
          <button className="bg-dark dark:bg-white dark:text-dark text-white px-6 py-3 rounded-xl font-medium hover:bg-black dark:hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>Documentation</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Mocks"
          value={stats.total}
          icon={<BarChart3 />}
        />
        <StatCard
          title="Active"
          value={stats.enabled}
          icon={<CheckCircle />}
        />
        <StatCard
          title="Disabled"
          value={stats.disabled}
          icon={<XCircle />}
        />
        <StatCard
          title="Endpoints"
          value={stats.total}
          icon={<Globe />}
          className="bg-primary/20 dark:bg-primary/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-dark rounded-[32px] p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-display font-bold text-dark dark:text-white">Recent Mocks</h3>
            <button className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-dark dark:hover:text-white">View All</button>
          </div>

          <div className="space-y-4">
            {mocks.slice(0, 5).map((mock) => (
              <div key={mock.id} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-white/5">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${mock.method === 'GET' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    mock.method === 'POST' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      mock.method === 'DELETE' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        mock.method === 'PUT' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                    }`}>
                    {mock.method.slice(0, 3)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-dark dark:text-white group-hover:text-blue-600 dark:group-hover:text-primary transition-colors">{mock.name}</p>
                      {!mock.enabled && <span className="px-2 py-0.5 bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 rounded text-[10px] font-bold uppercase">Disabled</span>}
                    </div>
                    <p className="text-sm text-gray-400 font-mono mt-0.5">{mock.path}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => copyApiUrl(mock)}
                    className="p-2 text-gray-400 hover:text-dark dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-lg transition-all"
                    title="Copy API URL"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => window.open(UrlUtils.generateApiUrl(mock.path), '_blank')}
                    className="p-2 text-gray-400 hover:text-primary hover:bg-black rounded-lg transition-all"
                    title="Open in Browser"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {mocks.length === 0 && (
              <div className="text-center py-12 bg-gray-50 dark:bg-white/5 rounded-2xl border-2 border-dashed border-gray-100 dark:border-white/10">
                <p className="text-gray-400 font-medium">No mocks created yet</p>
                <button className="mt-4 text-primary bg-dark px-6 py-2 rounded-xl font-bold hover:opacity-90 transition-opacity">
                  Create your first mock
                </button>
              </div>
            )}
          </div>
        </div>

        {/* HTTP Methods Distribution */}
        <div className="bg-white dark:bg-dark rounded-[32px] p-8 shadow-sm h-fit">
          <h3 className="text-xl font-display font-bold text-dark dark:text-white mb-6">Distribution</h3>
          <div className="flex flex-col gap-3">
            {Object.entries(stats.methods).map(([method, count]) => (
              <div key={method} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${method === 'GET' ? 'bg-green-500' :
                    method === 'POST' ? 'bg-blue-500' :
                      method === 'DELETE' ? 'bg-red-500' :
                        method === 'PUT' ? 'bg-yellow-500' : 'bg-purple-500'
                    }`}></div>
                  <span className="font-medium text-gray-600 dark:text-gray-400 group-hover:text-dark dark:group-hover:text-white transition-colors">{method}</span>
                </div>
                <span className="font-bold text-dark dark:text-white">{count}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5">
            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Total Requests</p>
              <p className="text-2xl font-display font-bold text-dark dark:text-white">0</p>
              <p className="text-xs text-gray-400 mt-2">Analytics coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
