import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Eye, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

function AnalyticsDashboard() {
  const [stats, setStats] = useState(null);
  const [recentVisits, setRecentVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('7d');

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch stats
      const statsResponse = await fetch(`${API_BASE_URL}/api/analytics/stats?period=${period}`);
      const statsData = await statsResponse.json();
      setStats(statsData);
      
      // Fetch recent visits
      const visitsResponse = await fetch(`${API_BASE_URL}/api/analytics/recent?limit=10`);
      const visitsData = await visitsResponse.json();
      setRecentVisits(visitsData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-purple-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-slate-400">Track your page visits and user engagement</p>
        </div>

        {/* Period Selector */}
        <div className="mb-6">
          <div className="flex gap-2 bg-slate-800 p-1 rounded-lg w-fit">
            {['24h', '7d', '30d', 'all'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  period === p
                    ? 'bg-blue-500 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {p === 'all' ? 'All Time' : p}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Visits</p>
                  <p className="text-3xl font-bold text-white">{formatNumber(stats.totalVisits)}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Unique Visitors</p>
                  <p className="text-3xl font-bold text-white">{formatNumber(stats.uniqueVisitors)}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">New Visitors</p>
                  <p className="text-3xl font-bold text-white">{formatNumber(stats.newVisitors)}</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Returning Visitors</p>
                  <p className="text-3xl font-bold text-white">{formatNumber(stats.returningVisitors)}</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <ArrowUpRight className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charts and Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Visits Chart */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Daily Visits</h3>
              <BarChart3 className="w-5 h-5 text-slate-400" />
            </div>
            {stats?.dailyVisits && stats.dailyVisits.length > 0 ? (
              <div className="space-y-3">
                {stats.dailyVisits.slice(-7).map((day, index) => (
                  <div key={day._id} className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">{day._id}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${Math.min((day.count / Math.max(...stats.dailyVisits.map(d => d.count))) * 100, 100)}%`
                          }}
                        ></div>
                      </div>
                      <span className="text-white font-medium w-8 text-right">{day.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-center py-8">No data available</p>
            )}
          </div>

          {/* Top Referrers */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Top Referrers</h3>
              <Calendar className="w-5 h-5 text-slate-400" />
            </div>
            {stats?.topReferrers && stats.topReferrers.length > 0 ? (
              <div className="space-y-3">
                {stats.topReferrers.map((referrer, index) => (
                  <div key={referrer._id} className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm truncate max-w-32">
                      {referrer._id || 'Direct'}
                    </span>
                    <span className="text-white font-medium">{referrer.count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-center py-8">No referrer data available</p>
            )}
          </div>
        </div>

        {/* Recent Visits Table */}
        <div className="mt-8 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h3 className="text-xl font-semibold text-white">Recent Visits</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Visitor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Referrer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {recentVisits.map((visit, index) => (
                  <tr key={visit._id} className="hover:bg-slate-700/30">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white font-medium">
                        {visit.visitorId.substring(0, 8)}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-400">
                        {formatDate(visit.timestamp)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-400 max-w-32 truncate">
                        {visit.referrer || 'Direct'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        visit.isReturning
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {visit.isReturning ? 'Returning' : 'New'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
