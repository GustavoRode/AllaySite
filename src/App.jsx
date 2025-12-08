import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Deals from './components/Deals';
import Essentials from './components/Essentials';
import Login from './components/Login'; 
import Footer from './components/Footer'
import { CartProvider } from './components/CartContext';
import CarritoComponent from './components/Carrito'; 
import CrudProductos from './components/CrudProductos';
import { Helmet } from "react-helmet";
import logo from '/logo.svg'



function App() {

  return (
    <CartProvider>
    <Router>
        {/* Helmet global: título y metadatos para toda la app */}
        <Helmet>
          <title>Proyecto Final Talentotech | React App</title>
          <meta 
            name="description" 
            content="Aplicación React del proyecto final Talento Tech. Incluye carrito, productos y administración." 
          />
          <meta 
            name="keywords" 
            content="React, Talentotech, ecommerce, productos, carrito, accesibilidad, SEO" 
          />
        </Helmet>

        <Header aria-label="Encabezado principal de la aplicación" />



   
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
