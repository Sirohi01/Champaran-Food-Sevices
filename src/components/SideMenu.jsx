import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) =>
  `block px-3 py-2 rounded ${isActive ? 'bg-gray-200 font-medium' : 'hover:bg-gray-200'}`;

const SideMenu = ({ mobile = false }) => {
  return (
    <aside className={`w-64 bg-gray-100 border-r border-gray-200 ${mobile ? '' : 'hidden md:block'}`}>
      <nav className="p-4 space-y-2">
        <NavLink to="/dashboard" className={linkClass}>Overview</NavLink>
        <NavLink to="/orders" className={linkClass}>Orders</NavLink>
        <NavLink to="/inventory" className={linkClass}>Inventory</NavLink>
        <NavLink to="/settings" className={linkClass}>Settings</NavLink>
      </nav>
    </aside>
  );
};

export default SideMenu;


