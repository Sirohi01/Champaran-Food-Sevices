import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import SideMenu from '../components/SideMenu';

const PrivateLayout = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader onToggleSidebar={() => setMobileOpen(!mobileOpen)} onLogout={handleLogout} />
      <div className="flex flex-1">
        <SideMenu />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)}></div>
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl">
            <div className="p-3 border-b flex items-center justify-between">
              <div className="font-semibold">Menu</div>
              <button className="text-sm px-2 py-1 bg-gray-100 rounded" onClick={() => setMobileOpen(false)}>Close</button>
            </div>
            <div onClick={() => setMobileOpen(false)}>
              <SideMenu mobile={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivateLayout;


