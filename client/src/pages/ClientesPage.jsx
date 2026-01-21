import { useState } from 'react';
import useClientes from '../hooks/useClientes';
import ClientesList from '../components/Clientes/ClientesList';
import ClienteForm from '../components/Clientes/ClienteForm';
import { Plus } from 'lucide-react';

const ClientesPage = () => {
  const { clientes, loading, createCliente, updateCliente, deleteCliente } = useClientes();
  const [showForm, setShowForm] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  const handleCreate = () => {
    setSelectedCliente(null);
    setShowForm(true);
  };

  const handleEdit = (cliente) => {
    setSelectedCliente(cliente);
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    if (selectedCliente) {
      await updateCliente(selectedCliente.id, data);
    } else {
      await createCliente(data);
    }
    setShowForm(false);
    setSelectedCliente(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedCliente(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
        <button
          onClick={handleCreate}
          className="bg-bakery-orange text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-bakery-brown transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      {showForm ? (
        <ClienteForm
          cliente={selectedCliente}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <ClientesList
          clientes={clientes}
          loading={loading}
          onEdit={handleEdit}
          onDelete={deleteCliente}
        />
      )}
    </div>
  );
};

export default ClientesPage;
