import { create } from 'zustand';

const useStore = create((set) => ({
  // Global loading state
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),

  // Toast notifications
  notification: null,
  showNotification: (message, type = 'info') =>
    set({ notification: { message, type } }),
  clearNotification: () => set({ notification: null }),

  // Currently selected entities
  selectedCliente: null,
  selectedCocinera: null,
  selectedPedido: null,
  selectedProducto: null,
  selectedIngrediente: null,

  setSelectedCliente: (cliente) => set({ selectedCliente: cliente }),
  setSelectedCocinera: (cocinera) => set({ selectedCocinera: cocinera }),
  setSelectedPedido: (pedido) => set({ selectedPedido: pedido }),
  setSelectedProducto: (producto) => set({ selectedProducto: producto }),
  setSelectedIngrediente: (ingrediente) => set({ selectedIngrediente: ingrediente }),

  // Clear all selections
  clearSelections: () =>
    set({
      selectedCliente: null,
      selectedCocinera: null,
      selectedPedido: null,
      selectedProducto: null,
      selectedIngrediente: null,
    }),
}));

export default useStore;
