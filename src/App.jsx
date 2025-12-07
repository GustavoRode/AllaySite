import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Deals from './components/Deals';
import Essentials from './components/Essentials';
import Login from './components/Login'; 
import Footer from './components/Footer'
import { CartProvider } from './components/CartContext';
import ProductList from './components/ProductList';
import ProductCard from './components/ProductCard';
import CarritoComponent from './components/Carrito'; 
import CrudProductos from './components/CrudProductos';

function App() {

  return (
          <CartProvider>
     <Router>
      <Header />
      <Routes>
        <Route path="/administracion" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/essentials" element={<Essentials />} />
        <Route path="/carrito" element={<CarritoComponent />} />
        <Route path="/crud" element={<CrudProductos />} />
      </Routes>
      <Footer/>
    </Router>
    </CartProvider>
  )
}

export default App
