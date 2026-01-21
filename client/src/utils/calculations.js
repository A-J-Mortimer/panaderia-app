/**
 * Calcula el costo total de un producto basado en sus ingredientes
 * @param {Array} recetas - Array de recetas con ingredientes y cantidades
 * @param {number} costoGasElectricidad - Costo de gas/electricidad
 * @returns {number} Costo total del producto
 */
export const calcularCostoProducto = (recetas = [], costoGasElectricidad = 0) => {
  const costoIngredientes = recetas.reduce((sum, receta) => {
    const costoPorKg = receta.ingrediente?.costoPorKg || 0;
    const cantidad = receta.cantidad || 0;
    return sum + (costoPorKg * cantidad);
  }, 0);

  return costoIngredientes + costoGasElectricidad;
};

/**
 * Calcula el margen de ganancia
 * @param {number} costoTotal - Costo total del producto
 * @param {number} precioVenta - Precio de venta
 * @returns {object} Objeto con margen absoluto y porcentaje
 */
export const calcularMargen = (costoTotal, precioVenta) => {
  const margenAbsoluto = precioVenta - costoTotal;
  const margenPorcentaje = costoTotal > 0 ? (margenAbsoluto / costoTotal) * 100 : 0;

  return {
    absoluto: margenAbsoluto,
    porcentaje: margenPorcentaje,
  };
};

/**
 * Calcula el precio total de un pedido
 * @param {Array} detalles - Array de detalles del pedido
 * @returns {number} Precio total
 */
export const calcularPrecioPedido = (detalles = []) => {
  return detalles.reduce((sum, detalle) => {
    const cantidad = detalle.cantidad || 0;
    const precioUnitario = detalle.precioUnitario || 0;
    return sum + (cantidad * precioUnitario);
  }, 0);
};

/**
 * Formatea un número como moneda
 * @param {number} amount - Cantidad a formatear
 * @returns {string} Cantidad formateada
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formatea una fecha
 * @param {Date|string} date - Fecha a formatear
 * @param {boolean} includeTime - Si incluir la hora
 * @returns {string} Fecha formateada
 */
export const formatDate = (date, includeTime = false) => {
  if (!date) return '';

  const dateObj = new Date(date);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(includeTime && {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  return new Intl.DateTimeFormat('es-AR', options).format(dateObj);
};

/**
 * Formatea una fecha para input type="datetime-local"
 * @param {Date|string} date - Fecha a formatear
 * @returns {string} Fecha formateada para input
 */
export const formatDateForInput = (date) => {
  if (!date) return '';
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 * Obtiene el color para un estado de pedido
 * @param {string} estado - Estado del pedido
 * @returns {string} Clase de color de Tailwind
 */
export const getEstadoColor = (estado) => {
  const colors = {
    'Confirmado': 'bg-blue-100 text-blue-800',
    'En preparación': 'bg-yellow-100 text-yellow-800',
    'Listo': 'bg-green-100 text-green-800',
    'Entregado': 'bg-gray-100 text-gray-800',
    'Cancelado': 'bg-red-100 text-red-800',
  };

  return colors[estado] || 'bg-gray-100 text-gray-800';
};
