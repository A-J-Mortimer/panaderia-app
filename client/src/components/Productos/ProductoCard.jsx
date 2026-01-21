import { formatCurrency, calcularCostoProducto, calcularMargen } from '../../utils/calculations';
import { Clock, DollarSign } from 'lucide-react';

const ProductoCard = ({ producto }) => {
  const costoTotal = calcularCostoProducto(producto.recetas, producto.costoGasElectricidad);
  const margen = calcularMargen(costoTotal, producto.precioVenta);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800">{producto.nombre}</h3>
      <p className="text-gray-600 text-sm mb-3">{producto.descripcion}</p>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {producto.tiempoElaboracion} min
          </span>
          <span className="text-gray-700">
            Costo: {formatCurrency(costoTotal)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-bakery-orange font-semibold flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            {formatCurrency(producto.precioVenta)}
          </span>
          <span className={`text-sm font-medium ${margen.porcentaje > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {margen.porcentaje.toFixed(1)}% margen
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;
