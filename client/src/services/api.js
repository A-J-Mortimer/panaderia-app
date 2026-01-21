import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || error.message || 'Error en la petición';
    console.error('API Error:', message);
    return Promise.reject(new Error(message));
  }
);

// Cocineras API
export const cocinerasApi = {
  getAll: () => api.get('/cocineras'),
  getById: (id) => api.get(`/cocineras/${id}`),
  create: (data) => api.post('/cocineras', data),
  update: (id, data) => api.put(`/cocineras/${id}`, data),
  delete: (id) => api.delete(`/cocineras/${id}`),
};

// Clientes API
export const clientesApi = {
  getAll: () => api.get('/clientes'),
  getById: (id) => api.get(`/clientes/${id}`),
  create: (data) => api.post('/clientes', data),
  update: (id, data) => api.put(`/clientes/${id}`, data),
  delete: (id) => api.delete(`/clientes/${id}`),
};

// Pedidos API
export const pedidosApi = {
  getAll: () => api.get('/pedidos'),
  getById: (id) => api.get(`/pedidos/${id}`),
  create: (data) => api.post('/pedidos', data),
  update: (id, data) => api.put(`/pedidos/${id}`, data),
  updateEstado: (id, estado) => api.patch(`/pedidos/${id}/estado`, { estado }),
  delete: (id) => api.delete(`/pedidos/${id}`),
};

// Productos API
export const productosApi = {
  getAll: () => api.get('/productos'),
  getById: (id) => api.get(`/productos/${id}`),
  create: (data) => api.post('/productos', data),
  update: (id, data) => api.put(`/productos/${id}`, data),
  delete: (id) => api.delete(`/productos/${id}`),
  getReceta: (id) => api.get(`/productos/${id}/receta`),
  updateReceta: (id, recetas) => api.put(`/productos/${id}/receta`, { recetas }),
};

// Ingredientes API
export const ingredientesApi = {
  getAll: () => api.get('/ingredientes'),
  getById: (id) => api.get(`/ingredientes/${id}`),
  create: (data) => api.post('/ingredientes', data),
  update: (id, data) => api.put(`/ingredientes/${id}`, data),
  delete: (id) => api.delete(`/ingredientes/${id}`),
};

export default api;
