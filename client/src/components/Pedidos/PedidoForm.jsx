import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useClientes from '../../hooks/useClientes';
import useCocineras from '../../hooks/useCocineras';
import useProductos from '../../hooks/useProductos';

const PedidoForm = ({ pedido, onSubmit, onCancel }) => {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();
  const { clientes } = useClientes();
  const { cocineras } = useCocineras();
  const { productos } = useProductos();
  const [detalles, setDetalles] = useState([]);

  useEffect(() => {
    if (pedido) {
      reset({
        clienteId: pedido.clienteId,
        cocineraId: pedido.cocineraId || '',
        fechaEntrega: pedido.fechaEntrega?.split('T')[0] || '',
      });
      setDetalles(pedido.detalles || []);
    }
  }, [pedido, reset]);

  const handleAddDetalle = () => {
    setDetalles([...detalles, { productoId: '', cantidad: 1, precioUnitario: 0 }]);
  };

  const handleRemoveDetalle = (index) => {
    setDetalles(detalles.filter((_, i) => i !== index));
  };

  const handleDetalleChange = (index, field, value) => {
    const newDetalles = [...detalles];
    newDetalles[index][field] = value;
    
    // Auto-fill precio unitario when product is selected
    if (field === 'productoId' && value) {
      const producto = productos.find(p => p.id === value);
      if (producto) {
        newDetalles[index].precioUnitario = producto.precioVenta;
      }
    }
    
    setDetalles(newDetalles);
  };

  const handleFormSubmit = (data) => {
    if (detalles.length === 0) {
      alert('Debe agregar al menos un producto');
      return;
    }

    onSubmit({
      ...data,
      detalles: detalles.map(d => ({
        productoId: d.productoId,
        cantidad: parseInt(d.cantidad),
        precioUnitario: parseFloat(d.precioUnitario),
      })),
    });
  };

  const total = detalles.reduce((sum, d) => sum + (d.cantidad * d.precioUnitario), 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {pedido ? 'Editar Pedido' : 'Nuevo Pedido'}
      </h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cliente *
            </label>
            <select
              {...register('clienteId', { required: 'El cliente es requerido' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bakery-orange focus:border-transparent"
            >
              <option value="">Seleccionar cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </select>
            {errors.clienteId && (
              <p className="text-red-500 text-sm mt-1">{errors.clienteId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cocinera
            </label>
            <select
              {...register('cocineraId')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bakery-orange focus:border-transparent"
            >
              <option value="">Sin asignar</option>
              {cocineras.map((cocinera) => (
                <option key={cocinera.id} value={cocinera.id}>
                  {cocinera.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de Entrega *
          </label>
          <input
            type="date"
            {...register('fechaEntrega', { required: 'La fecha de entrega es requerida' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bakery-orange focus:border-transparent"
          />
          {errors.fechaEntrega && (
            <p className="text-red-500 text-sm mt-1">{errors.fechaEntrega.message}</p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Productos</h3>
            <button
              type="button"
              onClick={handleAddDetalle}
              className="bg-bakery-orange text-white px-4 py-2 rounded-lg text-sm hover:bg-bakery-brown transition-colors"
            >
              + Agregar Producto
            </button>
          </div>

          <div className="space-y-3">
            {detalles.map((detalle, index) => (
              <div key={index} className="flex gap-3 items-start">
                <select
                  value={detalle.productoId}
                  onChange={(e) => handleDetalleChange(index, 'productoId', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bakery-orange focus:border-transparent"
                >
                  <option value="">Seleccionar producto</option>
                  {productos.map((producto) => (
                    <option key={producto.id} value={producto.id}>
                      {producto.nombre}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  value={detalle.cantidad}
                  onChange={(e) => handleDetalleChange(index, 'cantidad', e.target.value)}
                  placeholder="Cant."
                  className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bakery-orange focus:border-transparent"
                />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={detalle.precioUnitario}
                  onChange={(e) => handleDetalleChange(index, 'precioUnitario', e.target.value)}
                  placeholder="Precio"
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bakery-orange focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveDetalle(index)}
                  className="text-red-600 hover:text-red-900 px-3 py-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 text-right">
            <span className="text-lg font-semibold text-gray-800">
              Total: ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex space-x-3 pt-4 border-t">
          <button
            type="submit"
            className="flex-1 bg-bakery-orange text-white px-6 py-2 rounded-lg hover:bg-bakery-brown transition-colors"
          >
            {pedido ? 'Actualizar Pedido' : 'Crear Pedido'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PedidoForm;
