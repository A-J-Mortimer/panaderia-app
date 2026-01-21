import usePedidos from '../hooks/usePedidos';
import { Package, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const HomePage = () => {
  const { pedidos, loading } = usePedidos();

  const getStats = () => {
    if (!pedidos.length) return { total: 0, confirmados: 0, enPreparacion: 0, listos: 0 };
    
    return {
      total: pedidos.length,
      confirmados: pedidos.filter(p => p.estado === 'Confirmado').length,
      enPreparacion: pedidos.filter(p => p.estado === 'En preparación').length,
      listos: pedidos.filter(p => p.estado === 'Listo').length,
    };
  };

  const stats = getStats();

  const statCards = [
    { title: 'Total Pedidos', value: stats.total, icon: Package, color: 'bg-blue-500' },
    { title: 'Confirmados', value: stats.confirmados, icon: TrendingUp, color: 'bg-yellow-500' },
    { title: 'En Preparación', value: stats.enPreparacion, icon: Clock, color: 'bg-orange-500' },
    { title: 'Listos', value: stats.listos, icon: CheckCircle, color: 'bg-green-500' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bakery-orange"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Bienvenido al Sistema de Gestión de Panadería</h2>
        <p className="text-gray-600">
          Utiliza el menú lateral para navegar entre las diferentes secciones de la aplicación.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
