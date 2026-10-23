import TEXTOS from './contenido/general/textos/App.json'
import { useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Afiliados from './pages/Afiliados.jsx'
import Home from './pages/inicio/Home.jsx'
import Servicios from './pages/servicios/Servicios.jsx'
import Catalogo from './pages/Catalogo.jsx'
import ProyectosRecientes from './pages/ProyectosRecientes.jsx'
import Medicion from './components/Medicion'

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
  return <main className="container"><NavegacionSecciones /><Medicion /><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/servicios" element={<Servicios />} />
    <Route path="/servicios/:idproductos" element={<Servicios />} />
    <Route path="/proyectos" element={<ProyectosRecientes />} />
    <Route path="/afiliado" element={<Afiliados />} />
    <Route path="/catalogo" element={<Catalogo interactivo />} />
    <Route path="*" element={<section><h1>{TEXTOS.pagina_no_encontrada}</h1><Link to="/">{TEXTOS.volver_al_inicio}</Link></section>} />
  </Routes></main>
}
