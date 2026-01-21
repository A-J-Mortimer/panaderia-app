import { useState, useEffect } from 'react';
import { pedidosApi } from '../services/api';
import useStore from '../store/useStore';

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showNotification } = useStore();

  const fetchPedidos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await pedidosApi.getAll();
      setPedidos(response.data);
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const getPedido = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await pedidosApi.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createPedido = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await pedidosApi.create(data);
      await fetchPedidos();
      showNotification('Pedido creado exitosamente', 'success');
      return response.data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updatePedido = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await pedidosApi.update(id, data);
      await fetchPedidos();
      showNotification('Pedido actualizado exitosamente', 'success');
      return response.data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateEstado = async (id, estado) => {
    setLoading(true);
    setError(null);
    try {
      const response = await pedidosApi.updateEstado(id, estado);
      await fetchPedidos();
      showNotification('Estado actualizado exitosamente', 'success');
      return response.data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deletePedido = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await pedidosApi.delete(id);
      await fetchPedidos();
      showNotification('Pedido eliminado exitosamente', 'success');
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
    fetchPedidos();
  }, []);

  return {
    pedidos,
    loading,
    error,
    fetchPedidos,
    getPedido,
    createPedido,
    updatePedido,
    updateEstado,
    deletePedido,
  };
};

export default usePedidos;
