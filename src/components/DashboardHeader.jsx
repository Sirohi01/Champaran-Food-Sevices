import { useNavigate } from 'react-router-dom';

const DashboardHeader = ({ onToggleSidebar, onLogout }) => {
  const navigate = useNavigate();
  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={onToggleSidebar} className="md:hidden mr-2 p-2 rounded hover:bg-gray-800" aria-label="Toggle menu">
            <span className="block w-5 h-0.5 bg-white mb-1"></span>
            <span className="block w-5 h-0.5 bg-white mb-1"></span>
            <span className="block w-5 h-0.5 bg-white"></span>
          </button>
          <button onClick={() => navigate(-1)} className="md:hidden mr-2 p-2 rounded hover:bg-gray-800" aria-label="Go back">
            <span className="inline-block rotate-180">➜</span>
          </button>
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center font-bold">CF</div>
          <div className="font-semibold">Dashboard</div>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={onLogout} className="text-sm px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;


