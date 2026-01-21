import { formatCurrency } from '../../utils/calculations';

const CocineraCard = ({ cocinera }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800">{cocinera.nombre}</h3>
      <p className="text-gray-600 text-sm">{cocinera.telefono}</p>
      <div className="flex justify-between items-center mt-2">
        <p className="text-gray-500 text-xs">
          {cocinera.pedidos?.length || 0} pedidos
        </p>
        <p className="text-bakery-orange font-semibold text-sm">
          {formatCurrency(cocinera.ventas || 0)}
        </p>
      </div>
    </div>
  );
};

export default CocineraCard;
