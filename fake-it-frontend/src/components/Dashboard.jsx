import React, { useState, useEffect } from 'react';
import { BarChart3, Globe, CheckCircle, XCircle, Clock, Copy, ExternalLink } from 'lucide-react';
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

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-2xl" style={{ color }}>
          {icon}
        </div>
      </div>
    </div>
  );

  const MethodBadge = ({ method, count }) => {
    const colors = {
      GET: 'bg-green-100 text-green-800',
      POST: 'bg-blue-100 text-blue-800',
      PUT: 'bg-yellow-100 text-yellow-800',
      DELETE: 'bg-red-100 text-red-800',
      PATCH: 'bg-purple-100 text-purple-800',
    };

    return (
      <div className={`px-3 py-1 rounded-full text-sm font-medium ${colors[method]}`}>
        {method}: {count}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Mocks"
          value={stats.total}
          icon={<BarChart3 />}
          color="#3B82F6"
        />
        <StatCard
          title="Active Mocks"
          value={stats.enabled}
          icon={<CheckCircle />}
          color="#10B981"
        />
        <StatCard
          title="Disabled Mocks"
          value={stats.disabled}
          icon={<XCircle />}
          color="#EF4444"
        />
        <StatCard
          title="API Endpoints"
          value={stats.total}
          icon={<Globe />}
          color="#8B5CF6"
        />
      </div>

      {/* HTTP Methods Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">HTTP Methods Distribution</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(stats.methods).map(([method, count]) => (
            <MethodBadge key={method} method={method} count={count} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Mocks</h3>
        <div className="space-y-3">
          {mocks.slice(0, 5).map((mock) => (
            <div key={mock.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${mock.enabled ? 'bg-green-500' : 'bg-gray-400'}`} />
                <div>
                  <p className="font-medium text-gray-900">{mock.name}</p>
                  <p className="text-sm text-gray-500">{mock.method} {mock.path}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Status: {mock.statusCode}</span>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => copyApiUrl(mock)}
                    className="text-blue-600 hover:text-blue-900 transition-colors"
                    title="Copy API URL"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => window.open(UrlUtils.generateApiUrl(mock.path), '_blank')}
                    className="text-green-600 hover:text-green-900 transition-colors"
                    title="Open in Browser"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {mocks.length === 0 && (
            <p className="text-gray-500 text-center py-4">No mocks created yet. Create your first mock to get started!</p>
          )}
        </div>
      </div>
    </div>
  );
};