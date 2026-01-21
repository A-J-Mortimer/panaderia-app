import { useState } from 'react';
import useCocineras from '../hooks/useCocineras';
import CocinerasList from '../components/Cocineras/CocinerasList';
import CocineraForm from '../components/Cocineras/CocineraForm';
import { Plus } from 'lucide-react';

const CocinerasPage = () => {
  const { cocineras, loading, createCocinera, updateCocinera, deleteCocinera } = useCocineras();
  const [showForm, setShowForm] = useState(false);
  const [selectedCocinera, setSelectedCocinera] = useState(null);

  const handleCreate = () => {
    setSelectedCocinera(null);
    setShowForm(true);
  };

  const handleEdit = (cocinera) => {
    setSelectedCocinera(cocinera);
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    if (selectedCocinera) {
      await updateCocinera(selectedCocinera.id, data);
    } else {
      await createCocinera(data);
    }
    setShowForm(false);
    setSelectedCocinera(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedCocinera(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Cocineras</h1>
        <button
          onClick={handleCreate}
          className="bg-bakery-orange text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-bakery-brown transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Cocinera</span>
        </button>
      </div>

      {showForm ? (
        <CocineraForm
          cocinera={selectedCocinera}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <CocinerasList
          cocineras={cocineras}
          loading={loading}
          onEdit={handleEdit}
          onDelete={deleteCocinera}
        />
      )}
    </div>
  );
};

export default CocinerasPage;
