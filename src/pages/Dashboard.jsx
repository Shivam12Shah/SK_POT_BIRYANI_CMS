import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { Card } from '../components/Card';
import { Link } from 'react-router-dom';
import { fetchFoods } from '../store/slices/foodSlice';
import { fetchOrders } from '../store/slices/orderSlice';
import { fetchPartners } from '../store/slices/partnerSlice';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { items: foods, loading: foodLoading } = useSelector((state) => state.food);
  const { orders, loading: orderLoading } = useSelector((state) => state.orders);
  const { partners, loading: partnerLoading } = useSelector((state) => state.partners);

  const loading = foodLoading || orderLoading || partnerLoading;

  useEffect(() => {
    dispatch(fetchFoods());
    dispatch(fetchOrders());
    dispatch(fetchPartners());
  }, [dispatch]);

  const stats = useMemo(() => {
    const pendingOrders = orders.filter(order => order.status === 'placed').length;
    return {
      totalFoods: foods.length,
      totalOrders: orders.length,
      totalPartners: partners.length,
      pendingOrders,
    };
  }, [foods, orders, partners]);

  return (
    <Layout title="Dashboard">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Orders</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.totalOrders}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-gray-500">
                <span className="text-green-600 font-medium mr-1">↑ 12%</span> from last month
              </div>
            </Card>

            <Card>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.pendingOrders}</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-lg">
                  <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-gray-500">
                <span className={`font-medium mr-1 ${stats.pendingOrders > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                  {stats.pendingOrders > 0 ? 'Action Required' : 'All caught up'}
                </span>
              </div>
            </Card>

            <Card>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Menu Items</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.totalFoods}</p>
                </div>
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-gray-500">
                Active in catalog
              </div>
            </Card>

            <Card>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Delivery Partners</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.totalPartners}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-gray-500">
                Registered partners
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Quick Actions">
              <div className="grid grid-cols-2 gap-4">
                <Link to="/food/new" className="block">
                  <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-orange-50/50 transition-colors group cursor-pointer h-full">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <svg className="w-6 h-6 text-gray-600 group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <span className="mt-3 text-sm font-medium text-gray-900">New Food Item</span>
                  </div>
                </Link>

                <Link to="/partners/new" className="block">
                  <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-orange-50/50 transition-colors group cursor-pointer h-full">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                      <svg className="w-6 h-6 text-gray-600 group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <span className="mt-3 text-sm font-medium text-gray-900">New Partner</span>
                  </div>
                </Link>
              </div>
            </Card>

            <Card title="System Health">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">API Status</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">Operational</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">Database</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">Connected</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">Last Backup</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Today, 04:00 AM</span>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Dashboard;

