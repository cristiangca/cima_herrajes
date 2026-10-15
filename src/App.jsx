import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/inicio/Home.jsx'
import Servicios from './pages/servicios/Servicios.jsx'
import Catalogo from './pages/Catalogo.jsx'
export default function App() {
  return <main className="container"><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/servicios" element={<Servicios />} />
    <Route path="/servicios/:idproductos" element={<Servicios />} />
    <Route path="/catalogo" element={<Catalogo interactivo />} />
    <Route path="*" element={<section><h1>Página no encontrada</h1><Link to="/">Volver al inicio</Link></section>} />
  </Routes></main>
}
