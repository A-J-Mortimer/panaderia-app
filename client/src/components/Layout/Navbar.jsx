import { ChefHat } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-bakery-brown text-white shadow-lg z-50">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ChefHat className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Panadería App</h1>
        </div>
        <div className="text-sm">
          Sistema de Gestión
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
