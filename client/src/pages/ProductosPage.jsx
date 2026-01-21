import { useState } from 'react';
import useProductos from '../hooks/useProductos';
import ProductosList from '../components/Productos/ProductosList';
import ProductoForm from '../components/Productos/ProductoForm';
import { Plus } from 'lucide-react';

const ProductosPage = () => {
  const { productos, loading, createProducto, updateProducto, deleteProducto } = useProductos();
  const [showForm, setShowForm] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);

  const handleCreate = () => {
    setSelectedProducto(null);
    setShowForm(true);
  };

  const handleEdit = (producto) => {
    setSelectedProducto(producto);
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    if (selectedProducto) {
      await updateProducto(selectedProducto.id, data);
    } else {
      await createProducto(data);
    }
    setShowForm(false);
    setSelectedProducto(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedProducto(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Productos</h1>
        <button
          onClick={handleCreate}
          className="bg-bakery-orange text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-bakery-brown transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Producto</span>
        </button>
      </div>

      {showForm ? (
        <ProductoForm
          producto={selectedProducto}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <ProductosList
          productos={productos}
          loading={loading}
          onEdit={handleEdit}
          onDelete={deleteProducto}
        />
      )}
    </div>
  );
};

export default ProductosPage;
