import { useState, useEffect } from 'react';
import { ingredientesApi } from '../services/api';
import useStore from '../store/useStore';

export const useIngredientes = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showNotification } = useStore();

  const fetchIngredientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ingredientesApi.getAll();
      setIngredientes(response.data);
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const getIngrediente = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ingredientesApi.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createIngrediente = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ingredientesApi.create(data);
      await fetchIngredientes();
      showNotification('Ingrediente creado exitosamente', 'success');
      return response.data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateIngrediente = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ingredientesApi.update(id, data);
      await fetchIngredientes();
      showNotification('Ingrediente actualizado exitosamente', 'success');
      return response.data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteIngrediente = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await ingredientesApi.delete(id);
      await fetchIngredientes();
      showNotification('Ingrediente eliminado exitosamente', 'success');
      return true;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredientes();
  }, []);

  return {
    ingredientes,
    loading,
    error,
    fetchIngredientes,
    getIngrediente,
    createIngrediente,
    updateIngrediente,
    deleteIngrediente,
  };
};

export default useIngredientes;
