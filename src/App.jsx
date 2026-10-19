import { useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/inicio/Home.jsx'
import Servicios from './pages/servicios/Servicios.jsx'
import Catalogo from './pages/Catalogo.jsx'
import ProyectosRecientes from './pages/ProyectosRecientes.jsx'

function NavegacionSecciones() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ block: 'start' })
      else window.scrollTo(0, 0)
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
  return null
}

export default function App() {
  return <main className="container"><NavegacionSecciones /><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/servicios" element={<Servicios />} />
    <Route path="/servicios/:idproductos" element={<Servicios />} />
    <Route path="/proyectos" element={<ProyectosRecientes />} />
    <Route path="/catalogo" element={<Catalogo interactivo />} />
    <Route path="*" element={<section><h1>Página no encontrada</h1><Link to="/">Volver al inicio</Link></section>} />
  </Routes></main>
}
