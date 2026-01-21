import { useState } from 'react';
import useIngredientes from '../hooks/useIngredientes';
import IngredientesList from '../components/Ingredientes/IngredientesList';
import IngredienteForm from '../components/Ingredientes/IngredienteForm';
import { Plus } from 'lucide-react';

const IngredientesPage = () => {
  const { ingredientes, loading, createIngrediente, updateIngrediente, deleteIngrediente } = useIngredientes();
  const [showForm, setShowForm] = useState(false);
  const [selectedIngrediente, setSelectedIngrediente] = useState(null);

  const handleCreate = () => {
    setSelectedIngrediente(null);
    setShowForm(true);
  };

  const handleEdit = (ingrediente) => {
    setSelectedIngrediente(ingrediente);
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    if (selectedIngrediente) {
      await updateIngrediente(selectedIngrediente.id, data);
    } else {
      await createIngrediente(data);
    }
    setShowForm(false);
    setSelectedIngrediente(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedIngrediente(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Ingredientes</h1>
        <button
          onClick={handleCreate}
          className="bg-bakery-orange text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-bakery-brown transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Ingrediente</span>
        </button>
      </div>

      {showForm ? (
        <IngredienteForm
          ingrediente={selectedIngrediente}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <IngredientesList
          ingredientes={ingredientes}
          loading={loading}
          onEdit={handleEdit}
          onDelete={deleteIngrediente}
        />
      )}
    </div>
  );
};

export default IngredientesPage;
