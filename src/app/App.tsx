import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../features/shared/layout/Layout'
import Products from '../features/products/pages/Products'
import ProductDetail from '../features/products/pages/ProductDetail'
import CreateProduct from '../features/products/pages/CreateProduct'
import NotFound from '../features/shared/components/NotFound'
import '../App.css';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Redirige la raíz "/" automáticamente hacia "/products" */}
        <Route path="/" element={<Navigate to="/products" replace />} />
        
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/new" element={<CreateProduct />} />
        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App