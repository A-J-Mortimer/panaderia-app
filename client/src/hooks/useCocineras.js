import { useState, useEffect } from 'react';
import { cocinerasApi } from '../services/api';
import useStore from '../store/useStore';

export const useCocineras = () => {
  const [cocineras, setCocineras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showNotification } = useStore();

  const fetchCocineras = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await cocinerasApi.getAll();
      setCocineras(response.data);
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const getCocinera = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cocinerasApi.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createCocinera = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cocinerasApi.create(data);
      await fetchCocineras();
      showNotification('Cocinera creada exitosamente', 'success');
      return response.data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateCocinera = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cocinerasApi.update(id, data);
      await fetchCocineras();
      showNotification('Cocinera actualizada exitosamente', 'success');
      return response.data;
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteCocinera = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await cocinerasApi.delete(id);
      await fetchCocineras();
      showNotification('Cocinera eliminada exitosamente', 'success');
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
    fetchCocineras();
  }, []);

  return {
    cocineras,
    loading,
    error,
    fetchCocineras,
    getCocinera,
    createCocinera,
    updateCocinera,
    deleteCocinera,
  };
};

export default useCocineras;
