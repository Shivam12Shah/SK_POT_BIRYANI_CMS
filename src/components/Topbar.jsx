import { useAuth } from '../contexts/AuthContext';

const Topbar = ({ title = "Dashboard" }) => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            {user?.phone || 'Admin'}
          </p>
          <p className="text-xs text-gray-500">
            {user?.role || 'Administrator'}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
