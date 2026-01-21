import { formatDate, formatCurrency } from '../../utils/calculations';

const PedidoDetalle = ({ pedido }) => {
  if (!pedido) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Detalle del Pedido</h2>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Cliente</h3>
          <p className="text-lg text-gray-900">{pedido.cliente?.nombre}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Cocinera</h3>
          <p className="text-lg text-gray-900">{pedido.cocinera?.nombre || 'Sin asignar'}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Fecha de Pedido</h3>
          <p className="text-lg text-gray-900">{formatDate(pedido.fechaPedido)}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Fecha de Entrega</h3>
          <p className="text-lg text-gray-900">{formatDate(pedido.fechaEntrega)}</p>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Productos</h3>
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Producto</th>
              <th className="text-right py-2">Cantidad</th>
              <th className="text-right py-2">Precio Unit.</th>
              <th className="text-right py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {pedido.detalles?.map((detalle, index) => (
              <tr key={index} className="border-b">
                <td className="py-3">{detalle.producto?.nombre}</td>
                <td className="text-right">{detalle.cantidad}</td>
                <td className="text-right">{formatCurrency(detalle.precioUnitario)}</td>
                <td className="text-right font-semibold">
                  {formatCurrency(detalle.cantidad * detalle.precioUnitario)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold">
              <td colSpan="3" className="text-right py-3">
                Total:
              </td>
              <td className="text-right py-3 text-lg">
                {formatCurrency(pedido.precioTotal)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default PedidoDetalle;
