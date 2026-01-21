import { Pencil, Trash2, Eye } from 'lucide-react';
import { formatDate, formatCurrency, getEstadoColor } from '../../utils/calculations';
import EstadoPedido from './EstadoPedido';

const PedidosList = ({ pedidos, loading, onEdit, onDelete, onUpdateEstado }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bakery-orange"></div>
      </div>
    );
  }

  if (!pedidos || pedidos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No hay pedidos registrados</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cocinera
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha Entrega
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pedidos.map((pedido) => (
            <tr key={pedido.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {pedido.cliente?.nombre || 'N/A'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {pedido.cocinera?.nombre || 'Sin asignar'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {formatDate(pedido.fechaEntrega)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <EstadoPedido 
                  estado={pedido.estado} 
                  pedidoId={pedido.id}
                  onUpdate={onUpdateEstado}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-gray-900">
                  {formatCurrency(pedido.precioTotal)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(pedido)}
                  className="text-bakery-orange hover:text-bakery-brown mr-3"
                  title="Editar"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('¿Está seguro de eliminar este pedido?')) {
                      onDelete(pedido.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-900"
                  title="Eliminar"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PedidosList;
