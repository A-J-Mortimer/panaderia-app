import { useState } from 'react';
import usePedidos from '../hooks/usePedidos';
import PedidosList from '../components/Pedidos/PedidosList';
import PedidoForm from '../components/Pedidos/PedidoForm';
import { Plus } from 'lucide-react';

const PedidosPage = () => {
  const { pedidos, loading, createPedido, updatePedido, deletePedido, updateEstado } = usePedidos();
  const [showForm, setShowForm] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);

  const handleCreate = () => {
    setSelectedPedido(null);
    setShowForm(true);
  };

  const handleEdit = (pedido) => {
    setSelectedPedido(pedido);
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    if (selectedPedido) {
      await updatePedido(selectedPedido.id, data);
    } else {
      await createPedido(data);
    }
    setShowForm(false);
    setSelectedPedido(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedPedido(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Pedidos</h1>
        <button
          onClick={handleCreate}
          className="bg-bakery-orange text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-bakery-brown transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Pedido</span>
        </button>
      </div>

      {showForm ? (
        <PedidoForm
          pedido={selectedPedido}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <PedidosList
          pedidos={pedidos}
          loading={loading}
          onEdit={handleEdit}
          onDelete={deletePedido}
          onUpdateEstado={updateEstado}
        />
      )}
    </div>
  );
};

export default PedidosPage;
