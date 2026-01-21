import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import PedidosPage from './pages/PedidosPage';
import ClientesPage from './pages/ClientesPage';
import CocinerasPage from './pages/CocinerasPage';
import ProductosPage from './pages/ProductosPage';
import IngredientesPage from './pages/IngredientesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="pedidos" element={<PedidosPage />} />
          <Route path="clientes" element={<ClientesPage />} />
          <Route path="cocineras" element={<CocinerasPage />} />
          <Route path="productos" element={<ProductosPage />} />
          <Route path="ingredientes" element={<IngredientesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
