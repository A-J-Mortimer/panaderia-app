import { NavLink } from 'react-router-dom';
import { 
  Home, 
  ShoppingCart, 
  Users, 
  ChefHat, 
  Package, 
  Wheat 
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/pedidos', icon: ShoppingCart, label: 'Pedidos' },
    { to: '/clientes', icon: Users, label: 'Clientes' },
    { to: '/cocineras', icon: ChefHat, label: 'Cocineras' },
    { to: '/productos', icon: Package, label: 'Productos' },
    { to: '/ingredientes', icon: Wheat, label: 'Ingredientes' },
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg overflow-y-auto">
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-bakery-orange text-white'
                      : 'text-gray-700 hover:bg-bakery-beige'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
