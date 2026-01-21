// Estados válidos para pedidos
export const ESTADOS_PEDIDO = [
  'Confirmado',
  'En preparación',
  'Listo',
  'Entregado',
  'Cancelado'
];

// Estado por defecto para nuevos pedidos
export const ESTADO_DEFAULT = 'Confirmado';

// Colores para cada estado
export const ESTADO_COLORS = {
  'Confirmado': 'bg-blue-100 text-blue-800',
  'En preparación': 'bg-yellow-100 text-yellow-800',
  'Listo': 'bg-green-100 text-green-800',
  'Entregado': 'bg-gray-100 text-gray-800',
  'Cancelado': 'bg-red-100 text-red-800',
};
