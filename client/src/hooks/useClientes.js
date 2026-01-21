import { useState, useEffect } from 'react';
import { clientesApi } from '../services/api';
import useStore from '../store/useStore';

export const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showNotification } = useStore();

  const fetchClientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await clientesApi.getAll();
      setClientes(response.data);
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const getCliente = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await clientesApi.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createCliente = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await clientesApi.create(data);
      await fetchClientes();
      showNotification('Cliente creado exitosamente', 'success');
      return response.data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateCliente = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await clientesApi.update(id, data);
      await fetchClientes();
      showNotification('Cliente actualizado exitosamente', 'success');
      return response.data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteCliente = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await clientesApi.delete(id);
      await fetchClientes();
      showNotification('Cliente eliminado exitosamente', 'success');
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
    fetchClientes();
  }, []);

  return {
    clientes,
    loading,
    error,
    fetchClientes,
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente,
  };
};

export default useClientes;
