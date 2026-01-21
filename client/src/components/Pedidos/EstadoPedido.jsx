import { useState } from 'react';
import { getEstadoColor } from '../../utils/calculations';
import { ESTADOS_PEDIDO } from '../../constants/estados';

const EstadoPedido = ({ estado, pedidoId, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState(estado);

  const handleChange = async (newEstado) => {
    setSelectedEstado(newEstado);
    if (onUpdate) {
      await onUpdate(pedidoId, newEstado);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <select
        value={selectedEstado}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => setIsEditing(false)}
        autoFocus
        className="text-sm px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-bakery-orange focus:border-transparent"
      >
        {ESTADOS_PEDIDO.map((est) => (
          <option key={est} value={est}>
            {est}
          </option>
        ))}
      </select>
    );
  }

  return (
    <span
      onClick={() => setIsEditing(true)}
      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full cursor-pointer ${getEstadoColor(
        selectedEstado
      )}`}
    >
      {selectedEstado}
    </span>
  );
};

export default EstadoPedido;
