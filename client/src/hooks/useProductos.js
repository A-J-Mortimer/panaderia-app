import { useState, useEffect } from 'react';
import { productosApi } from '../services/api';
import useStore from '../store/useStore';

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showNotification } = useStore();

  const fetchProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productosApi.getAll();
      setProductos(response.data);
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const getProducto = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productosApi.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createProducto = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productosApi.create(data);
      await fetchProductos();
      showNotification('Producto creado exitosamente', 'success');
      return response.data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProducto = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productosApi.update(id, data);
      await fetchProductos();
      showNotification('Producto actualizado exitosamente', 'success');
      return response.data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteProducto = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await productosApi.delete(id);
      await fetchProductos();
      showNotification('Producto eliminado exitosamente', 'success');
      return true;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getReceta = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productosApi.getReceta(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateReceta = async (id, recetas) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productosApi.updateReceta(id, recetas);
      await fetchProductos();
      showNotification('Receta actualizada exitosamente', 'success');
      return response.data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return {
    productos,
    loading,
    error,
    fetchProductos,
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto,
    getReceta,
    updateReceta,
  };
};

export default useProductos;
